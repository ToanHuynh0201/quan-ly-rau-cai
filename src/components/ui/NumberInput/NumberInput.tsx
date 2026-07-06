import { Minus, Plus } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { useRef } from "react";

import { useFormField } from "../FormField/FormFieldContext";
import type { ControlSize } from "../shared";
import { cx, joinIds, setNativeInputValue } from "../shared";
import styles from "./NumberInput.module.css";

export interface NumberInputProps extends Omit<ComponentProps<"input">, "size" | "type"> {
	size?: ControlSize;
	/** Trạng thái lỗi khi dùng standalone; bên trong FormField sẽ tự lấy từ context. */
	invalid?: boolean;
	/** Đơn vị hiển thị sau ô nhập: "kg", "bó", "thùng"... */
	unit?: ReactNode;
}

/**
 * Ô nhập số có nút tăng/giảm hai bên và đơn vị tùy chọn.
 * min/max/step truyền thẳng vào input gốc — nhập lẻ (kg) dùng step={0.1}
 * hoặc step="any"; đơn vị nguyên (bó/thùng) dùng step={1}.
 * className áp vào wrapper; mọi props khác đi thẳng vào thẻ input.
 */
export function NumberInput({
	size = "md",
	invalid,
	unit,
	id,
	className,
	disabled,
	"aria-describedby": ariaDescribedBy,
	...rest
}: NumberInputProps) {
	const field = useFormField();
	const isInvalid = invalid ?? field?.invalid ?? false;
	const wrapperRef = useRef<HTMLSpanElement>(null);
	const steppersDisabled = disabled || rest.readOnly === true;

	function step(direction: "up" | "down") {
		const input = wrapperRef.current?.querySelector("input");
		if (!input) return;
		try {
			if (direction === "up") input.stepUp();
			else input.stepDown();
		} catch {
			// value hiện tại không hợp lệ (vd. rỗng) — đưa về min hoặc 0
			setNativeInputValue(input, String(rest.min ?? 0));
			input.focus();
			return;
		}
		// stepUp/stepDown đổi value nhưng không phát sự kiện — tự phát để onChange chạy
		input.dispatchEvent(new Event("input", { bubbles: true }));
		input.focus();
	}

	return (
		<span
			ref={wrapperRef}
			className={cx(
				styles.wrapper,
				styles[size],
				isInvalid && styles.invalid,
				disabled && styles.disabled,
				className,
			)}
		>
			<button
				type="button"
				className={styles.stepper}
				tabIndex={-1}
				aria-label="Giảm"
				disabled={steppersDisabled}
				onClick={() => step("down")}
			>
				<Minus size={16} aria-hidden="true" />
			</button>
			<input
				className={styles.input}
				type="number"
				id={id ?? field?.id}
				disabled={disabled}
				aria-invalid={isInvalid || undefined}
				aria-describedby={ariaDescribedBy ?? joinIds(field?.errorId, field?.hintId)}
				{...rest}
			/>
			{unit != null && (
				<span className={styles.unit} aria-hidden="true">
					{unit}
				</span>
			)}
			<button
				type="button"
				className={styles.stepper}
				tabIndex={-1}
				aria-label="Tăng"
				disabled={steppersDisabled}
				onClick={() => step("up")}
			>
				<Plus size={16} aria-hidden="true" />
			</button>
		</span>
	);
}
