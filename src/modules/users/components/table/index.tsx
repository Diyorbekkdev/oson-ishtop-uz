import FreezeIcon from "@/assets/icons/freeze.icon";
import { DeleteIcon, EditIcon } from "@/assets/icons/global/gloval.icons";
import { EyeIcon } from "@/assets/icons/signin.icons";
import { useSearchParams } from "@/hooks/useSearchParams";
import { formatDate } from "@/utils/date-formatting";
import { formatNumber } from "@/utils/format-number";
import { Chip } from "@nextui-org/chip";
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
import { User } from "@nextui-org/user";
import Zoom from "react-medium-image-zoom";
import { RESOURCE_PARAM } from "../../model";
import { useAdminUsersCache } from "../../services";
import { useUsersModals } from "../../store";
import { useUsersTab } from "../../store/tab.store";
import { BottomContent } from "../pagination";
import { TableHeaderComponent } from "./table.header";

const columns = [
	{ name: "№", uid: "order" },
	{ name: "Foydalanuvchi Rasmi", uid: "avatar" },
	{ name: "Foydalanuvchi FIO", uid: "fio" },
	{ name: "Foydalanuvchi Telefon raqami", uid: "phone" },
	{ name: "Foydalanuvchi Jinsi", uid: "gender" },
	{ name: "Foydalanilayotgan til", uid: "language" },
	{ name: "Foydalanuvchi balansi", uid: "balance" },
	{ name: "Foydalanuvchi Tug'ilgan Sana", uid: "birthDate" },
	{ name: "Foydalanuvchi Tahrirlangan Sana", uid: "updated_at" },
	{ name: "Yaratilgan Sana", uid: "created_at" },
	{ name: "Actions", uid: "actions" },
];

export const UsersTable = () => {
	const { setParams } = useSearchParams();
	const { addTab, tabs } = useUsersTab();
	const { setModal } = useUsersModals();
	const {
		data: { data, isLoading },
	} = useAdminUsersCache();

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
						<TableCell>
							<Zoom>
								<User
									as="button"
									avatarProps={{
										isBordered: true,
										src: el?.avatarResourcesId
											? `${RESOURCE_PARAM.URL}${el?.avatarResourcesId}`
											: `${RESOURCE_PARAM.FALLBACK_URL}`,
									}}
									className="transition-transform"
									name={""}
								/>
							</Zoom>
						</TableCell>
						<TableCell>{el?.fio ?? "➖➖➖"}</TableCell>
						<TableCell>{el?.phone ?? "➖➖➖"}</TableCell>
						<TableCell>{el?.language ?? "➖➖➖"}</TableCell>
						<TableCell>
							{
								<Chip
									color={el?.gender ? "success" : "danger"}
									variant="bordered"
								>
									{el?.gender ? "Erkak" : "Ayol"}
								</Chip>
							}
						</TableCell>
						<TableCell>
							{
								<Chip
									color={el?.balance > 0 ? "success" : "danger"}
									variant="bordered"
								>
									{formatNumber(el?.balance ?? 0)} so'm
								</Chip>
							}
						</TableCell>
						<TableCell>{formatDate(el?.birthDate!)}</TableCell>
						<TableCell>{formatDate(el?.updatedDate!)}</TableCell>
						<TableCell>{formatDate(el?.createdDate!)}</TableCell>
						<TableCell>
							<div className="relative flex items-center gap-2 justify-end">
								<Tooltip content="Foydalanuvchini ko'rish">
									<span
										onClick={(e) => {
											e.stopPropagation();
											setParams({ userId: String(el?.id) });
											addTab({
												id: String(el?.id),
												title: el?.fio,
												info: { ...el },
											});
										}}
										className="text-lg text-default-400 cursor-pointer active:opacity-50"
									>
										<EyeIcon />
									</span>
								</Tooltip>
								<Tooltip content="Foydalanuvchini tahrirlash">
									<span
										className="text-lg text-default-400 cursor-pointer active:opacity-50"
										onClick={(e) => {
											e.stopPropagation();
											setModal({
												update: {
													open: true,
													props: { ...el },
												},
											});
										}}
									>
										<EditIcon stroke="currentColor" />
									</span>
								</Tooltip>
								<Tooltip content="Foydalanuvchini balansni muzlatish">
									<span
										className="text-lg text-default-400 cursor-pointer active:opacity-50"
										onClick={(e) => {
											e.stopPropagation();
											setModal({
												freeze: {
													open: true,
													props: { ...el },
												},
											});
										}}
									>
										<FreezeIcon />
									</span>
								</Tooltip>
								<Tooltip color="danger" content="Foydalanuvchini o'chirish">
									<span
										className="text-lg text-danger cursor-pointer active:opacity-50"
										onClick={(e) => {
											e.stopPropagation();
											setModal({
												remove: {
													open: true,
													props: { ...el },
												},
											});
										}}
									>
										<DeleteIcon color="#ff2323" />
									</span>
								</Tooltip>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
