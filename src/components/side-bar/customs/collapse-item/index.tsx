import { ChevronDownIcon } from "@/assets/icons/sidebar/chevrow-down.icon";
import { CopyDocumentIcon } from "@/assets/icons/sidebar/copy-document.icon";
import { useReduxSelector } from "@/hooks/useRedux";
import { TRoutes } from "@/types/routes";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@heroui/dropdown";
import { memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const CollapseItems = memo(
	({ icon, title, children, path }: TRoutes) => {
		const { sidenav } = useReduxSelector(({ ui }) => ui);
		const { pathname } = useLocation();
		const navigate = useNavigate();
		const iconClasses =
			"text-xl text-default-500 pointer-events-none flex-shrink-0";
		return (
			<div className="flex gap-4 h-full items-center cursor-pointer">
				{sidenav.isFixed ? (
					<Dropdown placement="right-start">
						<DropdownTrigger>
							<Button
								isIconOnly
								className={`w-full hover:bg-[#60D43114] rounded-none ${pathname.startsWith(path!) && "active-icon"}`}
								color="primary"
							>
								{icon}
							</Button>
						</DropdownTrigger>
						<DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
							{children!.map((item, index) => (
								<DropdownItem
									key={index}
									startContent={<CopyDocumentIcon className={iconClasses} />}
									onClick={() => navigate(`${path}/${item.path!}`)}
								>
									{item?.title}
								</DropdownItem>
							))}
						</DropdownMenu>
					</Dropdown>
				) : (
					<Accordion className="px-0 rounded-none">
						<AccordionItem
							indicator={<ChevronDownIcon />}
							classNames={{
								indicator: "data-[open=true]:-rotate-180",
								trigger:
									"py-0 min-h-[44px] hover:bg-[#60D43114]  active:scale-[0.98] transition-transform px-3.5",

								title:
									"px-0 flex text-base gap-2 h-full items-center cursor-pointer",
							}}
							aria-label="Accordion 1"
							title={
								<div className="flex flex-row gap-2">
									<span>{icon}</span>
									{<span className="text-secondary-50">{title}</span>}
								</div>
							}
						>
							<div className="pl-12">
								{children!.map((item, index) => (
									<span
										key={index}
										className={`w-full flex  text-default-500 hover:text-default-900 transition-colors  ${pathname.startsWith(`${path}/${item.path}`!) && "text-[#60D431]"}`}
										onClick={() => navigate(`${path}/${item.path!}`)}
									>
										{item?.title}
									</span>
								))}
							</div>
						</AccordionItem>
					</Accordion>
				)}
			</div>
		);
	},
);
