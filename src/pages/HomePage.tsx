import { Link } from "react-router";

import { Page, PageHeader } from "@/components/layout";
import { Card, CardBody, CardHeader } from "@/components/ui";
import { ROUTER } from "@/constants";

// Trang chủ placeholder — sau này thay bằng dashboard (đơn hàng, tồn kho...).

export function HomePage() {
	return (
		<Page>
			<PageHeader
				title="Quản lý bán buôn rau cải"
				description="Trang chủ tạm thời — dashboard sẽ được xây dựng tại đây."
			/>
			<Card style={{ maxWidth: 360 }}>
				<CardHeader title="Style-guide" />
				<CardBody>
					<p
						style={{
							color: "var(--color-text-secondary)",
							fontSize: 14,
							margin: "0 0 12px",
						}}
					>
						Xem hệ thống màu, token và các base components.
					</p>
					<Link to={ROUTER.STYLE_GUIDE}>Mở style-guide →</Link>
				</CardBody>
			</Card>
		</Page>
	);
}
