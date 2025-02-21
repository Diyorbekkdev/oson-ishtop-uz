import logo from "@/assets/icons/logo/logo.jpg";
import { CollapsedIcon } from "@/assets/icons/sidebar/collapsed-icon";
import { useReduxDispatch, useReduxSelector } from "@/hooks/useRedux";
import { setSideNav } from "@/redux/slices/ui";
import routes from "@/utils/routes";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Tooltip } from "@heroui/tooltip";
import { FC } from "react";
import { useLocation } from "react-router-dom";
import { SidebarItem } from "./customs/sidebar-item";
import { SidebarMenu } from "./customs/sidebar-menu";
console.log(routes);

export const SideBar: FC = () => {
	const dispatch = useReduxDispatch();
	const { sidenav } = useReduxSelector(({ ui }) => ui);
	const { pathname } = useLocation();
	return (
		<aside
			className={`sidenav__bg  group transition-all duration-300 dark:border-r-1 dark:border-solid dark:border-[#13181d] ${
				sidenav.isFixed ? "w-20" : "w-64"
			}`}
		>
			<div className="flex items-center justify-between px-4 py-4">
				<div className="flex items-center justify-center gap-1">
					<Avatar
						isBordered
						radius="lg"
						color="success"
						className="text-center"
						src={logo}
					/>
					{!sidenav.isFixed && (
						<h1 className="text-white text-2xl pl-2 font-bold whitespace-nowrap">
							Oson Ish Top
						</h1>
					)}
				</div>

				{!sidenav.isFixed && (
					<Tooltip
						placement="right"
						content="Collapse"
						color="foreground"
						className="rounded-md"
					>
						<Button
							isIconOnly
							onClick={() => {
								localStorage.setItem(
									"sidenav(fixed)",
									String(!sidenav.isFixed),
								);
								dispatch(
									setSideNav({
										isFixed: !sidenav.isFixed,
										isExpanded: !sidenav.isExpanded,
									}),
								);
							}}
							size="sm"
							color="primary"
							aria-label="expand collapse"
							className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						>
							<CollapsedIcon />
						</Button>
					</Tooltip>
				)}
			</div>

			<Divider className="bg-[#1f272e]" />

			{sidenav.isFixed && (
				<div className="text-center mt-2">
					<Tooltip
						placement="right"
						content="Expand"
						color="foreground"
						className="rounded-md"
					>
						<Button
							isIconOnly
							onClick={() => {
								localStorage.setItem(
									"sidenav(fixed)",
									String(!sidenav.isFixed),
								);
								dispatch(
									setSideNav({
										isFixed: !sidenav.isFixed,
										isExpanded: !sidenav.isExpanded,
									}),
								);
							}}
							size="sm"
							color="primary"
							aria-label="expand collapse"
							className="rotate-180"
						>
							<CollapsedIcon />
						</Button>
					</Tooltip>
				</div>
			)}

			<SidebarMenu title="">
				{routes.map((route) => (
					<SidebarItem
						key={route.id}
						icon={route?.icon}
						title={String(route?.title)}
						href={route?.path}
						isActive={pathname.startsWith(route?.path!)}
						isExpanded={sidenav?.isFixed}
					/>
				))}
			</SidebarMenu>
		</aside>
	);
};
