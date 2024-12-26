import RequireAuth from "@auth-kit/react-router/RequireAuth";
import { Route } from "react-router-dom";
import { useAuth } from "./configs/auth";
import { TRoutes } from "./types/routes";
import { JSX } from "react";

type MainFeatures = {
	renderNestedRoute: (children: TRoutes["children"]) => any;
	shouldRenderMain: () => boolean;
};

export const useMainFeatures = (): MainFeatures => {
	const { isAuthicated } = useAuth();

	const shouldRenderMain = (): boolean => {
		return isAuthicated;
	};

	const renderNestedRoute = (children: TRoutes["children"]) => {
		return children
			?.filter(({ isPath }) => !isPath)
			.map(({ id, element, hasChild, children: nestedChildren, ...rest }) => (
				<Route
					key={id}
					element={
						<RequireAuth fallbackPath="/sign-in">
							{element as JSX.Element}
						</RequireAuth>
					}
					{...rest}
				>
					{hasChild && renderNestedRoute(nestedChildren)}
				</Route>
			));
	};

	return {
		renderNestedRoute,
		shouldRenderMain,
	};
};

type UnAuthedFeatures = {
	renderNestedRoute: (children: TRoutes["children"]) => any;
};

export const useUnAuthedFeatures = (): UnAuthedFeatures => {
	const renderNestedRoute = (children: TRoutes["children"]) => {
		return children
			?.filter(({ isPath }) => !isPath)
			.map(({ id, element, hasChild, children: nestedChildren, ...rest }) => (
				<Route key={id} element={element as JSX.Element} {...rest}>
					{hasChild && renderNestedRoute(nestedChildren)}
				</Route>
			));
	};

	return {
		renderNestedRoute,
	};
};
