import { useState } from "react";

import { Breadcrumb, Pagination, Tab, TabList, TabPanel, Tabs } from "@/components/ui";
import { ROUTER } from "@/constants";

import { DemoRow, DemoSection, DemoSub } from "../demoHelpers";

export function NavigationSection() {
	const [page, setPage] = useState(1);

	return (
		<DemoSection title="Điều hướng">
			<DemoSub>Tabs — uncontrolled, Arrow/Home/End để di chuyển</DemoSub>
			<Tabs defaultValue="don-hang" style={{ maxWidth: 480 }}>
				<TabList>
					<Tab value="don-hang">Đơn hàng</Tab>
					<Tab value="ton-kho">Tồn kho</Tab>
					<Tab value="khach-hang">Khách hàng</Tab>
					<Tab value="bao-cao" disabled>
						Báo cáo
					</Tab>
				</TabList>
				<TabPanel value="don-hang">
					Danh sách đơn hàng trong ngày sẽ hiển thị ở đây.
				</TabPanel>
				<TabPanel value="ton-kho">Tồn kho hiện tại theo từng loại rau.</TabPanel>
				<TabPanel value="khach-hang">Danh bạ khách mua buôn.</TabPanel>
				<TabPanel value="bao-cao">Báo cáo doanh thu (tab bị khóa).</TabPanel>
			</Tabs>

			<DemoSub>Pagination — stateful (trang {page}/24)</DemoSub>
			<DemoRow>
				<Pagination page={page} totalPages={24} onPageChange={setPage} />
			</DemoRow>
			<DemoRow style={{ marginTop: 8 }}>
				<Pagination page={3} totalPages={5} onPageChange={() => {}} />
			</DemoRow>

			<DemoSub>Breadcrumb</DemoSub>
			<DemoRow>
				<Breadcrumb
					items={[
						{ label: "Trang chủ", to: ROUTER.HOME },
						{ label: "Đơn hàng", to: ROUTER.HOME },
						{ label: "Đơn #1024" },
					]}
				/>
			</DemoRow>
		</DemoSection>
	);
}
