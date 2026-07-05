import type { ComponentProps } from "react";

import { useFormField } from "../FormField/FormFieldContext";
import type { ControlSize } from "../shared";
import { cx, joinIds } from "../shared";
import styles from "./Select.module.css";

export interface SelectProps extends Omit<ComponentProps<"select">, "size"> {
	size?: ControlSize;
	/** Trạng thái lỗi khi dùng standalone; bên trong FormField sẽ tự lấy từ context. */
	invalid?: boolean;
}

/**
 * Dropdown chọn một giá trị, truyền <option> qua children.
 * Lưu ý: className áp vào wrapper bên ngoài; mọi props khác (kể cả ref, style)
 * đi thẳng vào thẻ select.
 */
export function Select({
	size = "md",
	invalid,
	id,
	className,
	"aria-describedby": ariaDescribedBy,
	children,
	...rest
}: SelectProps) {
	const field = useFormField();
	const isInvalid = invalid ?? field?.invalid ?? false;

	return (
		<span className={cx(styles.wrapper, className)}>
			<select
				className={cx(styles.select, styles[size])}
				id={id ?? field?.id}
				aria-invalid={isInvalid || undefined}
				aria-describedby={ariaDescribedBy ?? joinIds(field?.errorId, field?.hintId)}
				{...rest}
			>
				{children}
			</select>
		</span>
	);
}
