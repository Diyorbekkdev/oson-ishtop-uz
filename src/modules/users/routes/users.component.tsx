import { useSearchParams } from "@/hooks/useSearchParams";
import { Card, CardBody } from "@heroui/card";
import Header from "../components/header";
import { FreezeTransaction } from "../components/modals/freeze-transactions";
import { Remove } from "../components/modals/remove";
import { UsersTable } from "../components/table";
import { UserTransactions } from "../components/user-transactions/table";
import { PARAMS } from "../model";

const UsersPage = () => {
	const { getParams } = useSearchParams();

	const renderTable = () => {
		if (getParams(PARAMS.USER_ID)) {
			return <UserTransactions />;
		} else {
			return <UsersTable />;
		}
	};
	return (
		<div className="flex flex-col gap-6">
			<Remove />
			<FreezeTransaction />
			<Header />

			{/* BODY */}
			<Card className="dark:bg-dark-card shadow-none">
				<CardBody className="p-0">{renderTable()}</CardBody>
			</Card>
		</div>
	);
};

export default UsersPage;
