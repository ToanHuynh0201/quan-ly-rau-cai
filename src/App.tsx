import type { CSSProperties } from "react";

// Trang preview tạm cho color system — có thể giữ làm style-guide hoặc xóa khi build UI thật.

const FULL_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const STATUS_STEPS = [50, 200, 500, 600, 700];

const PRIMITIVE_SCALES = [
	{ name: "green", label: "Green — primary", steps: FULL_STEPS },
	{ name: "orange", label: "Orange — accent", steps: FULL_STEPS },
	{ name: "gray", label: "Gray — neutral", steps: FULL_STEPS },
	{ name: "red", label: "Red — error", steps: STATUS_STEPS },
	{ name: "amber", label: "Amber — warning", steps: STATUS_STEPS },
	{ name: "blue", label: "Blue — info", steps: STATUS_STEPS },
];

const SEMANTIC_GROUPS = [
	{
		label: "Brand",
		tokens: [
			"--color-primary",
			"--color-primary-hover",
			"--color-primary-active",
			"--color-primary-subtle",
			"--color-primary-subtle-hover",
			"--color-primary-border",
		],
	},
	{
		label: "Accent",
		tokens: ["--color-accent", "--color-accent-hover", "--color-accent-subtle"],
	},
	{
		label: "Text",
		tokens: [
			"--color-text",
			"--color-text-secondary",
			"--color-text-muted",
			"--color-text-link",
			"--color-text-link-hover",
		],
	},
	{
		label: "Background & surface",
		tokens: [
			"--color-bg",
			"--color-surface",
			"--color-surface-hover",
			"--color-surface-active",
			"--color-bg-inverse",
		],
	},
	{
		label: "Border",
		tokens: ["--color-border", "--color-border-strong", "--color-border-focus"],
	},
];

const STATUSES = ["success", "warning", "error", "info"];

const sectionTitleStyle: CSSProperties = {
	margin: "32px 0 12px",
	fontSize: 18,
	fontWeight: 600,
};

function Swatch({ token, size = 48 }: { token: string; size?: number }) {
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

function App() {
	return (
		<div style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
			<h1 style={{ fontSize: 24 }}>Color system — Quản lý bán buôn rau cải</h1>
			<p style={{ color: "var(--color-text-secondary)" }}>
				Trang preview tạm. Component chỉ dùng token semantic (<code>--color-*</code>).
			</p>

			<h2 style={sectionTitleStyle}>1. Primitive palette</h2>
			{PRIMITIVE_SCALES.map((scale) => (
				<div key={scale.name} style={{ marginBottom: 16 }}>
					<div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
						{scale.label}
					</div>
					<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
						{scale.steps.map((step) => (
							<Swatch key={step} token={`--${scale.name}-${step}`} size={40} />
						))}
					</div>
				</div>
			))}

			<h2 style={sectionTitleStyle}>2. Semantic tokens</h2>
			{SEMANTIC_GROUPS.map((group) => (
				<div key={group.label} style={{ marginBottom: 16 }}>
					<div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
						{group.label}
					</div>
					<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
						{group.tokens.map((token) => (
							<Swatch key={token} token={token} />
						))}
					</div>
				</div>
			))}

			<h2 style={sectionTitleStyle}>3. Ví dụ sử dụng</h2>
			<div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
				<button
					style={{
						padding: "8px 16px",
						borderRadius: 6,
						border: "none",
						background: "var(--color-primary)",
						color: "var(--color-on-primary)",
						fontWeight: 600,
						cursor: "pointer",
					}}
				>
					Tạo đơn hàng
				</button>
				<button
					style={{
						padding: "8px 16px",
						borderRadius: 6,
						border: "1px solid var(--color-primary-border)",
						background: "var(--color-primary-subtle)",
						color: "var(--color-primary-active)",
						fontWeight: 600,
						cursor: "pointer",
					}}
				>
					Xem tồn kho
				</button>
				<button
					style={{
						padding: "8px 16px",
						borderRadius: 6,
						border: "none",
						background: "var(--color-accent)",
						color: "var(--color-on-accent)",
						fontWeight: 600,
						cursor: "pointer",
					}}
				>
					Khuyến mãi
				</button>
				<a href="#preview">Liên kết ví dụ</a>
			</div>

			<div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
				{STATUSES.map((status) => (
					<span
						key={status}
						style={{
							padding: "4px 12px",
							borderRadius: 999,
							fontSize: 13,
							fontWeight: 600,
							background: `var(--color-${status}-bg)`,
							border: `1px solid var(--color-${status}-border)`,
							color: `var(--color-${status}-text)`,
						}}
					>
						{status}
					</span>
				))}
			</div>

			<div
				style={{
					marginTop: 16,
					padding: 16,
					borderRadius: 8,
					background: "var(--color-surface)",
					border: "1px solid var(--color-border)",
				}}
			>
				<div style={{ fontWeight: 600 }}>Card trên nền surface</div>
				<div style={{ color: "var(--color-text-secondary)", fontSize: 14, marginTop: 4 }}>
					Chữ phụ dùng --color-text-secondary,{" "}
					<span style={{ color: "var(--color-text-muted)" }}>
						chữ mờ dùng --color-text-muted
					</span>
					.
				</div>
			</div>

			<h2 style={sectionTitleStyle}>4. Utilities</h2>
			<div className="fade-in" style={{ marginBottom: 48 }}>
				<div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
					.shimmer — skeleton loading
				</div>
				<div style={{ display: "grid", gap: 8, maxWidth: 400 }}>
					{[100, 80, 60].map((width) => (
						<div
							key={width}
							className="shimmer"
							style={{ height: 16, width: `${width}%`, borderRadius: 4 }}
						/>
					))}
				</div>

				<div style={{ fontSize: 13, fontWeight: 600, margin: "16px 0 6px" }}>
					.card-hover / .btn-float / .pulse — di chuột để xem hiệu ứng
				</div>
				<div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
					<div
						className="card-hover"
						style={{
							padding: 16,
							borderRadius: 8,
							background: "var(--color-surface)",
							border: "1px solid var(--color-border)",
						}}
					>
						Card có .card-hover
					</div>
					<button
						className="btn-float"
						style={{
							padding: "8px 16px",
							borderRadius: 6,
							border: "none",
							background: "var(--color-primary)",
							color: "var(--color-on-primary)",
							fontWeight: 600,
							cursor: "pointer",
						}}
					>
						Nút có .btn-float
					</button>
					<span
						className="pulse"
						style={{
							padding: "4px 12px",
							borderRadius: 999,
							fontSize: 13,
							fontWeight: 600,
							background: "var(--color-warning-bg)",
							border: "1px solid var(--color-warning-border)",
							color: "var(--color-warning-text)",
						}}
					>
						Badge .pulse
					</span>
				</div>
			</div>
		</div>
	);
}

export default App;
