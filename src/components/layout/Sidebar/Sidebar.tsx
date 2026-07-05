import type { LucideIcon } from "lucide-react";
import { Home, Palette, PanelLeftClose, PanelLeftOpen, Sprout, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";

import { cx, IconButton } from "@/components/ui";
import { APP_NAME, ROUTER } from "@/constants";
import { getStorageItem, setStorageItem } from "@/utils";

import styles from "./Sidebar.module.css";

/** id của sidebar để nút hamburger bên ngoài trỏ aria-controls. */
export const SIDEBAR_ID = "app-sidebar";

const SIDEBAR_COLLAPSED_KEY = "ql-rau-cai:sidebar-collapsed";

interface NavItem {
	to: string;
	label: string;
	icon: LucideIcon;
	/** NavLink end — tránh "/" active trên mọi trang con. */
	end?: boolean;
}

const NAV_ITEMS: NavItem[] = [
	{ to: ROUTER.HOME, label: "Trang chủ", icon: Home, end: true },
	{ to: ROUTER.STYLE_GUIDE, label: "Style Guide", icon: Palette },
];

export interface SidebarProps {
	/** Drawer đang mở (chỉ áp dụng trên mobile). */
	drawerOpen: boolean;
	onCloseDrawer: () => void;
}

/**
 * Thanh điều hướng bên trái: sticky và thu gọn được trên desktop (trạng thái
 * lưu localStorage), drawer + overlay trên mobile.
 */
export function Sidebar({ drawerOpen, onCloseDrawer }: SidebarProps) {
	const [collapsed, setCollapsed] = useState(() => getStorageItem(SIDEBAR_COLLAPSED_KEY, false));

	function toggleCollapsed() {
		const next = !collapsed;
		setCollapsed(next);
		setStorageItem(SIDEBAR_COLLAPSED_KEY, next);
	}

	// Escape đóng drawer trên mobile
	useEffect(() => {
		if (!drawerOpen) {
			return;
		}
		function onKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				onCloseDrawer();
			}
		}
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [drawerOpen, onCloseDrawer]);

	// Khóa scroll body khi drawer mở
	useEffect(() => {
		if (!drawerOpen) {
			return;
		}
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, [drawerOpen]);

	return (
		<>
			{drawerOpen && (
				<div className={styles.overlay} onClick={onCloseDrawer} aria-hidden="true" />
			)}
			<aside
				id={SIDEBAR_ID}
				className={cx(
					styles.sidebar,
					collapsed && styles.collapsed,
					drawerOpen && styles.drawerOpen,
				)}
			>
				<div className={styles.header}>
					<Sprout size={24} className={styles.brandIcon} aria-hidden="true" />
					<span className={cx(styles.brandName, styles.label)}>{APP_NAME}</span>
					<IconButton
						aria-label="Đóng menu"
						size="sm"
						className={styles.closeButton}
						onClick={onCloseDrawer}
					>
						<X size={20} />
					</IconButton>
				</div>

				<nav className={styles.nav} aria-label="Điều hướng chính">
					<ul className={styles.navList}>
						{NAV_ITEMS.map((item) => {
							const Icon = item.icon;
							return (
								<li key={item.to}>
									<NavLink
										to={item.to}
										end={item.end}
										title={collapsed ? item.label : undefined}
										className={({ isActive }) =>
											cx(styles.navLink, isActive && styles.active)
										}
										onClick={onCloseDrawer}
									>
										<Icon size={20} aria-hidden="true" />
										<span className={styles.label}>{item.label}</span>
									</NavLink>
								</li>
							);
						})}
					</ul>
				</nav>

				<div className={styles.footer}>
					<IconButton
						aria-label={collapsed ? "Mở rộng thanh bên" : "Thu gọn thanh bên"}
						aria-expanded={!collapsed}
						className={styles.toggleButton}
						onClick={toggleCollapsed}
					>
						{collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
					</IconButton>
				</div>
			</aside>
		</>
	);
}
