import { useSearchParams } from "@/hooks/useSearchParams";
import { PARAMS, RESOURCE_PARAM } from "@/modules/users/model";
import { useUsersTab } from "@/modules/users/store/tab.store";
import { Divider } from "@nextui-org/divider";

import { Select, SelectItem } from "@nextui-org/select";
import { User } from "@nextui-org/user";
import Zoom from "react-medium-image-zoom";

export const TableHeaderComponent = () => {
	const { setParams, getParams, removeParamsByKey } = useSearchParams();

	const userId = getParams(PARAMS.USER_ID);

	const { tabs } = useUsersTab();

	const selectedUser = (): any => {
		return tabs.find((user) => user?.id === userId);
	};

	console.log(selectedUser());
	return (
		<>
			<div className="flex items-center justify-between">
				<span className="text-3xl font-semibold flex-1">
					<div className="flex items-center gap-1">
						<Zoom>
							<User
								as="button"
								avatarProps={{
									isBordered: true,
									src: selectedUser()?.info?.avatarResourcesId
										? `${RESOURCE_PARAM.URL}${
												selectedUser()?.info?.avatarResourcesId
											}`
										: `${RESOURCE_PARAM.FALLBACK_URL}`,
								}}
								className="transition-transform"
								name={""}
							/>
						</Zoom>
						<h2>
							<span className="text-green-500">
								{String(selectedUser()?.title)}
							</span>{" "}
							ning hisob ma'lumotlari
						</h2>
					</div>
				</span>
				<div className="w-[20%]">
					<Select
						items={[
							{ key: "PAYME", label: "PAYME" },
							{ key: "CLICK", label: "CLICK" },
							{ key: "CASH", label: "CASH" },
							{ key: "ALL", label: "BARCHASI" },
						]}
						defaultSelectedKeys={[getParams(PARAMS.SOURCE) ?? "ALL"]}
						className="min-w-[80px]"
						radius="sm"
						label="To'lov turi bo'yicha so'rtlash"
						onChange={(e) => {
							if (e.target.value === "ALL") {
								removeParamsByKey({ keys: [PARAMS.SOURCE] });
							} else {
								setParams({ source: e.target.value });
							}
						}}
						size="sm"
					>
						{(data) => <SelectItem key={data.key}>{data.label}</SelectItem>}
					</Select>
				</div>
			</div>
			<Divider />
		</>
	);
};
