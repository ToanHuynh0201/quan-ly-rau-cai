import type { ComponentProps, ReactNode } from "react";

import { cx } from "../shared";
import styles from "./Card.module.css";

export interface CardProps extends ComponentProps<"div"> {
	/**
	 * Padding trực tiếp trên card cho nội dung đơn giản không dùng CardBody.
	 * Mặc định "none" — CardHeader/CardBody/CardFooter tự mang padding,
	 * và Table đặt trực tiếp trong Card sẽ tràn sát viền.
	 */
	padding?: "none" | "md";
}

/** Khối surface có viền + bóng nhẹ. Hiệu ứng nâng khi hover là opt-in qua class toàn cục "card-hover". */
export function Card({ padding = "none", className, ...rest }: CardProps) {
	return (
		<div className={cx(styles.card, padding === "md" && styles.padded, className)} {...rest} />
	);
}

export interface CardHeaderProps extends Omit<ComponentProps<"div">, "title"> {
	title?: ReactNode;
	/** Slot bên phải cho nút hành động (Button, IconButton...). */
	actions?: ReactNode;
}

export function CardHeader({ title, actions, className, children, ...rest }: CardHeaderProps) {
	return (
		<div className={cx(styles.header, className)} {...rest}>
			{title != null && <h3 className={styles.title}>{title}</h3>}
			{children}
			{actions && <div className={styles.actions}>{actions}</div>}
		</div>
	);
}

export function CardBody({ className, ...rest }: ComponentProps<"div">) {
	return <div className={cx(styles.body, className)} {...rest} />;
}

/** Chân card — căn phải, dành cho hàng nút hành động. */
export function CardFooter({ className, ...rest }: ComponentProps<"div">) {
	return <div className={cx(styles.footer, className)} {...rest} />;
}
