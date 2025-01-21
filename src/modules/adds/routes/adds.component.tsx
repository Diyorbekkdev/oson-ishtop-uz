import { useSearchParams } from "@/hooks/useSearchParams";
import { Card, CardBody } from "@nextui-org/card";
import SelectedAdd from "../components/add";
import Header from "../components/header";
import { AcceptAdd } from "../components/modals/accept";
import { RejectAdd } from "../components/modals/reject";
import { AddsTable } from "../components/table";
import { PARAMS } from "../model";

const AddsPage = () => {
	const { getParams } = useSearchParams();
	const renderPage = () => {
		if (getParams(PARAMS.ADD_ID)) {
			return <SelectedAdd />;
		} else {
			return <AddsTable />;
		}
	};

	return (
		<div className="flex flex-col gap-6">
			<AcceptAdd />
			<RejectAdd />
			{/* HEADER */}
			<Header />
			{/* BODY */}
			<Card className="dark:bg-dark-card shadow-none">
				<CardBody className="p-0">{renderPage()}</CardBody>
			</Card>
			{/* <Panel /> */}
		</div>
	);
};

export default AddsPage;
