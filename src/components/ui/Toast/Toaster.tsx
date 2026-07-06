import { useEffect, useRef } from "react";
import { Toaster as SonnerToaster } from "sonner";

import { registerToastPopover } from "./toast";
import styles from "./Toaster.module.css";

/**
 * Vùng hiển thị toast (sonner) — mount MỘT lần trong App.
 *
 * Sonner định vị bằng position: fixed + z-index nên mặc định nằm DƯỚI modal
 * <dialog> (top layer thắng mọi z-index). Bọc trong popover="manual" +
 * showPopover() để cả vùng toast cũng vào top layer; hàm toast() sẽ
 * re-promote (hide/show) mỗi lần bắn để nổi trên dialog mở sau.
 */
export function Toaster() {
	const popoverRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = popoverRef.current;
		if (!el) return;
		try {
			el.showPopover();
		} catch {
			// showPopover throw nếu đã show — không sao
		}
		registerToastPopover(el);
		return () => registerToastPopover(null);
	}, []);

	return (
		<div ref={popoverRef} popover="manual" className={styles.popover}>
			<SonnerToaster position="top-right" richColors closeButton />
		</div>
	);
}
