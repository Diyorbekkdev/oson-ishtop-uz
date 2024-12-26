import { Navigate, Route, Routes } from "react-router-dom";
import { useUnAuthedFeatures } from "./features";
import { unauthed_routes } from "./utils/routes";

const UnauthedRoot = () => {
	const { renderNestedRoute } = useUnAuthedFeatures();

	return (
		<Routes>
			<Route path="/" element={<Navigate to={"/dashboard"} />} />
			{unauthed_routes.map(({ id, element, hasChild, children, ...rest }) => (
				<Route key={id} {...rest} element={element as JSX.Element}>
					{hasChild && renderNestedRoute(children)}
				</Route>
			))}
		</Routes>
	);
};

export default UnauthedRoot;
