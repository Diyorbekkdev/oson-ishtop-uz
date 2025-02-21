import store from "@/redux";
import { Spinner } from "@heroui/spinner";
import { HeroUIProvider } from "@heroui/system";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode, StrictMode, Suspense } from "react";
import AuthProvider from "react-auth-kit/AuthProvider";
import createStore from "react-auth-kit/createStore";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import AuthEventProvider from "./configs/auth.ts";
import { ErrorBoundary } from "./utils/error-boundary/index.tsx";
import "swiper/css";
import "swiper/css/pagination";
import "./styles/index.scss";
import "react-medium-image-zoom/dist/styles.css";

const authStore = createStore({
	authName: "_auth",
	authType: "cookie",
	cookieDomain: window.location.hostname,
	cookieSecure: window.location.protocol === "https:",
});

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			retry: false,
			staleTime: 120000,
		},
		mutations: {
			retry: false,
		},
	},
});

export const GlobalWrapper: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	return (
		<Suspense fallback={<Spinner />}>
			<HelmetProvider>
				<AuthProvider store={authStore}>
					<BrowserRouter>
						<Provider store={store}>
							<QueryClientProvider client={queryClient}>
								<ReactQueryDevtools />
								<AuthEventProvider>
									<HeroUIProvider>
										<NextThemesProvider attribute="class" defaultTheme="dark">
											{children}
										</NextThemesProvider>
									</HeroUIProvider>
								</AuthEventProvider>
							</QueryClientProvider>
						</Provider>
					</BrowserRouter>
				</AuthProvider>
			</HelmetProvider>
		</Suspense>
	);
};

ReactDOM.createRoot(document.getElementById("root")!).render(
	<GlobalWrapper>
		<ErrorBoundary>
			<StrictMode>
				<App />
				<Toaster position="top-right" reverseOrder={false} />
			</StrictMode>
		</ErrorBoundary>
	</GlobalWrapper>,
);
