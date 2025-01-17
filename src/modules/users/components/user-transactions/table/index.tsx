import { EditIcon } from "@/assets/icons/global/gloval.icons";
import { useSearchParams } from "@/hooks/useSearchParams";
import { formatDate } from "@/utils/date-formatting";
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
import classNames from "classnames";

import { useAdminUserTransactionsCache } from "@/modules/users/services";
import { useUsersModals } from "@/modules/users/store";
import { useUsersTab } from "@/modules/users/store/tab.store";
import { formatNumber } from "@/utils/format-number";
import { BottomContent } from "../pagination";
import { TableHeaderComponent } from "./table.header";

//Images

import cash from "@/assets/images/cash.png";
import click from "@/assets/images/click.png";
import payme from "@/assets/images/payme.png";
import { Image } from "@nextui-org/image";

const columns = [
	{ name: "№", uid: "order" },
	{ name: "To'lov turi", uid: "type" },
	{ name: "Miqdor", uid: "amount" },
	{ name: "Yaratilgan Sana", uid: "created_at" },
	{ name: "Actions", uid: "actions" },
];

export const UserTransactions = () => {
	const { setParams } = useSearchParams();
	const { tabs } = useUsersTab();
	const { setModal } = useUsersModals();
	const {
		data: { data: transactions, isLoading },
	} = useAdminUserTransactionsCache();

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
					page={Number(transactions?.pageable?.pageNumber ?? 0) + 1}
					setPage={(e) => setParams({ page: String(e) })}
					pages={Number(transactions?.totalPages)}
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
				{(transactions?.content ?? []).map((el, index) => (
					<TableRow key={el?.id}>
						<TableCell>
							{(Number((transactions?.pageable?.pageNumber ?? 0) + 1) - 1) *
								Number(transactions?.pageable?.pageSize) +
								index +
								1}
						</TableCell>
						<TableCell>
							<div className="flex items-center gap-2">
								<span
									className={classNames(
										"px-2 py-1 rounded text-sm font-medium",
										{
											"bg-blue-100 text-blue-600": el?.source === "PAYME",
											"bg-green-100 text-green-600": el?.source === "CLICK",
											"bg-yellow-100 text-yellow-600": el?.source === "CASH",
											"bg-gray-100 text-gray-600": !el?.source,
										},
									)}
								>
									<Image
										src={
											el?.source === "PAYME"
												? payme
												: el?.source === "CLICK"
													? click
													: el?.source === "CASH"
														? cash
														: ""
										}
										alt={el?.source}
										width={50}
										height={50}
									/>
								</span>
							</div>
						</TableCell>
						<TableCell>{formatNumber(el?.amount ?? 0)} so'm</TableCell>
						<TableCell>{formatDate(el?.createdDate!)}</TableCell>

						<TableCell>
							<div className="relative flex items-center gap-2 justify-end">
								<Tooltip content="Tahrirlash">
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
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
