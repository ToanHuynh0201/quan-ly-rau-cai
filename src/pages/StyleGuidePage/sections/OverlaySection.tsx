import { Copy, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import {
	Badge,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	IconButton,
	Modal,
	ModalBody,
	ModalFooter,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
	toast,
	Tooltip,
} from "@/components/ui";

import { DemoRow, DemoSection, DemoSub } from "../demoHelpers";

const DEMO_ORDERS = [
	{ id: "#1024", customer: "Chị Hoa (chợ Bà Chiểu)", total: "1.250.000 ₫" },
	{ id: "#1025", customer: "Anh Tú (quán cơm 79)", total: "480.000 ₫" },
];

export function OverlaySection() {
	const [detailOpen, setDetailOpen] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);

	return (
		<DemoSection title="Overlay & phản hồi">
			<DemoSub>Tooltip — hover hoặc focus bằng bàn phím</DemoSub>
			<DemoRow>
				<Tooltip content="Sửa đơn hàng">
					<IconButton aria-label="Sửa đơn hàng">
						<Pencil size={16} aria-hidden="true" />
					</IconButton>
				</Tooltip>
				<Tooltip content="Tooltip bên dưới" placement="bottom">
					<Button variant="secondary">Bottom</Button>
				</Tooltip>
				<Tooltip content="Tooltip bên trái" placement="left">
					<Button variant="secondary">Left</Button>
				</Tooltip>
				<Tooltip content="Tooltip bên phải" placement="right">
					<Button variant="secondary">Right</Button>
				</Tooltip>
			</DemoRow>

			<DemoSub>Toast — auto dismiss, hover để tạm dừng</DemoSub>
			<DemoRow>
				<Button variant="secondary" onClick={() => toast("Đã đồng bộ dữ liệu")}>
					Mặc định
				</Button>
				<Button
					variant="secondary"
					onClick={() => toast.success("Tạo đơn hàng thành công")}
				>
					Success
				</Button>
				<Button
					variant="secondary"
					onClick={() => toast.error("Không thể kết nối máy chủ")}
				>
					Error
				</Button>
				<Button variant="secondary" onClick={() => toast.warning("Rau muống sắp hết hàng")}>
					Warning
				</Button>
				<Button
					variant="secondary"
					onClick={() =>
						toast.info("Có 3 đơn hàng mới", {
							description: "Nhấn vào tab Đơn hàng để xem.",
						})
					}
				>
					Info
				</Button>
			</DemoRow>

			<DemoSub>Modal — native dialog (Escape / click backdrop / focus trap)</DemoSub>
			<DemoRow>
				<Button onClick={() => setDetailOpen(true)}>Mở modal chi tiết</Button>
				<Button variant="danger" onClick={() => setConfirmOpen(true)}>
					Modal non-dismissible
				</Button>
			</DemoRow>

			<Modal
				open={detailOpen}
				onClose={() => setDetailOpen(false)}
				title="Chi tiết đơn hàng #1024"
			>
				<ModalBody>
					<p style={{ marginTop: 0 }}>
						Khách: Chị Hoa (chợ Bà Chiểu) — 25kg rau muống, 10 bó cải thìa. Tổng:{" "}
						<strong>1.250.000 ₫</strong>.
					</p>
					<p>
						Nút dưới đây kiểm tra trick top-layer: toast phải nổi <strong>trên</strong>{" "}
						modal đang mở.
					</p>
					<Button
						variant="secondary"
						onClick={() =>
							toast.success("Đã lưu thay đổi", {
								description: "Toast này phải nằm trên modal.",
							})
						}
					>
						Bắn toast khi modal mở
					</Button>
				</ModalBody>
				<ModalFooter>
					<Button variant="ghost" onClick={() => setDetailOpen(false)}>
						Đóng
					</Button>
					<Button onClick={() => setDetailOpen(false)}>Lưu</Button>
				</ModalFooter>
			</Modal>

			<Modal
				open={confirmOpen}
				onClose={() => setConfirmOpen(false)}
				title="Xóa đơn hàng #1025?"
				size="sm"
				dismissible={false}
			>
				<ModalBody>
					Escape và click backdrop đều bị chặn — chỉ đóng được bằng hai nút bên dưới.
				</ModalBody>
				<ModalFooter>
					<Button variant="ghost" onClick={() => setConfirmOpen(false)}>
						Hủy
					</Button>
					<Button
						variant="danger"
						onClick={() => {
							setConfirmOpen(false);
							toast.error("Đã xóa đơn hàng #1025");
						}}
					>
						Xóa đơn
					</Button>
				</ModalFooter>
			</Modal>

			<DemoSub>DropdownMenu — trong Table, portal thoát vùng scroll</DemoSub>
			<div style={{ maxWidth: 560 }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableHeaderCell>Đơn</TableHeaderCell>
							<TableHeaderCell>Khách hàng</TableHeaderCell>
							<TableHeaderCell numeric>Tổng tiền</TableHeaderCell>
							<TableHeaderCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{DEMO_ORDERS.map((order) => (
							<TableRow key={order.id}>
								<TableCell>
									<Badge variant="primary" size="sm">
										{order.id}
									</Badge>
								</TableCell>
								<TableCell>{order.customer}</TableCell>
								<TableCell numeric>{order.total}</TableCell>
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger>
											<IconButton
												size="sm"
												aria-label={`Hành động cho đơn ${order.id}`}
											>
												<MoreHorizontal size={16} aria-hidden="true" />
											</IconButton>
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuItem
												icon={<Pencil size={14} />}
												onSelect={() => toast.info(`Sửa đơn ${order.id}`)}
											>
												Sửa đơn
											</DropdownMenuItem>
											<DropdownMenuItem
												icon={<Copy size={14} />}
												onSelect={() =>
													toast(`Đã nhân bản đơn ${order.id}`)
												}
											>
												Nhân bản
											</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem
												danger
												icon={<Trash2 size={14} />}
												onSelect={() =>
													toast.error(`Đã xóa đơn ${order.id}`)
												}
											>
												Xóa đơn
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</DemoSection>
	);
}
