import ClearIcon from "@/assets/icons/clear.icon";
import { useSearchParams } from "@/hooks/useSearchParams";
import { Button } from "@heroui/button";
import { Tab, Tabs } from "@heroui/tabs";
import { Tooltip } from "@heroui/tooltip";
import { PARAMS } from "../../model";
import { useAddManagementTab } from "../../store/tabs.store";

const Header = () => {
	const { setParams, getParams, removeParamsByKey, clearParams } =
		useSearchParams();
	const { closeTab, tabs } = useAddManagementTab();
	const closeRequestTab = (index: number) => {
		const shouldRedirect = closeTab(tabs[index]);

		if (getParams(PARAMS.ADD_TYPE_ID)) {
			if (shouldRedirect) {
				setParams({ add: shouldRedirect?.id });
			} else {
				removeParamsByKey({ keys: ["add"] });
			}
		}
	};
	return (
		<div
			className={`w-[calc(100vw-320px)] overflow-x-auto ${
				tabs?.length === 0 && "hidden"
			}`}
		>
			{getParams(PARAMS.ADD_TYPE_ID) && (
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
				selectedKey={getParams("add")}
				color="success"
				className="mt-0"
			>
				{tabs?.map((item, index) => (
					<Tab
						key={item.id}
						onClick={() => {
							setParams({ add: item.id });
						}}
						title={
							<div
								className="flex items-center gap-8"
								onClick={() => {
									setParams({ add: item.id });
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
