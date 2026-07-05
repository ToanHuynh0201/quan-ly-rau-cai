import { Link } from "react-router";

import { ROUTER } from "@/constants";

/** Trang 404 cho các URL không khớp route nào. */
export function NotFoundPage() {
	return (
		<div style={{ maxWidth: 960, margin: "0 auto", padding: 24, textAlign: "center" }}>
			<h1 style={{ fontSize: 48, margin: "48px 0 8px" }}>404</h1>
			<p style={{ color: "var(--color-text-secondary)", marginBottom: 24 }}>
				Không tìm thấy trang bạn yêu cầu.
			</p>
			<Link to={ROUTER.HOME}>← Về trang chủ</Link>
		</div>
	);
}
