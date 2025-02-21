import ClearIcon from "@/assets/icons/clear.icon";
import { useSearchParams } from "@/hooks/useSearchParams";
import { Button } from "@heroui/button";
import { Tab, Tabs } from "@heroui/tabs";
import { Tooltip } from "@heroui/tooltip";
import { PARAMS } from "../../model";
import { useCategoriesTab } from "../../store/tab.store";

const Header = () => {
	const { setParams, getParams, removeParamsByKey, clearParams } =
		useSearchParams();
	const { closeTab, tabs } = useCategoriesTab();
	const closeRequestTab = (index: number) => {
		const shouldRedirect = closeTab(tabs[index]);

		if (getParams(PARAMS.CATEGORY_ID)) {
			if (shouldRedirect) {
				setParams({ categoryId: shouldRedirect?.id });
			} else {
				removeParamsByKey({ keys: [PARAMS.CATEGORY_ID] });
			}
		}
	};
	return (
		<div
			className={`w-[calc(100vw-320px)] overflow-x-auto ${
				tabs?.length === 0 && "hidden"
			}`}
		>
			{getParams(PARAMS.CATEGORY_ID) && (
				<Button
					color="success"
					className="mr-4"
					onPress={() => {
						clearParams();
					}}
				>
					Orqaga
				</Button>
			)}
			<Tabs
				aria-label="Dynamic tabs"
				selectedKey={getParams(PARAMS.CATEGORY_ID)}
				color="success"
				className="mt-0"
			>
				{tabs?.map((item, index) => (
					<Tab
						key={item.id}
						onClick={() => {
							setParams({ regionId: item.id });
						}}
						title={
							<div
								className="flex items-center gap-8"
								onClick={() => {
									setParams({ categoryId: item.id });
								}}
							>
								<Tooltip content={item?.title}>
									<span>{item.title}</span>
								</Tooltip>

								<Tooltip content="Tabni o'chirish">
									<div
										onClick={(e) => {
											e.stopPropagation();
											closeRequestTab(index);
										}}
									>
										<ClearIcon />
									</div>
								</Tooltip>
							</div>
						}
					></Tab>
				))}
			</Tabs>
		</div>
	);
};

export default Header;
