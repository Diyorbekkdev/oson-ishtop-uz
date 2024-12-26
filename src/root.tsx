import RequireAuth from "@auth-kit/react-router/RequireAuth";
import { JSX } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { SideBar } from "./components/side-bar";
import { useMainFeatures } from "./features";
import { SignInPage } from "./modules/auth/sign-in/routes/sign-in.page";
// import { useGeneralService } from "./services/general";
import { TRoutes } from "./types/routes";
import routes from "./utils/routes";

const Root = () => {
	const { renderNestedRoute } = useMainFeatures();
	// const { user_role } = useGeneralService();

	const filterRoutesByRole = (routes: TRoutes[]): TRoutes[] => {
		return routes
			?.filter((route) => route?.roles?.includes("owner"))
			.map((route) => ({
				...route,
				children: route.hasChild
					? filterRoutesByRole(route?.children as TRoutes[])
					: [],
			}));
	};

	const protected_routes = filterRoutesByRole(routes);

	return (
		<div className="grid grid-cols-[auto_1fr] h-screen">
			<SideBar />
			<main className="bg-gray-100 dark:bg-[#090e14] flex flex-col">
				<Header />
				<div className="mt-4 flex-grow shadow p-6 overflow-auto">
					<Routes>
						<Route path="/sign-in" element={<SignInPage />} />
						<Route path="/" element={<Navigate to="/add-management" />} />
						{protected_routes
							.filter(({ isPath }) => !isPath)
							.map(({ id, element, hasChild, children, ...rest }) => (
								<Route
									key={id}
									{...rest}
									element={
										<RequireAuth fallbackPath="/sign-in">
											{element as JSX.Element}
										</RequireAuth>
									}
								>
									{hasChild && renderNestedRoute(children)}
								</Route>
							))}
					</Routes>
				</div>
			</main>
		</div>
	);
};

export default Root;
