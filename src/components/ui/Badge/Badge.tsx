import type { ComponentProps, ReactNode } from "react";

import { cx } from "../shared";
import styles from "./Badge.module.css";

export type BadgeVariant =
	"neutral" | "primary" | "accent" | "success" | "warning" | "error" | "info";

export interface BadgeProps extends ComponentProps<"span"> {
	variant?: BadgeVariant;
	size?: "sm" | "md";
	icon?: ReactNode;
}

/**
 * Nhãn trạng thái dạng pill — ví dụ trạng thái đơn hàng:
 * success = "Đã giao", warning = "Chờ xử lý", error = "Đã hủy", info = "Đang giao".
 */
export function Badge({
	variant = "neutral",
	size = "md",
	icon,
	className,
	children,
	...rest
}: BadgeProps) {
	return (
		<span className={cx(styles.badge, styles[variant], styles[size], className)} {...rest}>
			{icon && (
				<span className={styles.icon} aria-hidden="true">
					{icon}
				</span>
			)}
			{children}
		</span>
	);
}
