import { Card, CardBody } from "@nextui-org/card";
import { Create } from "../components/modals/create";
import { Remove } from "../components/modals/remove";
import { Update } from "../components/modals/update";
import { AddsTable } from "../components/table";

const AddManagementPage = () => {
	return (
		<div className="flex flex-col gap-6">
			<Create />
			<Update />
			<Remove />
			<Card className="dark:bg-dark-card shadow-none">
				<CardBody className="p-0">
					<AddsTable />
				</CardBody>
			</Card>
		</div>
	);
};

export default AddManagementPage;
