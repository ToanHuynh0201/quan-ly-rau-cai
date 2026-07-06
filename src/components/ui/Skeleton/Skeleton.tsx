import type { ComponentProps } from "react";

import { cx } from "../shared";
import styles from "./Skeleton.module.css";

export type SkeletonVariant = "text" | "rect" | "circle";

export interface SkeletonProps extends ComponentProps<"span"> {
	variant?: SkeletonVariant;
	width?: number | string;
	height?: number | string;
}

/**
 * Placeholder nhấp nháy khi chờ dữ liệu (dùng hiệu ứng shimmer toàn cục).
 * Ẩn với screen reader — vùng chứa nên tự thông báo trạng thái tải.
 */
export function Skeleton({
	variant = "text",
	width,
	height,
	className,
	style,
	...rest
}: SkeletonProps) {
	return (
		<span
			className={cx("shimmer", styles.root, styles[variant], className)}
			style={{ width, height, ...style }}
			aria-hidden="true"
			{...rest}
		/>
	);
}
