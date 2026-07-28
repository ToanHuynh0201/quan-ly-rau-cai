import type {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";

import type { ApiErrorEnvelope, ApiSuccessEnvelope } from "@/api/types";
import { ApiError } from "@/api/types";
import { toast } from "@/components/ui/Toast/toast";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/app";
import { getStorageItem, removeStorageItem, setStorageItem } from "@/utils/storage";

interface RetryableConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

interface RefreshResponseData {
	accessToken: string;
	refreshToken: string;
}

/**
 * Client HTTP dựa trên axios: tự gắn Bearer token, bóc envelope backend
 * (`{ success, data }` / `{ success: false, error }`), và tự refresh token
 * một lần khi gặp 401 rồi retry lại request gốc.
 */
export class ApiClient {
	private readonly instance: AxiosInstance;
	private refreshPromise: Promise<string> | null = null;

	constructor(baseURL: string = import.meta.env.VITE_API_URL) {
		this.instance = axios.create({ baseURL });
		this.setupInterceptors();
	}

	private setupInterceptors(): void {
		this.instance.interceptors.request.use((config) => {
			const accessToken = getStorageItem<string | null>(ACCESS_TOKEN_KEY, null);
			if (accessToken) {
				config.headers.set("Authorization", `Bearer ${accessToken}`);
			}
			return config;
		});

		this.instance.interceptors.response.use(
			// Bóc field `data` khỏi envelope; ép kiểu lại AxiosResponse vì instance.get/post...
			// ở dưới cast thẳng sang T (204 No Content thì response.data undefined).
			(response) =>
				(response.data as ApiSuccessEnvelope<unknown> | undefined)?.data as typeof response,
			(error: AxiosError<ApiErrorEnvelope>) => this.handleResponseError(error),
		);
	}

	private async handleResponseError(error: AxiosError<ApiErrorEnvelope>): Promise<unknown> {
		const config = error.config as RetryableConfig | undefined;
		const statusCode = error.response?.status ?? 0;

		if (statusCode === 401 && config && !config._retry) {
			config._retry = true;
			try {
				const accessToken = await this.refreshAccessToken();
				config.headers.set("Authorization", `Bearer ${accessToken}`);
				return await this.instance.request(config);
			} catch {
				// refresh thất bại — rơi xuống xử lý lỗi chung bên dưới
			}
		}

		removeStorageItem(ACCESS_TOKEN_KEY);
		removeStorageItem(REFRESH_TOKEN_KEY);

		const message = error.response?.data?.error?.message ?? error.message;
		toast.error(message);
		throw new ApiError(message, statusCode);
	}

	/** Gộp các request 401 đồng thời thành đúng 1 lần gọi /auth/refresh. */
	private refreshAccessToken(): Promise<string> {
		if (!this.refreshPromise) {
			this.refreshPromise = this.doRefresh().finally(() => {
				this.refreshPromise = null;
			});
		}
		return this.refreshPromise;
	}

	private async doRefresh(): Promise<string> {
		const refreshToken = getStorageItem<string | null>(REFRESH_TOKEN_KEY, null);
		if (!refreshToken) {
			throw new Error("No refresh token");
		}

		// Dùng axios gốc (không qua interceptor của instance) để tránh đệ quy 401.
		const response = await axios.post<ApiSuccessEnvelope<RefreshResponseData>>(
			`${this.instance.defaults.baseURL}/auth/refresh`,
			{ refreshToken },
		);
		const { accessToken, refreshToken: newRefreshToken } = response.data.data;
		setStorageItem(ACCESS_TOKEN_KEY, accessToken);
		setStorageItem(REFRESH_TOKEN_KEY, newRefreshToken);
		return accessToken;
	}

	// Interceptor bóc envelope trước khi resolve, nên response thật sự đã là T
	// dù type khai báo của axios vẫn ghi AxiosResponse<T> — cast lại cho đúng.

	get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		return this.instance.get(url, config) as unknown as Promise<T>;
	}

	post<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
		return this.instance.post(url, body, config) as unknown as Promise<T>;
	}

	put<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
		return this.instance.put(url, body, config) as unknown as Promise<T>;
	}

	patch<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
		return this.instance.patch(url, body, config) as unknown as Promise<T>;
	}

	delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		return this.instance.delete(url, config) as unknown as Promise<T>;
	}
}

export const apiClient = new ApiClient();
