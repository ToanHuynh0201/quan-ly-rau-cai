import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import { AppLayout } from "@/components/layout";
import { Toaster } from "@/components/ui";
import { ROUTER } from "@/constants";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";

// App chỉ đảm nhiệm routing — nội dung từng trang nằm trong src/pages.
// Các trang chính nằm trong AppLayout (sidebar); 404 render toàn màn hình bên ngoài.

// Style guide nặng và ít khi mở — tách khỏi bundle khởi động.
const StyleGuidePage = lazy(() =>
	import("@/pages/StyleGuidePage").then((m) => ({ default: m.StyleGuidePage })),
);

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AppLayout />}>
					<Route path={ROUTER.HOME} element={<HomePage />} />
					<Route
						path={ROUTER.STYLE_GUIDE}
						element={
							<Suspense fallback={null}>
								<StyleGuidePage />
							</Suspense>
						}
					/>
				</Route>
				<Route path={ROUTER.NOT_FOUND} element={<NotFoundPage />} />
			</Routes>
			<Toaster />
		</BrowserRouter>
	);
}

export default App;
