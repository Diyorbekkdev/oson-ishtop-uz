import { Card, CardBody } from "@nextui-org/card";

import { useSearchParams } from "@/hooks/useSearchParams";
import { AreasTable } from "../components/areas-table";
import Header from "../components/header";
import { AreasModal } from "../components/modals/areas";
import { Create } from "../components/modals/create";
import { Remove } from "../components/modals/remove";
import { RemoveArea } from "../components/modals/remove-area";
import { Update } from "../components/modals/update";
import { RegionsTable } from "../components/table";
import { PARAMS } from "../model";

const RegionsPage = () => {
	const { getParams } = useSearchParams();

	const renderTable = () => {
		if (getParams(PARAMS.REGION_ID)) {
			return <AreasTable />;
		} else {
			return <RegionsTable />;
		}
	};

	return (
		<div className="flex flex-col gap-6">
			<Create />
			<Update />
			<Remove />

			{/* AREAS MODALS */}
			<AreasModal />
			<RemoveArea />
			{/* HEADER */}
			<Header />

			{/* BODY */}
			<Card className="dark:bg-dark-card shadow-none">
				<CardBody className="p-0">{renderTable()}</CardBody>
			</Card>
		</div>
	);
};

export default RegionsPage;
