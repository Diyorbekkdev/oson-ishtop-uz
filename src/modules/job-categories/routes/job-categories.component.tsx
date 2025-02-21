import { Card, CardBody } from "@heroui/card";

import { useSearchParams } from "@/hooks/useSearchParams";
import { ChildTable } from "../components/child-table";
import Header from "../components/header";
import { ChildModal } from "../components/modals/child";
import { Create } from "../components/modals/create";
import { Remove } from "../components/modals/remove";
import { RemoveChild } from "../components/modals/remove-child";
import { Update } from "../components/modals/update";
import { ParentTable } from "../components/table";
import { PARAMS } from "../model";

const JobCategoriesPage = () => {
	const { getParams } = useSearchParams();

	const renderTable = () => {
		if (getParams(PARAMS.CATEGORY_ID)) {
			return <ChildTable />;
		} else {
			return <ParentTable />;
		}
	};

	return (
		<div className="flex flex-col gap-6">
			<Create />
			<Update />
			<Remove />

			{/* AREAS MODALS */}
			<ChildModal />
			<RemoveChild />
			{/* HEADER */}
			<Header />

			{/* BODY */}
			<Card className="dark:bg-dark-card shadow-none">
				<CardBody className="p-0">{renderTable()}</CardBody>
			</Card>
		</div>
	);
};

export default JobCategoriesPage;
