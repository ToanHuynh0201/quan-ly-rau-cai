import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";

import styles from "./Tooltip.module.css";

export interface TooltipProps {
	/** Nội dung hiển thị trong tooltip. */
	content: ReactNode;
	placement?: "top" | "bottom" | "left" | "right";
	/**
	 * Phần tử kích hoạt — nhận props/ref từ Radix qua asChild nên phải là một
	 * element forward được props (Button/IconButton đều spread ...rest nên dùng được).
	 */
	children: ReactNode;
}

/**
 * Tooltip wrap @radix-ui/react-tooltip: hover/focus 300ms thì hiện, positioning
 * và collision tự xử lý. Content render qua Portal nên không bị clip bởi
 * vùng scroll (vd. Table scroller).
 *
 * Chỉ dùng cho chú thích bổ sung — không đặt hành động bắt buộc vào tooltip.
 */
export function Tooltip({ content, placement = "top", children }: TooltipProps) {
	return (
		<TooltipPrimitive.Provider delayDuration={300}>
			<TooltipPrimitive.Root>
				<TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
				<TooltipPrimitive.Portal>
					<TooltipPrimitive.Content
						className={styles.content}
						side={placement}
						sideOffset={6}
					>
						{content}
						<TooltipPrimitive.Arrow className={styles.arrow} aria-hidden="true" />
					</TooltipPrimitive.Content>
				</TooltipPrimitive.Portal>
			</TooltipPrimitive.Root>
		</TooltipPrimitive.Provider>
	);
}
