import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ComponentProps } from "react";

import { IconButton } from "../IconButton";
import { cx } from "../shared";
import { getPaginationRange } from "./getPaginationRange";
import styles from "./Pagination.module.css";

export interface PaginationProps extends ComponentProps<"nav"> {
	/** Trang hiện tại, đánh số từ 1. */
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	/** Số trang hiển thị mỗi bên quanh trang hiện tại. */
	siblingCount?: number;
}

/**
 * Phân trang 1-based: nút trước/sau + các nút số trang (lược bằng "…" khi
 * danh sách dài). Component không giữ state — caller quản lý page và nhận
 * trang mới qua onPageChange.
 */
export function Pagination({
	page,
	totalPages,
	onPageChange,
	siblingCount = 1,
	className,
	...rest
}: PaginationProps) {
	const items = getPaginationRange(page, totalPages, siblingCount);

	return (
		<nav aria-label="Phân trang" className={cx(styles.root, className)} {...rest}>
			<IconButton
				size="sm"
				aria-label="Trang trước"
				disabled={page <= 1}
				onClick={() => onPageChange(page - 1)}
			>
				<ChevronLeft size={16} aria-hidden="true" />
			</IconButton>

			{items.map((item, index) =>
				item === "dots" ? (
					<span key={`dots-${index}`} className={styles.dots} aria-hidden="true">
						…
					</span>
				) : (
					<button
						key={item}
						type="button"
						className={cx(styles.page, item === page && styles.active)}
						aria-current={item === page ? "page" : undefined}
						aria-label={`Trang ${item}`}
						onClick={() => onPageChange(item)}
					>
						{item}
					</button>
				),
			)}

			<IconButton
				size="sm"
				aria-label="Trang sau"
				disabled={page >= totalPages}
				onClick={() => onPageChange(page + 1)}
			>
				<ChevronRight size={16} aria-hidden="true" />
			</IconButton>
		</nav>
	);
}
