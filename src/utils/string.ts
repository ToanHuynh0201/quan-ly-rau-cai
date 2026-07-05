/**
 * Viết hoa chữ cái đầu tiên, ví dụ: "cà chua" -> "Cà chua".
 */
export function capitalize(str: string): string {
	if (!str) {
		return str;
	}
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Cắt chuỗi nếu dài quá maxLength, thêm "…" ở cuối.
 * Ví dụ: truncate("Cà chua Đà Lạt loại 1", 10) -> "Cà chua Đ…"
 */
export function truncate(str: string, maxLength: number): string {
	if (str.length <= maxLength) {
		return str;
	}
	return str.slice(0, Math.max(0, maxLength - 1)).trimEnd() + "…";
}

/**
 * Bỏ dấu tiếng Việt, ví dụ: "Cà chua Đà Lạt" -> "Ca chua Da Lat".
 * Hữu ích cho search không phân biệt dấu.
 */
export function removeDiacritics(str: string): string {
	return str
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/đ/g, "d")
		.replace(/Đ/g, "D");
}

/**
 * So khớp search không phân biệt hoa thường và dấu.
 * Ví dụ: matchesSearch("Cà chua Đà Lạt", "ca chua") -> true
 */
export function matchesSearch(text: string, query: string): boolean {
	const normalizedQuery = removeDiacritics(query).toLowerCase().trim();
	if (!normalizedQuery) {
		return true;
	}
	return removeDiacritics(text).toLowerCase().includes(normalizedQuery);
}
