/** Envelope thành công từ backend (`ResponseInterceptor`, xem docs/api/{admin,user}/auth.md). */
export interface ApiSuccessEnvelope<T> {
	success: true;
	statusCode: number;
	message: string;
	data: T;
	timestamp: string;
}

/** Envelope lỗi từ backend (`HttpExceptionFilter`, xem docs/api/{admin,user}/auth.md). */
export interface ApiErrorEnvelope {
	success: false;
	error: {
		statusCode: number;
		message: string;
		error: string;
		timestamp: string;
		path: string;
	};
}

/** Lỗi ném ra từ ApiClient, giữ nguyên statusCode để caller phân biệt (401, 404...). */
export class ApiError extends Error {
	readonly statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.name = "ApiError";
		this.statusCode = statusCode;
	}
}
