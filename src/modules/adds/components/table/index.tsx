import { EyeIcon } from "@/assets/icons/signin.icons";
import { VerticalDotsIcon } from "@/assets/icons/vertical-dots.icon";
import { useSearchParams } from "@/hooks/useSearchParams";
import { formatDate } from "@/utils/date-formatting";
import { formatNumber } from "@/utils/format-number";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/dropdown";
import { Snippet } from "@nextui-org/snippet";
import { Spinner } from "@nextui-org/spinner";
import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { generateStatus } from "../../model";
import { useAdminAdds } from "../../services";
import { useAddsModals } from "../../store";
import { useAddsTab } from "../../store/tab.store";
import { BottomContent } from "../pagination";
import { TableHeaderComponent } from "./table.header";

const columns = [
	{ name: "№", uid: "order" },
	// { name: "E'lon rasmlari", uid: "img" },
	{ name: "E'lon kodi", uid: "code" },
	{ name: "Ish nomi", uid: "jobName" },
	{ name: "Kompaniya", uid: "company" },
	{ name: "Ko'rishlar soni", uid: "viewcount" },
	{ name: "Foydalanuvchi Jinsi", uid: "gender" },
	{ name: "Sinov muddati bormi?", uid: "isThereTrialPeriod" },
	{ name: "Sinov muddati", uid: "trialPeriod" },
	{ name: "Status", uid: "status" },
	{ name: "E'lon o'chirilish sanasi", uid: "expire_date" },
	{ name: "Actions", uid: "actions" },
];

export const AddsTable = () => {
	const { setParams } = useSearchParams();
	const {
		data: { data, isLoading },
	} = useAdminAdds();
	const { setModal } = useAddsModals();
	const { addTab, tabs } = useAddsTab();
	return (
		<Table
			aria-label="Example static collection table"
			shadow="none"
			classNames={{
				wrapper: "dark:bg-dark-card",
				tr: "dark:hover:bg-dark-hover-row dark:even:bg-dark-even-row even:bg-primary-even-row",
				th: "first:w-[50px]",
			}}
			topContent={<TableHeaderComponent />}
			bottomContent={
				<BottomContent
					page={Number(data?.pageable?.pageNumber ?? 0) + 1}
					setPage={(e) => setParams({ page: String(e) })}
					pages={Number(data?.totalPages)}
				/>
			}
		>
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={column.uid === "actions" ? "end" : "start"}
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody
				isLoading={isLoading}
				emptyContent={<div>No data</div>}
				loadingContent={<Spinner />}
				spellCheck={true}
				style={{
					height:
						tabs?.length === 0 ? "calc(100vh - 400px)" : "calc(100vh - 500px)",
					overflowY: "auto",
				}}
			>
				{(data?.content ?? []).map((el, index) => (
					<TableRow key={el?.id}>
						<TableCell>
							{(Number((data?.pageable?.pageNumber ?? 0) + 1) - 1) *
								Number(data?.pageable?.pageSize) +
								index +
								1}
						</TableCell>
						{/* <TableCell>
              <Zoom>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src: el?.resources[0]
                      ? `${RESOURCE_PARAM.URL}${el?.resources[0].resourcesId}`
                      : `${RESOURCE_PARAM.FALLBACK_URL}`,
                  }}
                  className="transition-transform"
                  name={""}
                />
              </Zoom>
            </TableCell> */}
						<TableCell>
							{
								<Snippet
									color="warning"
									classNames={{
										symbol: "hidden",
									}}
								>
									{el?.code}
								</Snippet>
							}
						</TableCell>
						<TableCell>{el?.jobName ?? "➖➖➖"}</TableCell>
						<TableCell>{el?.company ?? "➖➖➖"}</TableCell>
						<TableCell>{formatNumber(el?.viewCnt ?? 0)}</TableCell>
						<TableCell>
							{
								<Chip
									color={el?.gender === "MALE" ? "success" : "danger"}
									variant="bordered"
								>
									{el?.gender === "MALE" ? "Erkak" : "Ayol"}
								</Chip>
							}
						</TableCell>
						<TableCell>
							{
								<Chip
									color={el?.isThereTrialPeriod ? "success" : "danger"}
									variant="bordered"
								>
									{el?.isThereTrialPeriod ? "Mavjud" : "Mavjud emas"}
								</Chip>
							}
						</TableCell>
						<TableCell>{formatNumber(el?.trialPeriod ?? 0)}</TableCell>
						<TableCell>
							{
								<Chip
									color={generateStatus(el?.status!).color as any}
									variant="bordered"
								>
									{generateStatus(el?.status!).label ?? "➖➖➖"}
								</Chip>
							}
						</TableCell>
						<TableCell>{formatDate(el?.expiredDate!)}</TableCell>
						<TableCell>
							<div className="flex items-center gap-4 justify-end">
								<Tooltip content="E'lon ma'lumotlarini ko'rish">
									<span
										onClick={(e) => {
											e.stopPropagation();
											setParams({ add_id: el?.id });
											addTab({
												id: el?.id,
												title: el?.jobName ?? "➖➖➖",
												info: {
													...el,
												},
											});
										}}
										className="text-lg text-default-400 cursor-pointer active:opacity-50"
									>
										<EyeIcon />
									</span>
								</Tooltip>
								<Dropdown>
									<DropdownTrigger>
										<Button isIconOnly>
											<VerticalDotsIcon />
										</Button>
									</DropdownTrigger>
									<DropdownMenu
										aria-label="User menu actions"
										onAction={() => console.log()}
									>
										<DropdownItem
											key="accepted"
											color="success"
											isDisabled={el?.status === "ACCEPTED"}
											onPress={() => {
												setModal({
													accept: { open: true, props: el },
												});
											}}
										>
											Tasdiqlash
										</DropdownItem>
										<DropdownItem
											key="reject-"
											color="danger"
											className="text-danger"
											isDisabled={el?.status === "REJECTED"}
											onPress={() => {
												setModal({
													reject: { open: true, props: el },
												});
											}}
										>
											Rad etish
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
