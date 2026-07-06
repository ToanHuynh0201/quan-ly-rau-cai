import { ChevronRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { Link } from "react-router";

import { cx } from "../shared";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbItem {
	label: ReactNode;
	/** Đường dẫn của item (dùng ROUTER constants); item cuối không cần to. */
	to?: string;
}

export interface BreadcrumbProps extends ComponentProps<"nav"> {
	items: BreadcrumbItem[];
}

/**
 * Đường dẫn phân cấp thuần presentational — không tự suy ra từ route,
 * trang tự biết trail của mình và truyền items vào. Item cuối là trang
 * hiện tại (aria-current="page"), các item trước là Link.
 */
export function Breadcrumb({ items, className, ...rest }: BreadcrumbProps) {
	return (
		<nav aria-label="Đường dẫn" className={cx(styles.root, className)} {...rest}>
			<ol className={styles.list}>
				{items.map((item, index) => {
					const isLast = index === items.length - 1;
					return (
						<li key={index} className={styles.item}>
							{!isLast && item.to != null ? (
								<Link className={styles.link} to={item.to}>
									{item.label}
								</Link>
							) : (
								<span
									className={isLast ? styles.current : styles.label}
									aria-current={isLast ? "page" : undefined}
								>
									{item.label}
								</span>
							)}
							{!isLast && (
								<ChevronRight
									size={14}
									className={styles.separator}
									aria-hidden="true"
								/>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
