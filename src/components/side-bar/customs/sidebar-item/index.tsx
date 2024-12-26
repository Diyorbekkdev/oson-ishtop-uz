import clsx from "clsx";
import React, { memo } from "react";
import { NavLink } from "react-router-dom";

interface Props {
	title: string;
	icon: React.ReactNode;
	isActive?: boolean;
	href?: string;
	isExpanded?: boolean;
}

export const SidebarItem = memo(
	({ icon, title, isActive, href = "", isExpanded }: Props) => {
		return (
			<NavLink
				to={href}
				className="text-default-900 active:bg-none max-w-full "
			>
				<div
					className={clsx(
						isActive ? "bg-[#60D43114] active-icon" : "hover:bg-[#60D43114]",
						`flex gap-2 w-full min-h-[44px] h-full items-center px-3.5  cursor-pointer transition-all duration-150 active:scale-[0.98] ${isExpanded && "flex-col justify-center"}`,
					)}
				>
					{icon}
					{!isExpanded && <span className={`text-secondary-50`}>{title}</span>}
				</div>
			</NavLink>
		);
	},
);
