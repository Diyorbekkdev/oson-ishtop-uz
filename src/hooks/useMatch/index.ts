import { TRoutes } from "@/types/routes";
import routes from "@/utils/routes";
import { useLocation } from "react-router-dom";

type Match = {
	pathname: string;
	getParams: <T>() => T;
};

export const useMatch = (): Match => {
	const { pathname } = useLocation();

	const currentRoute = routes.find(({ path }) =>
		pathname.includes(String(path)),
	);

	const combineSelectedPath = (route: TRoutes, parentPath = ""): string[] => {
		const fullPath = `${parentPath}${route?.path}`;
		const combinedPaths = [fullPath];

		if (route.children && route.children.length > 0)
			for (const child of route.children)
				combinedPaths.push(...combineSelectedPath(child, `${fullPath}/`));

		return combinedPaths;
	};

	const getParams = <T>(): T => {
		if (!currentRoute) return {} as T;

		const result: { [key: string]: string } = {};
		const paths = combineSelectedPath(currentRoute!);

		for (const path of paths) {
			const pathSplit = path.split("/");
			const pathnameSplit = pathname.split("/");

			if (pathSplit.length === pathnameSplit.length)
				for (let i = 0; i < pathSplit.length; i++)
					if (pathSplit[i].includes(":"))
						result[pathSplit[i].replace(":", "")] = pathnameSplit[i];
		}

		return result as T;
	};

	return {
		pathname,
		getParams,
	};
};
