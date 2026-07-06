import { DemoRow, DemoSection, DemoSub, Swatch } from "../demoHelpers";

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
		tokens: [
			"--color-accent",
			"--color-accent-hover",
			"--color-accent-subtle",
			"--color-accent-border",
			"--color-accent-text",
		],
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

const SPACE_TOKENS = [
	"--space-0-5",
	"--space-1",
	"--space-1-5",
	"--space-2",
	"--space-2-5",
	"--space-3",
	"--space-3-5",
	"--space-4",
	"--space-5",
	"--space-6",
	"--space-8",
	"--space-10",
	"--space-12",
];

const RADIUS_TOKENS = ["--radius-sm", "--radius-md", "--radius-lg", "--radius-xl", "--radius-full"];

const SHADOW_TOKENS = ["--shadow-sm", "--shadow-md", "--shadow-lg", "--shadow-xl"];

export function TokensSection() {
	return (
		<>
			<DemoSection title="Primitive palette">
				{PRIMITIVE_SCALES.map((scale) => (
					<div key={scale.name} style={{ marginBottom: 16 }}>
						<DemoSub>{scale.label}</DemoSub>
						<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
							{scale.steps.map((step) => (
								<Swatch key={step} token={`--${scale.name}-${step}`} size={40} />
							))}
						</div>
					</div>
				))}
			</DemoSection>

			<DemoSection title="Semantic tokens">
				{SEMANTIC_GROUPS.map((group) => (
					<div key={group.label} style={{ marginBottom: 16 }}>
						<DemoSub>{group.label}</DemoSub>
						<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
							{group.tokens.map((token) => (
								<Swatch key={token} token={token} />
							))}
						</div>
					</div>
				))}
			</DemoSection>

			<DemoSection title="Spacing / Radius / Shadow">
				<DemoSub>--space-*</DemoSub>
				<div style={{ display: "grid", gap: 4 }}>
					{SPACE_TOKENS.map((token) => (
						<div key={token} style={{ display: "flex", alignItems: "center", gap: 12 }}>
							<code style={{ width: 110, fontSize: 12 }}>{token}</code>
							<div
								style={{
									width: `var(${token})`,
									height: 12,
									background: "var(--color-primary)",
									borderRadius: 2,
								}}
							/>
						</div>
					))}
				</div>

				<DemoSub>--radius-*</DemoSub>
				<DemoRow>
					{RADIUS_TOKENS.map((token) => (
						<div key={token} style={{ textAlign: "center", fontSize: 11 }}>
							<div
								style={{
									width: 64,
									height: 48,
									borderRadius: `var(${token})`,
									background: "var(--color-primary-subtle)",
									border: "1px solid var(--color-primary-border)",
								}}
							/>
							<code>{token}</code>
						</div>
					))}
				</DemoRow>

				<DemoSub>--shadow-*</DemoSub>
				<DemoRow style={{ gap: 24, padding: "12px 0 24px" }}>
					{SHADOW_TOKENS.map((token) => (
						<div key={token} style={{ textAlign: "center", fontSize: 11 }}>
							<div
								style={{
									width: 96,
									height: 64,
									borderRadius: "var(--radius-lg)",
									background: "var(--color-surface)",
									boxShadow: `var(${token})`,
								}}
							/>
							<code>{token}</code>
						</div>
					))}
				</DemoRow>
			</DemoSection>

			<DemoSection title="Animation utilities">
				<DemoSub>.shimmer — skeleton loading</DemoSub>
				<div style={{ display: "grid", gap: 8, maxWidth: 400 }}>
					{[100, 80, 60].map((width) => (
						<div
							key={width}
							className="shimmer"
							style={{ height: 16, width: `${width}%`, borderRadius: 4 }}
						/>
					))}
				</div>

				<DemoSub>.card-hover / .btn-float / .pulse — di chuột để xem hiệu ứng</DemoSub>
				<DemoRow>
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
				</DemoRow>
			</DemoSection>
		</>
	);
}
