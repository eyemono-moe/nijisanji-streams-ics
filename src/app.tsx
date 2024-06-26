import "@unocss/reset/tailwind.css";
import "virtual:uno.css";

import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { LiversProvider } from "./context/liversProvider";
import { Toaster } from "./lib/toast";

export default function App() {
	return (
		<Router
			root={(props) => (
				<>
					<LiversProvider>
						<div class="font-sans">
							<Suspense>{props.children}</Suspense>
						</div>
					</LiversProvider>
					<Toaster />
				</>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
