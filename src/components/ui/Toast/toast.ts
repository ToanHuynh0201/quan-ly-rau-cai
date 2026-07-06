import { toast as sonnerToast } from "sonner";

/**
 * Phần tử popover bọc Toaster — do Toaster đăng ký khi mount.
 * Module-level vì toast() được gọi từ ngoài React (service, handler...).
 */
let popoverEl: HTMLElement | null = null;

/** Toaster gọi khi mount/unmount để toast() re-promote được vùng toast. */
export function registerToastPopover(el: HTMLElement | null): void {
	popoverEl = el;
}

/**
 * Đưa vùng toast lên trên cùng của top layer. Top layer xếp theo thứ tự
 * show: nếu một <dialog> showModal() SAU khi Toaster mount thì dialog nằm
 * trên vùng toast — hide/show lại popover trước mỗi lần bắn toast để toast
 * luôn nổi trên modal đang mở.
 */
function promoteToTopLayer(): void {
	if (!popoverEl?.isConnected) return;
	try {
		popoverEl.hidePopover();
		popoverEl.showPopover();
	} catch {
		// Popover đang ở trạng thái không hợp lệ (chưa vào DOM xong...) — bỏ qua,
		// toast vẫn hiển thị, chỉ có thể nằm dưới modal.
	}
}

function wrap<A extends unknown[], R>(fn: (...args: A) => R): (...args: A) => R {
	return (...args: A): R => {
		promoteToTopLayer();
		return fn(...args);
	};
}

/**
 * API bắn toast — dùng y như `toast` của sonner (toast("..."),
 * toast.success/error/warning/info...), chỉ thêm bước re-promote top layer.
 * Riêng toast.promise/dismiss... giữ nguyên của sonner (không cần promote
 * hoặc generic không wrap được).
 */
export const toast: typeof sonnerToast = Object.assign(wrap(sonnerToast), sonnerToast, {
	message: wrap(sonnerToast.message),
	success: wrap(sonnerToast.success),
	error: wrap(sonnerToast.error),
	warning: wrap(sonnerToast.warning),
	info: wrap(sonnerToast.info),
	loading: wrap(sonnerToast.loading),
	custom: wrap(sonnerToast.custom),
});
