/**
 * Wrapper an toàn cho localStorage: tự JSON parse/stringify và không ném lỗi
 * khi storage bị chặn (chế độ riêng tư, hết quota) hoặc data bị hỏng.
 */

/**
 * Đọc và parse giá trị từ localStorage.
 * Trả về `fallback` nếu key không tồn tại, data hỏng, hoặc storage không khả dụng.
 */
export function getStorageItem<T>(key: string, fallback: T): T {
	try {
		const raw = localStorage.getItem(key);
		if (raw === null) {
			return fallback;
		}
		return JSON.parse(raw) as T;
	} catch {
		return fallback;
	}
}

/**
 * Stringify và lưu giá trị vào localStorage.
 * Trả về `false` nếu lưu thất bại (storage bị chặn hoặc hết quota).
 */
export function setStorageItem(key: string, value: unknown): boolean {
	try {
		localStorage.setItem(key, JSON.stringify(value));
		return true;
	} catch {
		return false;
	}
}

/** Xóa một key khỏi localStorage (bỏ qua lỗi nếu storage không khả dụng). */
export function removeStorageItem(key: string): void {
	try {
		localStorage.removeItem(key);
	} catch {
		// storage không khả dụng — không có gì để xóa
	}
}
