import type { ComponentProps, ReactNode } from "react";

import type { ControlSize } from "../shared";
import { cx } from "../shared";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export interface ButtonProps extends ComponentProps<"button"> {
	variant?: ButtonVariant;
	size?: ControlSize;
	/** Hiện spinner và vô hiệu hóa nút, label vẫn hiển thị. */
	loading?: boolean;
	iconLeft?: ReactNode;
	iconRight?: ReactNode;
}

/** Nút bấm cơ bản với variant, size, trạng thái loading và icon hai bên. */
export function Button({
	variant = "primary",
	size = "md",
	loading = false,
	iconLeft,
	iconRight,
	type = "button",
	disabled,
	className,
	children,
	...rest
}: ButtonProps) {
	return (
		<button
			className={cx(styles.button, styles[variant], styles[size], className)}
			type={type}
			disabled={disabled || loading}
			aria-busy={loading || undefined}
			{...rest}
		>
			{loading ? (
				<span className={styles.spinner} aria-hidden="true" />
			) : (
				iconLeft && (
					<span className={styles.icon} aria-hidden="true">
						{iconLeft}
					</span>
				)
			)}
			{children}
			{iconRight && (
				<span className={styles.icon} aria-hidden="true">
					{iconRight}
				</span>
			)}
		</button>
	);
}
