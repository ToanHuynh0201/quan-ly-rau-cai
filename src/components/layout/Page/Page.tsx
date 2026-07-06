import type { ComponentProps, ReactNode } from "react";
import { useEffect } from "react";

import type { BreadcrumbItem } from "@/components/ui";
import { Breadcrumb, cx } from "@/components/ui";
import { APP_NAME } from "@/constants";

import styles from "./Page.module.css";

/**
 * Khung dọc của một trang: PageHeader rồi đến các khối nội dung, cách nhau
 * đều bằng gap. Max-width/padding của vùng nội dung đã do container của
 * AppLayout đảm nhiệm — Page không lo việc đó.
 */
export function Page({ className, ...rest }: ComponentProps<"div">) {
	return <div className={cx(styles.page, className)} {...rest} />;
}

export interface PageHeaderProps extends Omit<ComponentProps<"header">, "title"> {
	title: ReactNode;
	description?: ReactNode;
	/** Trail truyền thẳng cho Breadcrumb, hiển thị phía trên title. */
	breadcrumb?: BreadcrumbItem[];
	/** Slot nút hành động bên phải hàng title (vd. "Tạo đơn hàng"). */
	actions?: ReactNode;
}

/**
 * Header chuẩn của một trang: breadcrumb → title + actions → description.
 * Khi title là string, tự set document.title = "{title} — APP_NAME";
 * title là ReactNode phức tạp thì trang tự lo document.title nếu cần.
 */
export function PageHeader({
	title,
	description,
	breadcrumb,
	actions,
	className,
	...rest
}: PageHeaderProps) {
	useEffect(() => {
		if (typeof title === "string") document.title = `${title} — ${APP_NAME}`;
	}, [title]);

	return (
		<header className={cx(styles.header, className)} {...rest}>
			{breadcrumb != null && breadcrumb.length > 0 && <Breadcrumb items={breadcrumb} />}
			<div className={styles.titleRow}>
				<h1 className={styles.title}>{title}</h1>
				{actions != null && <div className={styles.actions}>{actions}</div>}
			</div>
			{description != null && <p className={styles.description}>{description}</p>}
		</header>
	);
}
