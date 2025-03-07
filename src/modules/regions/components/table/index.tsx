import { DeleteIcon, EditIcon } from "@/assets/icons/global/gloval.icons";
import { EyeIcon } from "@/assets/icons/signin.icons";
import { useSearchParams } from "@/hooks/useSearchParams";
import { formatDate } from "@/utils/date-formatting";
import { Button } from "@heroui/button";
import { Snippet } from "@heroui/snippet";
import { Spinner } from "@heroui/spinner";
import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import { useAddManagementCache } from "../../services";
import { useRegionsModals } from "../../store";
import { useAreasTab } from "../../store/tab.store";
import { BottomContent } from "../pagination";
import { AddManagementHeader } from "./table.header";

const columns = [
	{ name: "№", uid: "order" },
	{ name: "ID", uid: "id" },
	{ name: "Nomi (UZ)", uid: "name_uz" },
	{ name: "Nomi (RU)", uid: "name_ru" },
	{ name: "Nomui (ENG)", uid: "name_eng" },
	{ name: "Yaratilgan Sana", uid: "created_at" },
	{ name: "Actions", uid: "actions" },
];

export const RegionsTable = () => {
	const { setParams } = useSearchParams();
	const {
		data: { data, isLoading },
	} = useAddManagementCache();
	const { setModal } = useRegionsModals();
	const { addTab, tabs } = useAreasTab();

	return (
		<Table
			aria-label="Example static collection table"
			shadow="none"
			classNames={{
				wrapper: "dark:bg-dark-card",
				tr: "dark:hover:bg-dark-hover-row dark:even:bg-dark-even-row even:bg-primary-even-row",
				th: "first:w-[50px]",
			}}
			topContent={<AddManagementHeader />}
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
						<TableCell style={{ width: "20px" }}>
							<Snippet symbol="">{el?.id}</Snippet>
						</TableCell>
						<TableCell>{el?.nameUz}</TableCell>
						<TableCell>{el?.nameRu}</TableCell>
						<TableCell>{el?.nameEn}</TableCell>
						<TableCell>{formatDate(el?.createdDate)}</TableCell>
						<TableCell>
							<div className="relative flex items-center gap-2 justify-end">
								<Tooltip content="Details">
									<Button
										onPress={() => {
											setParams({ regionId: String(el?.id) });
											addTab({
												id: String(el?.id),
												title: el?.name,
												info: el?.pricePerDay,
											});
										}}
										isIconOnly
									>
										<EyeIcon />
									</Button>
								</Tooltip>
								<Tooltip content="E'lonni tahrirlash">
									<Button
										isIconOnly
										onPress={() => {
											setModal({
												update: {
													open: true,
													props: { ...el },
												},
											});
										}}
									>
										<EditIcon stroke="currentColor" />
									</Button>
								</Tooltip>
								<Tooltip color="danger" content="E'lonni o'chirish">
									<Button
										isIconOnly
										onPress={() => {
											setModal({
												remove: {
													open: true,
													props: { ...el },
												},
											});
										}}
									>
										<DeleteIcon color="#ff2323" />
									</Button>
								</Tooltip>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
