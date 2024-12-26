import { CollapsedIcon } from "@/assets/icons/sidebar/collapsed-icon";
import { useReduxDispatch, useReduxSelector } from "@/hooks/useRedux";
import { setSideNav } from "@/redux/slices/ui";
import routes from "@/utils/routes";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Tooltip } from "@nextui-org/tooltip";
import { FC } from "react";
import { CollapseItems } from "./customs/collapse-item";
import { SidebarMenu } from "./customs/sidebar-menu";

console.log(routes);

export const SideBar: FC = () => {
	const dispatch = useReduxDispatch();
	const { sidenav } = useReduxSelector(({ ui }) => ui);
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
						src="https://i.pravatar.cc/150?u=a04258114e29026302d"
					/>
					{!sidenav.isFixed && (
						<h1 className="text-white text-2xl pl-2 font-bold whitespace-nowrap">Admin Panel</h1>
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
					<CollapseItems key={route.id} {...route} />
				))}
			</SidebarMenu>
		</aside>
	);
};
