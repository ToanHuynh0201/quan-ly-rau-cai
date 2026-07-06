import { Page, PageHeader } from "@/components/layout";

import { DisplaySection } from "./sections/DisplaySection";
import { FormsSection } from "./sections/FormsSection";
import { NavigationSection } from "./sections/NavigationSection";
import { OverlaySection } from "./sections/OverlaySection";
import { TokensSection } from "./sections/TokensSection";

// Style guide — tài liệu sống của design system: token + demo mọi base component.
// Mỗi nhóm component nằm trong một section riêng dưới ./sections.

export function StyleGuidePage() {
	return (
		<Page style={{ paddingBottom: 24 }}>
			<PageHeader
				title="Style guide — Quản lý bán buôn rau cải"
				description={
					<>
						Tài liệu sống của design system. Component chỉ dùng token semantic (
						<code>--color-*</code>, <code>--space-*</code>, <code>--radius-*</code>,{" "}
						<code>--shadow-*</code>).
					</>
				}
			/>
			{/* Gói các section vào một khối để giữ nhịp margin sẵn có của DemoSection,
			    không bị gap của Page chen giữa từng section */}
			<div>
				<TokensSection />
				<FormsSection />
				<DisplaySection />
				<NavigationSection />
				<OverlaySection />
			</div>
		</Page>
	);
}
