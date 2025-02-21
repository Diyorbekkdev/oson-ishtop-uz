import { useSelectedAddCache } from "@/modules/adds/services";
import { Spinner } from "@heroui/spinner";
import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@heroui/table";
const columns = [
	{ name: "Kompaniya nomi", uid: "company" },
	{ name: "Ish turi", uid: "jobTypesName" },
	{ name: "Ish haqi (boshlang'ich - maksimal)", uid: "salaryFrom-salaryTo" },
	{ name: "Sinov muddati bormi?", uid: "isThereTrialPeriod" },
	{ name: "Sinov muddati turi", uid: "trialPeriodType" },
	{ name: "Ko'rishlar soni", uid: "viewCnt" },
	{ name: "Ish jadvali", uid: "workSchedule" },
	{ name: "Ishchilar soni", uid: "peopleCnt" },
	{ name: "Talabalar kerakmi?", uid: "studentIsNeeded" },
	{ name: "Ish boshlanish vaqti", uid: "workTimeStart" },
	{ name: "Ish tugash vaqti", uid: "workTimeEnd" },
	{ name: "Amal qilish muddati", uid: "expiredDate" },
];

const SelectedAddTable = () => {
	const {
		data: { data: add, isLoading },
	} = useSelectedAddCache();
	return (
		<div>
			<Table
				aria-label="Example static collection table"
				shadow="sm"
				classNames={{
					wrapper: "dark:bg-dark-card",
					tr: "dark:hover:bg-dark-hover-row dark:even:bg-dark-even-row even:bg-primary-even-row",
					th: "first:w-[50px]",
				}}
				topContent={<></>}
				bottomContent={<></>}
				color="success"
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
					onError={(e) => console.log(e)}
				>
					<TableRow key={add?.code}>
						<TableCell className="whitespace-nowrap">
							{add?.company ?? "—"}
						</TableCell>
						<TableCell className="whitespace-nowrap">
							{add?.jobTypesName ?? "—"}
						</TableCell>
						<TableCell>{`${add?.salaryFrom} - ${add?.salaryTo} (so'm)`}</TableCell>
						<TableCell>{add?.isThereTrialPeriod ? "Ha" : "Yo'q"}</TableCell>
						<TableCell>{add?.trialPeriodType ?? "—"}</TableCell>
						<TableCell>{add?.viewCnt ?? "—"}</TableCell>
						<TableCell>{add?.workSchedule ?? "—"}</TableCell>
						<TableCell>{add?.peopleCnt ?? "—"}</TableCell>
						<TableCell>{add?.studentIsNeeded ? "Ha" : "Yo'q"}</TableCell>
						<TableCell>{add?.workTimeStart ?? "—"}</TableCell>
						<TableCell>{add?.workTimeEnd ?? "—"}</TableCell>
						<TableCell>{add?.expiredDate ?? "—"}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
};

export default SelectedAddTable;
