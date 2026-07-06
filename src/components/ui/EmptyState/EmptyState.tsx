import type { ComponentProps, ReactNode } from "react";

import { cx } from "../shared";
import styles from "./EmptyState.module.css";

export interface EmptyStateProps extends Omit<ComponentProps<"div">, "title"> {
	icon?: ReactNode;
	title: ReactNode;
	description?: ReactNode;
	/** Slot cho nút hành động, ví dụ "Tạo đơn hàng". */
	action?: ReactNode;
}

/** Trạng thái rỗng cho danh sách/bảng chưa có dữ liệu hoặc không có kết quả lọc. */
export function EmptyState({
	icon,
	title,
	description,
	action,
	className,
	...rest
}: EmptyStateProps) {
	return (
		<div className={cx(styles.root, className)} {...rest}>
			{icon && (
				<span className={styles.icon} aria-hidden="true">
					{icon}
				</span>
			)}
			<p className={styles.title}>{title}</p>
			{description != null && <p className={styles.description}>{description}</p>}
			{action && <div className={styles.action}>{action}</div>}
		</div>
	);
}
