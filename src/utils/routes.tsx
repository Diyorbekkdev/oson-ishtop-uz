import { AddManagementRoute } from "@/modules/add-management/routes";
import { ResetPasswordRoute } from "@/modules/auth/reset-password/routes";
import { SignInRoute } from "@/modules/auth/sign-in/routes";
import { SignUpRoute } from "@/modules/auth/sing-up/routes";
import { ComingSoon } from "@/modules/coming-soon";
import { JobCategoriesRoute } from "@/modules/job-categories/routes";
import { JobTypeControlRoutes } from "@/modules/job-type-control/routes";
import { RegionRoutes } from "@/modules/regions/routes";
import { UsersRoutes } from "@/modules/users/routes";
import { TRoutes } from "@/types/routes";

export const routes: TRoutes[] = [
	...AddManagementRoute,
	...JobTypeControlRoutes,
	...RegionRoutes,
	...JobCategoriesRoute,
	...UsersRoutes,
];

export const unauthed_routes: TRoutes[] = [
	...SignInRoute,
	...SignUpRoute,
	...ResetPasswordRoute,
	{
		path: "*",
		element: <ComingSoon />,
		id: 6,
	},
];

export default routes;
