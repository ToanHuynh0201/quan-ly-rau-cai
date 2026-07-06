import type { ComponentProps } from "react";

import { useFormField } from "../FormField/FormFieldContext";
import type { ControlSize } from "../shared";
import { cx, joinIds } from "../shared";
import styles from "./DateInput.module.css";

export interface DateInputProps extends Omit<ComponentProps<"input">, "size" | "type"> {
	size?: ControlSize;
	/** Trạng thái lỗi khi dùng standalone; bên trong FormField sẽ tự lấy từ context. */
	invalid?: boolean;
}

/**
 * Ô chọn ngày dùng picker native của trình duyệt — tự hiển thị đúng định dạng
 * tiếng Việt (dd/mm/yyyy), có keyboard + picker mobile miễn phí.
 *
 * LƯU Ý: value/onChange luôn dùng chuẩn ISO "yyyy-MM-dd" bất kể định dạng
 * hiển thị. Không parse chuỗi hiển thị; format để hiển thị nơi khác dùng
 * formatDate trong @/utils.
 */
export function DateInput({
	size = "md",
	invalid,
	id,
	className,
	"aria-describedby": ariaDescribedBy,
	...rest
}: DateInputProps) {
	const field = useFormField();
	const isInvalid = invalid ?? field?.invalid ?? false;

	return (
		<input
			className={cx(styles.input, styles[size], className)}
			type="date"
			id={id ?? field?.id}
			aria-invalid={isInvalid || undefined}
			aria-describedby={ariaDescribedBy ?? joinIds(field?.errorId, field?.hintId)}
			{...rest}
		/>
	);
}
