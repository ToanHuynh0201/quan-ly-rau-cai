import { Menu } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router";

import { IconButton } from "@/components/ui";
import { APP_NAME } from "@/constants";

import { Sidebar, SIDEBAR_ID } from "../Sidebar";
import styles from "./AppLayout.module.css";

/** Khung layout chung: sidebar + top bar mobile + vùng nội dung, render trang con qua Outlet. */
export function AppLayout() {
	const [drawerOpen, setDrawerOpen] = useState(false);

	return (
		<div className={styles.layout}>
			<Sidebar drawerOpen={drawerOpen} onCloseDrawer={() => setDrawerOpen(false)} />
			<div className={styles.main}>
				<header className={styles.topBar}>
					<IconButton
						aria-label="Mở menu điều hướng"
						aria-expanded={drawerOpen}
						aria-controls={SIDEBAR_ID}
						onClick={() => setDrawerOpen(true)}
					>
						<Menu size={20} />
					</IconButton>
					<span className={styles.topBarTitle}>{APP_NAME}</span>
				</header>
				<main className={styles.content}>
					<div className={styles.container}>
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
}
