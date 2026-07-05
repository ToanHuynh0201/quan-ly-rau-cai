/** Kích thước chung cho các form control. */
export type ControlSize = "sm" | "md" | "lg";

/**
 * Ghép các class name, bỏ qua giá trị falsy.
 * Ví dụ: cx("a", cond && "b", undefined) -> "a b".
 */
export function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(" ");
}

/**
 * Ghép các id cho aria-describedby, bỏ qua giá trị rỗng.
 * Trả về undefined nếu không có id nào (để React bỏ hẳn attribute).
 */
export function joinIds(...ids: Array<string | undefined>): string | undefined {
	const joined = ids.filter(Boolean).join(" ");
	return joined || undefined;
}
