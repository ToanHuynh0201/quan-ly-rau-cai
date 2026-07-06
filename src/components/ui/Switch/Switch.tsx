import type { ComponentProps, ReactNode } from "react";

import { useFormField } from "../FormField/FormFieldContext";
import type { ControlSize } from "../shared";
import { cx, joinIds } from "../shared";
import styles from "./Switch.module.css";

export interface SwitchProps extends Omit<ComponentProps<"input">, "type" | "size"> {
	label?: ReactNode;
	size?: ControlSize;
	/** Trạng thái lỗi khi dùng standalone; bên trong FormField sẽ tự lấy từ context. */
	invalid?: boolean;
}

/**
 * Công tắc bật/tắt — cùng cấu trúc với Checkbox: input gốc ẩn (vẫn nhận
 * focus/keyboard), track + thumb được vẽ bằng CSS. role="switch" trên
 * checkbox gốc cho screen reader đọc đúng trạng thái bật/tắt.
 */
export function Switch({
	label,
	size = "md",
	invalid,
	id,
	className,
	"aria-describedby": ariaDescribedBy,
	...rest
}: SwitchProps) {
	const field = useFormField();
	const isInvalid = invalid ?? field?.invalid ?? false;

	return (
		<label className={cx(styles.root, styles[size], className)}>
			<input
				className={styles.input}
				type="checkbox"
				role="switch"
				id={id ?? field?.id}
				aria-invalid={isInvalid || undefined}
				aria-describedby={ariaDescribedBy ?? joinIds(field?.errorId, field?.hintId)}
				{...rest}
			/>
			<span className={styles.track} aria-hidden="true">
				<span className={styles.thumb} />
			</span>
			{label != null && <span className={styles.text}>{label}</span>}
		</label>
	);
}
