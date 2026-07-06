import type { ComponentProps } from "react";

import { cx } from "../shared";
import styles from "./Table.module.css";

export interface TableProps extends ComponentProps<"table"> {
	/** Nhãn mô tả nội dung bảng cho vùng cuộn ngang (a11y). */
	"aria-label"?: string;
}

/**
 * Bộ primitive bảng đã style — KHÔNG kèm logic sort/chọn dòng.
 * Bảng được bọc trong vùng cuộn ngang focus được bằng bàn phím;
 * className áp vào vùng bọc (giống pattern của Input), ...rest vào <table>.
 */
export function Table({ className, "aria-label": ariaLabel, ...rest }: TableProps) {
	return (
		<div
			className={cx(styles.scroller, className)}
			role="region"
			aria-label={ariaLabel}
			tabIndex={0}
		>
			<table className={styles.table} {...rest} />
		</div>
	);
}

export function TableHead({ className, ...rest }: ComponentProps<"thead">) {
	return <thead className={cx(styles.head, className)} {...rest} />;
}

export function TableBody({ className, ...rest }: ComponentProps<"tbody">) {
	return <tbody className={cx(styles.body, className)} {...rest} />;
}

export function TableRow({ className, ...rest }: ComponentProps<"tr">) {
	return <tr className={cx(styles.row, className)} {...rest} />;
}

export interface TableHeaderCellProps extends ComponentProps<"th"> {
	/** Cột số (giá VND, số lượng kg) — căn phải + chữ số đều nhau. */
	numeric?: boolean;
}

export function TableHeaderCell({ numeric, className, ...rest }: TableHeaderCellProps) {
	return (
		<th
			className={cx(styles.headerCell, numeric && styles.numeric, className)}
			scope="col"
			{...rest}
		/>
	);
}

export interface TableCellProps extends ComponentProps<"td"> {
	/** Cột số (giá VND, số lượng kg) — căn phải + chữ số đều nhau. */
	numeric?: boolean;
}

export function TableCell({ numeric, className, ...rest }: TableCellProps) {
	return <td className={cx(styles.cell, numeric && styles.numeric, className)} {...rest} />;
}
