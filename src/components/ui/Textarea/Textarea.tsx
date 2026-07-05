import type { ComponentProps } from "react";

import { useFormField } from "../FormField/FormFieldContext";
import type { ControlSize } from "../shared";
import { cx, joinIds } from "../shared";
import styles from "./Textarea.module.css";

export interface TextareaProps extends ComponentProps<"textarea"> {
	size?: ControlSize;
	/** Trạng thái lỗi khi dùng standalone; bên trong FormField sẽ tự lấy từ context. */
	invalid?: boolean;
}

/** Ô nhập liệu nhiều dòng, chỉ cho phép kéo giãn theo chiều dọc. */
export function Textarea({
	size = "md",
	invalid,
	rows = 3,
	id,
	className,
	"aria-describedby": ariaDescribedBy,
	...rest
}: TextareaProps) {
	const field = useFormField();
	const isInvalid = invalid ?? field?.invalid ?? false;

	return (
		<textarea
			className={cx(styles.textarea, styles[size], className)}
			rows={rows}
			id={id ?? field?.id}
			aria-invalid={isInvalid || undefined}
			aria-describedby={ariaDescribedBy ?? joinIds(field?.errorId, field?.hintId)}
			{...rest}
		/>
	);
}
