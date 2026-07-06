import type { ComponentProps, KeyboardEvent } from "react";
import { useId, useRef, useState } from "react";

import { cx } from "../shared";
import styles from "./Tabs.module.css";
import { TabsContext, useTabs } from "./TabsContext";

export interface TabsProps extends ComponentProps<"div"> {
	/** Value của tab đang chọn (controlled) — đi kèm onValueChange. */
	value?: string;
	/** Tab chọn sẵn ban đầu (uncontrolled). Luôn truyền value hoặc defaultValue. */
	defaultValue?: string;
	onValueChange?: (value: string) => void;
}

/**
 * Bộ tab compound: Tabs bao ngoài, TabList chứa các Tab, nội dung nằm trong
 * TabPanel có value trùng với Tab tương ứng. Hỗ trợ cả controlled
 * (value + onValueChange) lẫn uncontrolled (defaultValue).
 *
 * Panel luôn được mount và ẩn bằng thuộc tính hidden — state bên trong panel
 * (form dở dang...) không bị mất khi chuyển tab.
 */
export function Tabs({ value, defaultValue = "", onValueChange, children, ...rest }: TabsProps) {
	const [internalValue, setInternalValue] = useState(defaultValue);
	const current = value ?? internalValue;
	const baseId = useId();

	function setValue(next: string) {
		if (next === current) return;
		if (value === undefined) setInternalValue(next);
		onValueChange?.(next);
	}

	return (
		<TabsContext value={{ value: current, setValue, baseId }}>
			<div {...rest}>{children}</div>
		</TabsContext>
	);
}

/**
 * Thanh chứa các Tab — đảm nhiệm roving tabindex: chỉ tab đang chọn nằm trong
 * chuỗi Tab của trang, Arrow/Home/End di chuyển focus và chọn luôn tab đó.
 */
export function TabList({ className, children, onKeyDown, ...rest }: ComponentProps<"div">) {
	const listRef = useRef<HTMLDivElement>(null);

	function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
		onKeyDown?.(event);
		if (event.defaultPrevented) return;
		if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

		// Query theo role thay vì id — id sinh từ useId chứa ":" nên không dùng
		// được trong selector.
		const tabs = Array.from(
			listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)') ??
				[],
		);
		if (tabs.length === 0) return;

		const currentIndex = tabs.indexOf(document.activeElement as HTMLButtonElement);
		let nextIndex: number;
		if (event.key === "Home") nextIndex = 0;
		else if (event.key === "End") nextIndex = tabs.length - 1;
		else if (event.key === "ArrowLeft")
			nextIndex = currentIndex <= 0 ? tabs.length - 1 : currentIndex - 1;
		else nextIndex = currentIndex >= tabs.length - 1 ? 0 : currentIndex + 1;

		event.preventDefault();
		tabs[nextIndex].focus();
		// Chọn khi focus (selection follows focus) — click chạy onClick của Tab
		tabs[nextIndex].click();
	}

	return (
		<div
			ref={listRef}
			role="tablist"
			className={cx(styles.tabList, className)}
			onKeyDown={handleKeyDown}
			{...rest}
		>
			{children}
		</div>
	);
}

export interface TabProps extends ComponentProps<"button"> {
	/** Định danh của tab — trùng với value của TabPanel tương ứng. */
	value: string;
}

/** Một nút tab. Style underline; tab đang chọn nhận màu primary. */
export function Tab({ value, className, children, onClick, ...rest }: TabProps) {
	const tabs = useTabs("Tab");
	const selected = tabs.value === value;

	return (
		<button
			type="button"
			role="tab"
			id={`${tabs.baseId}-tab-${value}`}
			aria-selected={selected}
			aria-controls={`${tabs.baseId}-panel-${value}`}
			tabIndex={selected ? 0 : -1}
			className={cx(styles.tab, selected && styles.selected, className)}
			onClick={(event) => {
				onClick?.(event);
				tabs.setValue(value);
			}}
			{...rest}
		>
			{children}
		</button>
	);
}

export interface TabPanelProps extends ComponentProps<"div"> {
	/** Định danh của panel — trùng với value của Tab tương ứng. */
	value: string;
}

/** Nội dung của một tab — luôn mount, ẩn bằng hidden khi không được chọn. */
export function TabPanel({ value, className, children, ...rest }: TabPanelProps) {
	const tabs = useTabs("TabPanel");
	const selected = tabs.value === value;

	return (
		<div
			role="tabpanel"
			id={`${tabs.baseId}-panel-${value}`}
			aria-labelledby={`${tabs.baseId}-tab-${value}`}
			hidden={!selected}
			// Panel thường không có phần tử focus được — cho nhận focus để người
			// dùng bàn phím Tab từ tab xuống thẳng nội dung.
			tabIndex={0}
			className={cx(styles.tabPanel, className)}
			{...rest}
		>
			{children}
		</div>
	);
}
