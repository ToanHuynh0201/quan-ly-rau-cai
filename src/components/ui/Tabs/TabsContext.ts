import { createContext, useContext } from "react";

/** Giá trị Tabs cung cấp cho các phần con (TabList, Tab, TabPanel). */
export interface TabsContextValue {
	/** Value của tab đang chọn. */
	value: string;
	/** Chọn tab mới — với uncontrolled sẽ tự cập nhật state nội bộ. */
	setValue: (value: string) => void;
	/** Id gốc (useId) để wire aria-controls/aria-labelledby giữa tab và panel. */
	baseId: string;
}

export const TabsContext = createContext<TabsContextValue | null>(null);

/** Đọc context của Tabs bao ngoài; throw khi dùng sai chỗ để lỗi lộ ra sớm. */
export function useTabs(component: string): TabsContextValue {
	const ctx = useContext(TabsContext);
	if (!ctx) throw new Error(`<${component}> phải nằm bên trong <Tabs>`);
	return ctx;
}
