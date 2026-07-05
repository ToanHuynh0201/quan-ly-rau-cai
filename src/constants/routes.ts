/**
 * Đường dẫn các route của app — dùng cho <Route path> và <Link to>,
 * không hardcode path rải rác trong code.
 * Lưu ý: tsconfig bật erasableSyntaxOnly nên dùng object as const, không dùng enum.
 */
export const ROUTER = {
	HOME: "/",
	STYLE_GUIDE: "/style-guide",
	NOT_FOUND: "*",
} as const;
