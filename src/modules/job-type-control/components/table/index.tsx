import { DeleteIcon, EditIcon } from "@/assets/icons/global/gloval.icons";
import { useSearchParams } from "@/hooks/useSearchParams";
import { formatDate } from "@/utils/date-formatting";
import { Chip } from "@heroui/chip";
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
import { useJobTypeControlCache } from "../../services";
import { useJobTypeControlModals } from "../../store";
import { BottomContent } from "../pagination";
import { JobTypeControlHeader } from "./table.header";

const columns = [
	{ name: "№", uid: "order" },
	{ name: "ID", uid: "id" },
	{ name: "Nomi (UZ)", uid: "name_uz" },
	{ name: "Nomi (RU)", uid: "name_ru" },
	{ name: "Nomui (ENG)", uid: "name_eng" },
	{ name: "Trial Periyod", uid: "trial_period" },
	{ name: "Yaratilgan Sana", uid: "created_at" },
	{ name: "Tahrilgan Sana", uid: "updated_at" },
	{ name: "Actions", uid: "actions" },
];

export const JobTypeControlTable = () => {
	const { setParams } = useSearchParams();
	const {
		data: { data, isLoading },
	} = useJobTypeControlCache();
	const { setModal } = useJobTypeControlModals();

	return (
		<Table
			aria-label="Example static collection table"
			shadow="none"
			classNames={{
				wrapper: "dark:bg-dark-card",
				tr: "dark:hover:bg-dark-hover-row dark:even:bg-dark-even-row even:bg-primary-even-row",
				th: "first:w-[50px]",
			}}
			topContent={<JobTypeControlHeader />}
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
				style={{ height: "calc(100vh - 400px)", overflowY: "auto" }}
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
							{el?.isThereTrialPeriod ? (
								<Chip variant="bordered" color="success">
									Bor
								</Chip>
							) : (
								<Chip variant="bordered" color="danger">
									Yo'q
								</Chip>
							)}
						</TableCell>
						<TableCell>{formatDate(el?.createdDate)}</TableCell>
						<TableCell>{formatDate(el?.updatedDate)}</TableCell>
						<TableCell>
							<div className="relative flex items-center gap-2 justify-end">
								<Tooltip content="E'lonni tahrirlash">
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
								<Tooltip color="danger" content="E'lonni o'chirish">
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
