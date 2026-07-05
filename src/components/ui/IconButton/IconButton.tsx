import type { ComponentProps } from "react";

import type { ControlSize } from "../shared";
import { cx } from "../shared";
import styles from "./IconButton.module.css";

export interface IconButtonProps extends ComponentProps<"button"> {
	/** Bắt buộc — nút chỉ có icon nên cần label cho screen reader. */
	"aria-label": string;
	size?: ControlSize;
}

/** Nút vuông chỉ chứa icon (style ghost), bắt buộc có aria-label. */
export function IconButton({
	size = "md",
	type = "button",
	className,
	children,
	...rest
}: IconButtonProps) {
	return (
		<button className={cx(styles.iconButton, styles[size], className)} type={type} {...rest}>
			{children}
		</button>
	);
}
