import { DeleteIcon, EditIcon } from "@/assets/icons/global/gloval.icons";
import { useSearchParams } from "@/hooks/useSearchParams";
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
import Header from "./table.header";

const columns = [
	{ name: "№", uid: "order" },
	{ name: "ID", uid: "id" },
	{ name: "Nomi (UZ)", uid: "name_uz" },
	{ name: "Nomi (RU)", uid: "name_ru" },
	{ name: "Nomui (ENG)", uid: "name_eng" },
	{ name: "Actions", uid: "actions" },
];

export const AreasTable = () => {
	const { setParams } = useSearchParams();
	const {
		areas: { data, isLoading },
	} = useAddManagementCache();
	const { setModal } = useRegionsModals();
	const { tabs } = useAreasTab();

	return (
		<Table
			aria-label="Example static collection table"
			shadow="none"
			classNames={{
				wrapper: "dark:bg-dark-card",
				tr: "dark:hover:bg-dark-hover-row dark:even:bg-dark-even-row even:bg-primary-even-row",
				th: "first:w-[50px]",
			}}
			topContent={<Header />}
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
						<TableCell>
							<div className="relative flex items-center gap-2 justify-end">
								<Tooltip content="Chegirmani tahrirlash">
									<span
										className="text-lg text-default-400 cursor-pointer active:opacity-50"
										onClick={(e) => {
											e.stopPropagation();
											setModal({
												areas: {
													open: true,
													props: { ...el },
												},
											});
										}}
									>
										<EditIcon stroke="currentColor" />
									</span>
								</Tooltip>
								<Tooltip color="danger" content="Chegirmani o'chirish">
									<span
										className="text-lg text-danger cursor-pointer active:opacity-50"
										onClick={(e) => {
											e.stopPropagation();
											setModal({
												areas_remove: {
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
