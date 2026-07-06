import type { CSSProperties, ReactNode } from "react";

// Helper trình bày dùng chung cho các section của style guide.
// Inline style là chủ ý — trang demo nội bộ, không cần CSS module riêng.

export function DemoSection({ title, children }: { title: string; children: ReactNode }) {
	return (
		<section>
			<h2 style={{ margin: "32px 0 12px", fontSize: 18, fontWeight: 600 }}>{title}</h2>
			{children}
		</section>
	);
}

export function DemoSub({ children }: { children: ReactNode }) {
	return <div style={{ fontSize: 13, fontWeight: 600, margin: "16px 0 6px" }}>{children}</div>;
}

export function DemoRow({ children, style }: { children: ReactNode; style?: CSSProperties }) {
	return (
		<div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", ...style }}>
			{children}
		</div>
	);
}

/** Ô màu hiển thị một CSS custom property. */
export function Swatch({ token, size = 48 }: { token: string; size?: number }) {
	return (
		<div style={{ width: 72, fontSize: 11, color: "var(--color-text-secondary)" }}>
			<div
				style={{
					height: size,
					borderRadius: 6,
					background: `var(${token})`,
					border: "1px solid var(--color-border)",
				}}
			/>
			<div style={{ marginTop: 4, wordBreak: "break-all" }}>{token}</div>
		</div>
	);
}
