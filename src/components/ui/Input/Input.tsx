import type { ComponentProps, ReactNode } from "react";

import { useFormField } from "../FormField/FormFieldContext";
import type { ControlSize } from "../shared";
import { cx, joinIds } from "../shared";
import styles from "./Input.module.css";

export interface InputProps extends Omit<ComponentProps<"input">, "size"> {
	size?: ControlSize;
	/** Trạng thái lỗi khi dùng standalone; bên trong FormField sẽ tự lấy từ context. */
	invalid?: boolean;
	iconLeft?: ReactNode;
	iconRight?: ReactNode;
}

/**
 * Ô nhập liệu một dòng.
 * Lưu ý: className áp vào wrapper bên ngoài; mọi props khác (kể cả ref, style)
 * đi thẳng vào thẻ input.
 */
export function Input({
	size = "md",
	invalid,
	iconLeft,
	iconRight,
	id,
	className,
	"aria-describedby": ariaDescribedBy,
	...rest
}: InputProps) {
	const field = useFormField();
	const isInvalid = invalid ?? field?.invalid ?? false;
	const hasIconLeft = iconLeft != null;
	const hasIconRight = iconRight != null;

	return (
		<span className={cx(styles.wrapper, className)}>
			{hasIconLeft && (
				<span className={cx(styles.icon, styles.iconLeft)} aria-hidden="true">
					{iconLeft}
				</span>
			)}
			<input
				className={cx(
					styles.input,
					styles[size],
					hasIconLeft && styles.hasIconLeft,
					hasIconRight && styles.hasIconRight,
				)}
				id={id ?? field?.id}
				aria-invalid={isInvalid || undefined}
				aria-describedby={ariaDescribedBy ?? joinIds(field?.errorId, field?.hintId)}
				{...rest}
			/>
			{hasIconRight && (
				<span className={cx(styles.icon, styles.iconRight)} aria-hidden="true">
					{iconRight}
				</span>
			)}
		</span>
	);
}
