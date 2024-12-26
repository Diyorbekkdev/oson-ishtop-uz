import React, { memo } from "react";

interface Props {
	title?: string;
	children?: React.ReactNode;
}

export const SidebarMenu = memo(({ title, children }: Props) => {
	return (
		<div className="flex gap-2 flex-col mt-4">
			{title && <span className="text-xs font-normal">{title}</span>}
			{children}
		</div>
	);
});
