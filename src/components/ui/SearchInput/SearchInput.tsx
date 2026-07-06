import { Search, X } from "lucide-react";
import type { ChangeEvent } from "react";
import { useRef, useState } from "react";

import type { InputProps } from "../Input";
import { Input } from "../Input";
import { cx, setNativeInputValue } from "../shared";
import styles from "./SearchInput.module.css";

export interface SearchInputProps extends Omit<InputProps, "type" | "iconLeft" | "iconRight"> {
	/** Gọi sau khi nút xóa đã clear giá trị (onChange cũng chạy như gõ tay). */
	onClear?: () => void;
}

/**
 * Ô tìm kiếm = Input có sẵn icon kính lúp + nút xóa hiện khi có giá trị.
 * Nút xóa clear qua native setter nên onChange vẫn chạy với cả
 * controlled lẫn uncontrolled.
 */
export function SearchInput({
	onClear,
	onChange,
	className,
	value,
	defaultValue,
	...rest
}: SearchInputProps) {
	const rootRef = useRef<HTMLSpanElement>(null);
	// Với uncontrolled, theo dõi "có giá trị" bằng state; controlled đọc thẳng từ value
	const [hasValueState, setHasValueState] = useState(
		defaultValue != null && String(defaultValue).length > 0,
	);
	const hasValue = value != null ? String(value).length > 0 : hasValueState;

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		setHasValueState(event.target.value.length > 0);
		onChange?.(event);
	}

	function handleClear() {
		const input = rootRef.current?.querySelector("input");
		if (!input) return;
		setNativeInputValue(input, "");
		input.focus();
		onClear?.();
	}

	return (
		<span ref={rootRef} className={cx(styles.root, className)}>
			<Input
				type="search"
				iconLeft={<Search size={16} />}
				// Giữ chỗ padding phải cho nút xóa (nút thật nằm đè lên slot này)
				iconRight={hasValue ? <span /> : undefined}
				value={value}
				defaultValue={defaultValue}
				onChange={handleChange}
				{...rest}
			/>
			{hasValue && (
				<button
					type="button"
					className={styles.clear}
					aria-label="Xóa tìm kiếm"
					onClick={handleClear}
				>
					<X size={16} aria-hidden="true" />
				</button>
			)}
		</span>
	);
}
