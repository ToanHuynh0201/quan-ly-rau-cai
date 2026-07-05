import { Link } from "react-router";

import { ROUTER } from "@/constants";

// Trang chủ placeholder — sau này thay bằng dashboard (đơn hàng, tồn kho...).

export function HomePage() {
	return (
		<div>
			<h1 style={{ fontSize: 24 }}>Quản lý bán buôn rau cải</h1>
			<p style={{ color: "var(--color-text-secondary)" }}>
				Trang chủ tạm thời — dashboard sẽ được xây dựng tại đây.
			</p>
			<div
				style={{
					marginTop: 16,
					padding: 16,
					borderRadius: 8,
					background: "var(--color-surface)",
					border: "1px solid var(--color-border)",
					maxWidth: 360,
				}}
			>
				<div style={{ fontWeight: 600 }}>Style-guide</div>
				<p
					style={{
						color: "var(--color-text-secondary)",
						fontSize: 14,
						margin: "4px 0 12px",
					}}
				>
					Xem hệ thống màu, token và các base components.
				</p>
				<Link to={ROUTER.STYLE_GUIDE}>Mở style-guide →</Link>
			</div>
		</div>
	);
}
