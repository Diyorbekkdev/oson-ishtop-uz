import ClearIcon from "@/assets/icons/clear.icon";
import { useSearchParams } from "@/hooks/useSearchParams";
import { Button } from "@heroui/button";
import { Tab, Tabs } from "@heroui/tabs";
import { Tooltip } from "@heroui/tooltip";
import { PARAMS } from "../../model";
import { useAddsTab } from "../../store/tab.store";

const tabColors: Record<string, string> = {
	[PARAMS.WAITING]: "warning",
	[PARAMS.ACCEPTED]: "success",
	[PARAMS.ARCHIVE]: "warning",
	[PARAMS.REJECTED]: "danger",
	[PARAMS.DRAFT]: "warning",
};

const Header = () => {
	const { setParams, getParams, removeParamsByKey, clearParams } =
		useSearchParams();
	const { closeTab, tabs } = useAddsTab();

	const closeRequestTab = (index: number) => {
		const shouldRedirect = closeTab(tabs[index]);
		if (getParams(PARAMS.ADD_ID)) {
			if (shouldRedirect) {
				setParams({ add_id: shouldRedirect?.id });
			} else {
				removeParamsByKey({ keys: [PARAMS.ADD_ID] });
			}
		}
	};

	return (
		<>
			<div
				className={`w-[calc(100vw-320px)] overflow-x-auto ${
					tabs?.length === 0 && "hidden"
				}`}
			>
				{getParams(PARAMS.ADD_ID) && (
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
					selectedKey={getParams(PARAMS.ADD_ID)}
					color="success"
					className="mt-0"
					variant="bordered"
				>
					{tabs?.map((item, index) => (
						<Tab
							key={item.id}
							onClick={() => {
								setParams({ add_id: item.id, page: "1" });
							}}
							title={
								<div
									className="flex items-center gap-8"
									onClick={() => {
										setParams({ add_id: item.id });
									}}
								>
									<Tooltip content={item?.title}>
										<span>{item.title ?? "Tab nomi yo'q"}</span>
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
			{!getParams(PARAMS.ADD_ID) && (
				<div className="overflow-x-auto">
					<Tabs
						fullWidth
						selectedKey={getParams("tab") ?? PARAMS.WAITING}
						onSelectionChange={(key) => {
							setParams({
								tab: String(key),
								page: "1",
								pageSize: "10",
								priceFrom: "0",
								priceTo: "500000",
							});
						}}
						color={
							tabColors[getParams("tab") ?? PARAMS.WAITING] as
								| "success"
								| "default"
								| "primary"
								| "secondary"
								| "warning"
								| "danger"
								| undefined
						}
					>
						<Tab key={PARAMS.WAITING} title="YANGI E'LONLAR" />
						<Tab key={PARAMS.DRAFT} title="DRAFT E'LONLAR" />
						<Tab key={PARAMS.ACCEPTED} title="QABUL QILINGAN E'LONLAR" />
						<Tab key={PARAMS.REJECTED} title="RAD ETILGAN E'LONLAR" />
						<Tab key={PARAMS.ARCHIVE} title="ARXIVDAGI E'LONLAR" />
					</Tabs>
				</div>
			)}
		</>
	);
};

export default Header;
// WAITING: { color: "warning", label: "WAITING" },
// 	ACCEPTED: { color: "success", label: "ACCEPTED" },
// 	ARCHIVE: { color: "warning", label: "ARCHIVE" },
// 	REJECTED: { color: "danger", label: "REJECTED" },
// 	DRAFT: { color: "warning", label: "DRAFT" },
