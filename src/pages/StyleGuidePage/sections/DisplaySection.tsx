import { ShoppingBasket } from "lucide-react";

import type { BadgeVariant } from "@/components/ui";
import {
	Badge,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	EmptyState,
	Skeleton,
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
} from "@/components/ui";
import { formatCurrency } from "@/utils";

import { DemoRow, DemoSection, DemoSub } from "../demoHelpers";

const BADGE_VARIANTS: BadgeVariant[] = [
	"neutral",
	"primary",
	"accent",
	"success",
	"warning",
	"error",
	"info",
];

interface SampleOrder {
	id: string;
	customer: string;
	item: string;
	quantity: string;
	total: number;
	status: BadgeVariant;
	statusLabel: string;
}

const SAMPLE_ORDERS: SampleOrder[] = [
	{
		id: "DH-1024",
		customer: "Chị Hoa — chợ Bà Chiểu",
		item: "Rau muống",
		quantity: "25 kg",
		total: 375000,
		status: "success",
		statusLabel: "Đã giao",
	},
	{
		id: "DH-1025",
		customer: "Anh Tùng — quán cơm 79",
		item: "Cải thìa",
		quantity: "10 kg",
		total: 180000,
		status: "info",
		statusLabel: "Đang giao",
	},
	{
		id: "DH-1026",
		customer: "Cô Sáu — tạp hóa Minh Anh",
		item: "Xà lách",
		quantity: "8 thùng",
		total: 640000,
		status: "warning",
		statusLabel: "Chờ xử lý",
	},
	{
		id: "DH-1027",
		customer: "Chị Lan — nhà hàng Sen",
		item: "Rau thơm",
		quantity: "15 bó",
		total: 90000,
		status: "error",
		statusLabel: "Đã hủy",
	},
];

export function DisplaySection() {
	return (
		<DemoSection title="Hiển thị dữ liệu">
			<DemoSub>Badge — variants & sizes</DemoSub>
			<DemoRow>
				{BADGE_VARIANTS.map((variant) => (
					<Badge key={variant} variant={variant}>
						{variant}
					</Badge>
				))}
				<Badge variant="success" size="sm">
					size sm
				</Badge>
			</DemoRow>

			<DemoSub>Card + Table — danh sách đơn hàng (Table tràn sát viền Card)</DemoSub>
			<Card>
				<CardHeader
					title="Đơn hàng gần đây"
					actions={
						<Button size="sm" variant="secondary">
							Xem tất cả
						</Button>
					}
				/>
				<Table aria-label="Danh sách đơn hàng gần đây">
					<TableHead>
						<TableRow>
							<TableHeaderCell>Mã đơn</TableHeaderCell>
							<TableHeaderCell>Khách hàng</TableHeaderCell>
							<TableHeaderCell>Mặt hàng</TableHeaderCell>
							<TableHeaderCell numeric>Số lượng</TableHeaderCell>
							<TableHeaderCell numeric>Thành tiền</TableHeaderCell>
							<TableHeaderCell>Trạng thái</TableHeaderCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{SAMPLE_ORDERS.map((order) => (
							<TableRow key={order.id}>
								<TableCell>{order.id}</TableCell>
								<TableCell>{order.customer}</TableCell>
								<TableCell>{order.item}</TableCell>
								<TableCell numeric>{order.quantity}</TableCell>
								<TableCell numeric>{formatCurrency(order.total)}</TableCell>
								<TableCell>
									<Badge variant={order.status}>{order.statusLabel}</Badge>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Card>

			<DemoSub>Card — header / body / footer</DemoSub>
			<div style={{ maxWidth: 360 }}>
				<Card>
					<CardHeader title="Tổng kết ngày" />
					<CardBody>
						Hôm nay bán được <strong>128 kg rau</strong> cho 12 khách, doanh thu{" "}
						<strong>{formatCurrency(2450000)}</strong>.
					</CardBody>
					<CardFooter>
						<Button variant="ghost" size="sm">
							Đóng
						</Button>
						<Button size="sm">Xem chi tiết</Button>
					</CardFooter>
				</Card>
			</div>

			<DemoSub>EmptyState</DemoSub>
			<Card>
				<EmptyState
					icon={<ShoppingBasket size={24} />}
					title="Chưa có đơn hàng nào"
					description="Đơn hàng mới sẽ xuất hiện tại đây. Tạo đơn đầu tiên cho khách của bạn."
					action={<Button>Tạo đơn hàng</Button>}
				/>
			</Card>

			<DemoSub>Skeleton — placeholder khi chờ dữ liệu</DemoSub>
			<div style={{ display: "flex", gap: 16, alignItems: "flex-start", maxWidth: 400 }}>
				<Skeleton variant="circle" width={40} height={40} />
				<div style={{ flex: 1, display: "grid", gap: 8 }}>
					<Skeleton width="60%" />
					<Skeleton width="90%" />
					<Skeleton variant="rect" width="100%" height={64} />
				</div>
			</div>

			<DemoSub>Spinner</DemoSub>
			<DemoRow>
				<Spinner size="sm" />
				<Spinner />
				<Spinner size="lg" />
				<Spinner label="Đang tải danh sách đơn..." />
			</DemoRow>
		</DemoSection>
	);
}
