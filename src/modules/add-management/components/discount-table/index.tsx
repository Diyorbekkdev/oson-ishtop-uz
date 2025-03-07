import { DeleteIcon, EditIcon } from "@/assets/icons/global/gloval.icons";
import { useSearchParams } from "@/hooks/useSearchParams";
import { formatNumber } from "@/utils/format-number";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
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
import {
	calculateDiscountedPricePerDay,
	calculateDiscountedTotalPrice,
} from "../../lib/discount-price";
import { PARAMS } from "../../model";
import { useAddManagementCache } from "../../services";
import { useAddManagementModals } from "../../store";
import { useAddManagementTab } from "../../store/tabs.store";
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
	const { getParams } = useSearchParams();
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
									<Button
										isIconOnly
										onPress={() => {
											setModal({
												discount: {
													open: true,
													props: { ...el },
												},
											});
										}}
									>
										<EditIcon stroke="currentColor" />
									</Button>
								</Tooltip>
								<Tooltip color="danger" content="Chegirmani o'chirish">
									<Button
										isIconOnly
										onPress={() => {
											setModal({
												discount_remove: {
													open: true,
													props: { ...el },
												},
											});
										}}
									>
										{" "}
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
