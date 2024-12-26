import { useSearchParams } from "@/hooks/useSearchParams";
import { Card, CardBody } from "@nextui-org/card";
import { DiscountTable } from "../components/discount-table";
import Header from "../components/header";
import { Create } from "../components/modals/create";
import { DiscountModal } from "../components/modals/discount";
import { RemoveDiscount } from "../components/modals/discount-remove";
import { Remove } from "../components/modals/remove";
import { Update } from "../components/modals/update";
import { AddsTable } from "../components/table";
import { PARAMS } from "../model";

const AddManagementPage = () => {
	const { getParams } = useSearchParams();

	const renderTable = () => {
		if (getParams(PARAMS.ADD_TYPE_ID)) {
			return <DiscountTable />;
		} else {
			return <AddsTable />;
		}
	};

	return (
		<div className="flex flex-col gap-6">
			<Create />
			<Update />
			<Remove />
			{/* DISCOUNT MODALS */}
			<DiscountModal />
			<RemoveDiscount />

			{/* HEADER */}
			<Header />

			{/* BODY */}
			<Card className="dark:bg-dark-card shadow-none pt-0">
				<CardBody className="p-0">{renderTable()}</CardBody>
			</Card>
		</div>
	);
};

export default AddManagementPage;
