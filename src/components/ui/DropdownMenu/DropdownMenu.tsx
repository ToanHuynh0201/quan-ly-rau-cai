import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import type { ReactNode } from "react";

import { cx } from "../shared";
import styles from "./DropdownMenu.module.css";

/**
 * Menu hành động wrap @radix-ui/react-dropdown-menu — keyboard nav, typeahead,
 * positioning và light-dismiss do Radix lo; file này chỉ áp style token.
 *
 * Dùng dạng compound:
 *   <DropdownMenu>
 *     <DropdownMenuTrigger><IconButton .../></DropdownMenuTrigger>
 *     <DropdownMenuContent>
 *       <DropdownMenuItem icon={...} onSelect={...}>Sửa</DropdownMenuItem>
 *       <DropdownMenuSeparator />
 *       <DropdownMenuItem danger>Xóa</DropdownMenuItem>
 *     </DropdownMenuContent>
 *   </DropdownMenu>
 */
export function DropdownMenu(props: DropdownMenuPrimitive.DropdownMenuProps) {
	return <DropdownMenuPrimitive.Root {...props} />;
}

/**
 * Trigger luôn dùng asChild: truyền thẳng props/ref vào con — Button/IconButton
 * của dự án đều spread ...rest nên dùng làm trigger được.
 */
export function DropdownMenuTrigger(props: DropdownMenuPrimitive.DropdownMenuTriggerProps) {
	return <DropdownMenuPrimitive.Trigger asChild {...props} />;
}

/** Panel chứa các item — render qua Portal nên không bị clip bởi vùng scroll. */
export function DropdownMenuContent({
	className,
	sideOffset = 4,
	align = "end",
	...rest
}: DropdownMenuPrimitive.DropdownMenuContentProps) {
	return (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.Content
				className={cx(styles.content, className)}
				sideOffset={sideOffset}
				align={align}
				{...rest}
			/>
		</DropdownMenuPrimitive.Portal>
	);
}

export interface DropdownMenuItemProps extends DropdownMenuPrimitive.DropdownMenuItemProps {
	icon?: ReactNode;
	/** Hành động phá hủy (xóa...) — hiển thị màu đỏ. */
	danger?: boolean;
}

/** Một hành động trong menu — xử lý chọn qua onSelect (Radix gọi cả khi Enter). */
export function DropdownMenuItem({
	icon,
	danger,
	className,
	children,
	...rest
}: DropdownMenuItemProps) {
	return (
		<DropdownMenuPrimitive.Item
			className={cx(styles.item, danger && styles.danger, className)}
			{...rest}
		>
			{icon != null && (
				<span className={styles.icon} aria-hidden="true">
					{icon}
				</span>
			)}
			{children}
		</DropdownMenuPrimitive.Item>
	);
}

/** Vạch ngăn giữa các nhóm hành động. */
export function DropdownMenuSeparator({
	className,
	...rest
}: DropdownMenuPrimitive.DropdownMenuSeparatorProps) {
	return (
		<DropdownMenuPrimitive.Separator className={cx(styles.separator, className)} {...rest} />
	);
}
