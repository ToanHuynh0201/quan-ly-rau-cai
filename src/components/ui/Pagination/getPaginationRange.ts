/**
 * Tính dãy nút trang hiển thị: luôn có trang đầu/cuối và `siblingCount` trang
 * quanh trang hiện tại; đoạn bị lược bỏ thay bằng "dots" — chỉ lược khi cách
 * nhau từ 2 trang trở lên (gap 1 trang thì hiện luôn số cho đỡ tốn click).
 *
 * (Tách file riêng khỏi Pagination.tsx theo convention react-refresh:
 * file component chỉ export component.)
 */
export function getPaginationRange(
	page: number,
	totalPages: number,
	siblingCount = 1,
): Array<number | "dots"> {
	if (totalPages <= 0) return [];
	const current = Math.min(Math.max(page, 1), totalPages);
	const start = Math.max(1, current - siblingCount);
	const end = Math.min(totalPages, current + siblingCount);
	const items: Array<number | "dots"> = [];

	if (start > 1) {
		items.push(1);
		if (start === 3) items.push(2);
		else if (start > 3) items.push("dots");
	}
	for (let i = start; i <= end; i++) items.push(i);
	if (end < totalPages) {
		if (end === totalPages - 2) items.push(totalPages - 1);
		else if (end < totalPages - 2) items.push("dots");
		items.push(totalPages);
	}
	return items;
}
