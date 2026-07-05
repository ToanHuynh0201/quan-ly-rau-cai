import { createContext, useContext } from "react";

/**
 * Giá trị FormField cung cấp cho control bên trong (Input, Select...).
 * hintId/errorId chỉ có mặt khi FormField thực sự render hint/error tương ứng.
 */
export interface FormFieldContextValue {
	id: string;
	hintId?: string;
	errorId?: string;
	invalid: boolean;
}

export const FormFieldContext = createContext<FormFieldContextValue | null>(null);

/**
 * Đọc context của FormField bao ngoài; trả về null khi control đứng độc lập.
 * Control luôn ưu tiên props tường minh (id, invalid...) hơn giá trị từ context.
 */
export function useFormField(): FormFieldContextValue | null {
	return useContext(FormFieldContext);
}
