import { useState } from "react";

import {
	Button,
	Checkbox,
	DateInput,
	FormField,
	Input,
	NumberInput,
	Radio,
	SearchInput,
	Select,
	Switch,
	Textarea,
} from "@/components/ui";

import { DemoRow, DemoSection, DemoSub } from "../demoHelpers";

export function FormsSection() {
	const [search, setSearch] = useState("");

	return (
		<DemoSection title="Form controls">
			<DemoSub>Button — variants</DemoSub>
			<DemoRow>
				<Button>Tạo đơn hàng</Button>
				<Button variant="secondary">Xem tồn kho</Button>
				<Button variant="ghost">Hủy</Button>
				<Button variant="danger">Xóa đơn</Button>
			</DemoRow>

			<DemoSub>Button — sizes & states</DemoSub>
			<DemoRow>
				<Button size="sm">Nhỏ</Button>
				<Button size="md">Vừa</Button>
				<Button size="lg">Lớn</Button>
				<Button loading>Đang lưu...</Button>
				<Button disabled>Vô hiệu</Button>
				<Button iconLeft="+">Thêm rau</Button>
				<Button variant="secondary" iconRight="→">
					Xem tiếp
				</Button>
			</DemoRow>

			<DemoSub>Input</DemoSub>
			<DemoRow>
				<div style={{ width: 200 }}>
					<Input size="sm" placeholder="Size sm" />
				</div>
				<div style={{ width: 200 }}>
					<Input placeholder="Size md (mặc định)" />
				</div>
				<div style={{ width: 200 }}>
					<Input size="lg" placeholder="Size lg" />
				</div>
			</DemoRow>
			<DemoRow style={{ marginTop: 8 }}>
				<div style={{ width: 200 }}>
					<Input iconLeft="🔍" placeholder="Tìm rau..." />
				</div>
				<div style={{ width: 200 }}>
					<Input invalid defaultValue="Giá trị lỗi" />
				</div>
				<div style={{ width: 200 }}>
					<Input disabled placeholder="Vô hiệu" />
				</div>
			</DemoRow>

			<DemoSub>Select</DemoSub>
			<DemoRow>
				<div style={{ width: 200 }}>
					<Select defaultValue="rau-muong">
						<option value="rau-muong">Rau muống</option>
						<option value="cai-thia">Cải thìa</option>
						<option value="xa-lach">Xà lách</option>
					</Select>
				</div>
				<div style={{ width: 200 }}>
					<Select invalid defaultValue="">
						<option value="" disabled>
							Chưa chọn loại rau
						</option>
						<option value="rau-muong">Rau muống</option>
					</Select>
				</div>
				<div style={{ width: 200 }}>
					<Select disabled defaultValue="xa-lach">
						<option value="xa-lach">Xà lách</option>
					</Select>
				</div>
			</DemoRow>

			<DemoSub>Textarea</DemoSub>
			<DemoRow>
				<div style={{ width: 300 }}>
					<Textarea placeholder="Ghi chú đơn hàng..." />
				</div>
				<div style={{ width: 300 }}>
					<Textarea invalid defaultValue="Nội dung không hợp lệ" />
				</div>
			</DemoRow>

			<DemoSub>Checkbox & Radio</DemoSub>
			<DemoRow>
				<Checkbox label="Đã thanh toán" defaultChecked />
				<Checkbox label="Giao tận nơi" />
				<Checkbox label="Đồng ý điều khoản" invalid />
				<Checkbox label="Bị khóa" disabled />
				<Checkbox label="Khóa + chọn" disabled defaultChecked />
			</DemoRow>
			<DemoRow style={{ marginTop: 8 }}>
				<Radio name="unit" label="Ký (kg)" defaultChecked />
				<Radio name="unit" label="Bó" />
				<Radio name="unit" label="Thùng" />
				<Radio name="unit-disabled" label="Bị khóa" disabled />
			</DemoRow>

			<DemoSub>Switch</DemoSub>
			<DemoRow>
				<Switch size="sm" label="Nhỏ" />
				<Switch label="Đang mở bán" defaultChecked />
				<Switch size="lg" label="Lớn" />
				<Switch label="Trạng thái lỗi" invalid />
				<Switch label="Bị khóa" disabled />
				<Switch label="Khóa + bật" disabled defaultChecked />
			</DemoRow>

			<DemoSub>NumberInput</DemoSub>
			<DemoRow>
				<div style={{ width: 180 }}>
					<NumberInput size="sm" defaultValue={1.5} step={0.1} min={0} unit="kg" />
				</div>
				<div style={{ width: 180 }}>
					<NumberInput defaultValue={3} min={0} unit="bó" />
				</div>
				<div style={{ width: 180 }}>
					<NumberInput size="lg" defaultValue={2} min={0} unit="thùng" />
				</div>
				<div style={{ width: 180 }}>
					<NumberInput invalid defaultValue={-1} min={0} unit="kg" />
				</div>
				<div style={{ width: 180 }}>
					<NumberInput disabled defaultValue={5} unit="bó" />
				</div>
			</DemoRow>

			<DemoSub>SearchInput</DemoSub>
			<DemoRow>
				<div style={{ width: 240 }}>
					<SearchInput
						placeholder="Tìm rau, khách hàng..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						onClear={() => setSearch("")}
					/>
				</div>
				<div style={{ width: 240 }}>
					<SearchInput size="sm" defaultValue="rau muống" placeholder="Uncontrolled" />
				</div>
				<div style={{ width: 240 }}>
					<SearchInput disabled placeholder="Vô hiệu" />
				</div>
			</DemoRow>

			<DemoSub>DateInput</DemoSub>
			<DemoRow>
				<DateInput size="sm" defaultValue="2026-07-05" />
				<DateInput defaultValue="2026-07-05" />
				<DateInput size="lg" />
				<DateInput invalid />
				<DateInput disabled defaultValue="2026-07-05" />
			</DemoRow>

			<DemoSub>FormField — mini form "Tạo đơn hàng"</DemoSub>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 16,
					maxWidth: 360,
					padding: 16,
					borderRadius: 8,
					background: "var(--color-surface)",
					border: "1px solid var(--color-border)",
				}}
			>
				<FormField label="Tên khách hàng" required>
					<Input placeholder="Nhập tên khách..." />
				</FormField>
				<FormField label="Số lượng" error="Số lượng phải lớn hơn 0">
					<NumberInput defaultValue={0} min={0} step={0.5} unit="kg" />
				</FormField>
				<FormField label="Ngày giao" required>
					<DateInput defaultValue="2026-07-06" />
				</FormField>
				<FormField label="Thanh toán" hint="Bật nếu khách đã chuyển khoản">
					<Switch label="Đã thanh toán" />
				</FormField>
				<FormField label="Ghi chú" hint="Không bắt buộc">
					<Textarea placeholder="Ví dụ: giao trước 7h sáng" />
				</FormField>
				<div style={{ display: "flex", gap: 8 }}>
					<Button>Lưu đơn</Button>
					<Button variant="ghost">Hủy</Button>
				</div>
			</div>
		</DemoSection>
	);
}
