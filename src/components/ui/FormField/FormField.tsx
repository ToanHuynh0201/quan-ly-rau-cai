import type { ReactNode } from "react";
import { useId, useMemo } from "react";

import { cx } from "../shared";
import styles from "./FormField.module.css";
import type { FormFieldContextValue } from "./FormFieldContext";
import { FormFieldContext } from "./FormFieldContext";

export interface FormFieldProps {
	label: string;
	/** Dòng mô tả phụ hiển thị dưới control. */
	hint?: string;
	/** Thông báo lỗi; khi có giá trị, control bên trong tự chuyển sang trạng thái invalid. */
	error?: string;
	/** Hiện dấu * đỏ sau label. */
	required?: boolean;
	/** Override id; mặc định tự sinh bằng useId. */
	id?: string;
	className?: string;
	children: ReactNode;
}

/**
 * Bọc một form control với label + hint + error, tự nối id/htmlFor và
 * aria-invalid/aria-describedby cho control bên trong qua FormFieldContext.
 */
export function FormField({
	label,
	hint,
	error,
	required = false,
	id: idProp,
	className,
	children,
}: FormFieldProps) {
	const generatedId = useId();
	const id = idProp ?? generatedId;
	const hintId = hint ? `${id}-hint` : undefined;
	const errorId = error ? `${id}-err` : undefined;
	const invalid = Boolean(error);

	const contextValue = useMemo<FormFieldContextValue>(
		() => ({ id, hintId, errorId, invalid }),
		[id, hintId, errorId, invalid],
	);

	return (
		<div className={cx(styles.field, className)}>
			<label className={styles.label} htmlFor={id}>
				{label}
				{required && (
					<span className={styles.required} aria-hidden="true">
						*
					</span>
				)}
			</label>
			<FormFieldContext value={contextValue}>{children}</FormFieldContext>
			{hint && (
				<p className={styles.hint} id={hintId}>
					{hint}
				</p>
			)}
			{error && (
				<p className={styles.error} id={errorId} role="alert">
					{error}
				</p>
			)}
		</div>
	);
}
