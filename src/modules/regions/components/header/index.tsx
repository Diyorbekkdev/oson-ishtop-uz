import ClearIcon from "@/assets/icons/clear.icon";
import { useSearchParams } from "@/hooks/useSearchParams";
import { Button } from "@nextui-org/button";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Tooltip } from "@nextui-org/tooltip";
import { PARAMS } from "../../model";
import { useAreasTab } from "../../store/tab.store";

const Header = () => {
	const { setParams, getParams, removeParamsByKey, clearParams } =
		useSearchParams();
	const { closeTab, tabs } = useAreasTab();
	const closeRequestTab = (index: number) => {
		const shouldRedirect = closeTab(tabs[index]);

		if (getParams(PARAMS.REGION_ID)) {
			if (shouldRedirect) {
				setParams({ regionId: shouldRedirect?.id });
			} else {
				removeParamsByKey({ keys: [PARAMS.REGION_ID] });
			}
		}
	};
	return (
		<div
			className={`w-[calc(100vw-320px)] overflow-x-auto ${
				tabs?.length === 0 && "hidden"
			}`}
		>
			{getParams(PARAMS.REGION_ID) && (
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
				selectedKey={getParams(PARAMS.REGION_ID)}
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
									setParams({ regionId: item.id });
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
