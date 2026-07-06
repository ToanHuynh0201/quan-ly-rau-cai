import type { ComponentProps } from "react";

import type { ControlSize } from "../shared";
import { cx } from "../shared";
import styles from "./Spinner.module.css";

export interface SpinnerProps extends ComponentProps<"span"> {
	size?: ControlSize;
	/** Nội dung đọc bởi screen reader (không hiển thị). */
	label?: string;
}

/**
 * Vòng quay báo trạng thái đang tải cho trang/khối nội dung/bảng.
 * Button có spinner riêng theo màu chữ — Spinner này dành cho vùng nội dung.
 */
export function Spinner({ size = "md", label = "Đang tải...", className, ...rest }: SpinnerProps) {
	return (
		<span className={cx(styles.root, styles[size], className)} role="status" {...rest}>
			<span className={styles.ring} aria-hidden="true" />
			<span className={styles.visuallyHidden}>{label}</span>
		</span>
	);
}
