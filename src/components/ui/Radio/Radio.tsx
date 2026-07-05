import type { ComponentProps, ReactNode } from "react";

import { useFormField } from "../FormField/FormFieldContext";
import type { ControlSize } from "../shared";
import { cx, joinIds } from "../shared";
import styles from "./Radio.module.css";

export interface RadioProps extends Omit<ComponentProps<"input">, "type" | "size"> {
	label?: ReactNode;
	size?: ControlSize;
	/** Trạng thái lỗi khi dùng standalone; bên trong FormField sẽ tự lấy từ context. */
	invalid?: boolean;
}

/**
 * Radio tùy biến: input gốc được ẩn (vẫn nhận focus/keyboard),
 * chấm tròn hiển thị được vẽ lại bằng CSS qua sibling selector.
 * Các radio cùng nhóm dùng chung prop name.
 */
export function Radio({
	label,
	size = "md",
	invalid,
	id,
	className,
	"aria-describedby": ariaDescribedBy,
	...rest
}: RadioProps) {
	const field = useFormField();
	const isInvalid = invalid ?? field?.invalid ?? false;

	return (
		<label className={cx(styles.root, styles[size], className)}>
			<input
				className={styles.input}
				type="radio"
				id={id ?? field?.id}
				aria-invalid={isInvalid || undefined}
				aria-describedby={ariaDescribedBy ?? joinIds(field?.errorId, field?.hintId)}
				{...rest}
			/>
			<span className={styles.box} aria-hidden="true" />
			{label != null && <span className={styles.text}>{label}</span>}
		</label>
	);
}
