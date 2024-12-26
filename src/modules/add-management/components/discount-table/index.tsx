import { DeleteIcon, EditIcon } from "@/assets/icons/global/gloval.icons";
import { useSearchParams } from "@/hooks/useSearchParams";
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
import {
	calculateDiscountedPricePerDay,
	calculateDiscountedTotalPrice,
} from "../../lib/discount-price";
import { PARAMS } from "../../model";
import { useAddManagementCache } from "../../services";
import { useAddManagementModals } from "../../store";
import { useAddManagementTab } from "../../store/tabs.store";
import { BottomContent } from "../pagination";
import Header from "./table.header";

const columns = [
	{ name: "№", uid: "order" },
	{ name: "Nomi", uid: "name" },
	{ name: "Belgilanilgan Kun", uid: "fixedDay" },
	{ name: "Chegirma (%)", uid: "discount" },
	{ name: "Asil narxi (Kunlik)", uid: "priseWithoutDiscount" },
	{ name: "Chegirma narxi (Kunlik)", uid: "priseWithDiscount" },
	{ name: "Chegirma narxi (Umumiy)", uid: "priseWithDiscountTotal" },
	{ name: "Actions", uid: "actions" },
];

export const DiscountTable = () => {
	const { setParams, getParams } = useSearchParams();
	const {
		discount: { data, isLoading },
	} = useAddManagementCache();
	const { setModal } = useAddManagementModals();
	const { tabs } = useAddManagementTab();

	const pricePerDay = tabs?.find(
		(el) => el?.id === getParams(PARAMS.ADD_TYPE_ID),
	)?.info;

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
						<TableCell>
							{
								tabs?.find((el) => el?.id === getParams(PARAMS.ADD_TYPE_ID))
									?.title
							}
						</TableCell>
						<TableCell>{el?.fixedDay} kun</TableCell>
						<TableCell>
							{
								<Chip color="warning" variant="bordered">
									{el?.discount} %
								</Chip>
							}
						</TableCell>
						<TableCell>
							{formatNumber(
								tabs?.find((el) => el?.id === getParams(PARAMS.ADD_TYPE_ID))
									?.info,
							)}{" "}
							So'm
						</TableCell>
						<TableCell>
							{formatNumber(
								calculateDiscountedPricePerDay(
									Number(pricePerDay),
									el?.discount,
									el?.fixedDay,
								),
							)}{" "}
							So'm
						</TableCell>
						<TableCell>
							{formatNumber(
								calculateDiscountedTotalPrice(
									Number(pricePerDay),
									el?.discount,
									el?.fixedDay,
								),
							)}{" "}
							So'm
						</TableCell>
						<TableCell>
							<div className="relative flex items-center gap-2 justify-end">
								<Tooltip content="Chegirmani tahrirlash">
									<span
										className="text-lg text-default-400 cursor-pointer active:opacity-50"
										onClick={(e) => {
											e.stopPropagation();
											setModal({
												discount: {
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
												discount_remove: {
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