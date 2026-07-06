import { X } from "lucide-react";
import type { ComponentProps, MouseEvent, ReactNode, SyntheticEvent } from "react";
import { useEffect, useId, useRef } from "react";

import { IconButton } from "../IconButton";
import { cx } from "../shared";
import styles from "./Modal.module.css";

export interface ModalProps extends Omit<ComponentProps<"dialog">, "open" | "onClose" | "title"> {
	/** Modal đang mở — sync qua showModal()/close(), không render attribute open. */
	open: boolean;
	/**
	 * Gọi khi dialog thực sự đóng (Escape, click backdrop, nút X...) — caller
	 * set state open=false tại đây để hai bên không lệch nhau.
	 */
	onClose: () => void;
	title?: ReactNode;
	/** Bề rộng tối đa: sm 400px · md 560px · lg 760px. */
	size?: "sm" | "md" | "lg";
	/** false: chặn Escape/backdrop và ẩn nút X — chỉ đóng bằng hành động tường minh. */
	dismissible?: boolean;
}

/**
 * Modal dựng trên <dialog> native + showModal(): focus trap, focus restore,
 * Escape và top layer đều do trình duyệt lo. Scroll-lock nằm ở base.css
 * (body:has(dialog:modal)).
 *
 * Không render attribute open (render "open" sẽ tạo dialog KHÔNG modal —
 * thiếu backdrop/focus trap); trạng thái sync bằng effect gọi showModal()/close().
 */
export function Modal({
	open,
	onClose,
	title,
	size = "md",
	dismissible = true,
	className,
	children,
	onCancel,
	onClick,
	...rest
}: ModalProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const titleId = useId();

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (open && !dialog.open) dialog.showModal();
		else if (!open && dialog.open) dialog.close();
	}, [open]);

	// Escape (và các cơ chế hủy khác của trình duyệt)
	function handleCancel(event: SyntheticEvent<HTMLDialogElement, Event>) {
		onCancel?.(event);
		if (!dismissible) event.preventDefault();
	}

	// Click backdrop: panel phủ kín dialog nên target chỉ là chính dialog
	// khi click ra ngoài panel.
	function handleClick(event: MouseEvent<HTMLDialogElement>) {
		onClick?.(event);
		if (dismissible && event.target === dialogRef.current) dialogRef.current?.close();
	}

	return (
		<dialog
			ref={dialogRef}
			className={cx(styles.dialog, styles[size], className)}
			aria-labelledby={title != null ? titleId : undefined}
			onClose={onClose}
			onCancel={handleCancel}
			onClick={handleClick}
			{...rest}
		>
			<div className={styles.panel}>
				{(title != null || dismissible) && (
					<header className={styles.header}>
						{title != null && (
							<h2 id={titleId} className={styles.title}>
								{title}
							</h2>
						)}
						{dismissible && (
							<IconButton
								size="sm"
								aria-label="Đóng"
								className={styles.close}
								onClick={() => dialogRef.current?.close()}
							>
								<X size={18} aria-hidden="true" />
							</IconButton>
						)}
					</header>
				)}
				{children}
			</div>
		</dialog>
	);
}

/** Phần nội dung chính của modal — cuộn được khi vượt chiều cao. */
export function ModalBody({ className, children, ...rest }: ComponentProps<"div">) {
	return (
		<div className={cx(styles.body, className)} {...rest}>
			{children}
		</div>
	);
}

/** Hàng nút hành động dưới cùng, căn phải. */
export function ModalFooter({ className, children, ...rest }: ComponentProps<"footer">) {
	return (
		<footer className={cx(styles.footer, className)} {...rest}>
			{children}
		</footer>
	);
}
