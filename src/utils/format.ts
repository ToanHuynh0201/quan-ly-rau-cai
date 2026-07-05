const VND_FORMATTER = new Intl.NumberFormat("vi-VN", {
	style: "currency",
	currency: "VND",
});

/**
 * Format một số thành tiền VND, ví dụ: 15000 -> "15.000 ₫".
 * Trả về chuỗi rỗng nếu input không phải số hợp lệ.
 */
export function formatCurrency(amount: number): string {
	if (!Number.isFinite(amount)) {
		return "";
	}
	return VND_FORMATTER.format(amount);
}

function toValidDate(value: Date | string | number): Date | null {
	const date = value instanceof Date ? value : new Date(value);
	return Number.isNaN(date.getTime()) ? null : date;
}

function pad(value: number): string {
	return String(value).padStart(2, "0");
}

/**
 * Format ngày theo dạng dd/MM/yyyy, ví dụ: "04/07/2026".
 * Trả về chuỗi rỗng nếu input không phải ngày hợp lệ.
 */
export function formatDate(value: Date | string | number): string {
	const date = toValidDate(value);
	if (!date) {
		return "";
	}
	return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

/**
 * Format ngày giờ theo dạng dd/MM/yyyy HH:mm, ví dụ: "04/07/2026 14:30".
 * Trả về chuỗi rỗng nếu input không phải ngày hợp lệ.
 */
export function formatDateTime(value: Date | string | number): string {
	const date = toValidDate(value);
	if (!date) {
		return "";
	}
	return `${formatDate(date)} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
