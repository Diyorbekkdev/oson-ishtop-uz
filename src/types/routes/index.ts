import React, { ReactNode } from "react";

export type TRoutes = {
	id: number | string;
	path?: string;
	title?: string;
	isPath?: boolean;
	element?: React.ReactElement | Element | ReactNode | any;
	shouldHideWhenClosed?: boolean;
	icon?: ReactNode;
	hasChild?: boolean;
	children?: TRoutes[];
	roles?: string[];
};
