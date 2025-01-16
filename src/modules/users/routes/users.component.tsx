import Header from "../components/header";
import { Remove } from "../components/modals/remove";
import { UsersTable } from "../components/table";

const UsersPage = () => {
	return (
		<div className="flex flex-col gap-6">
			<Remove />
			{/* <Update/> */}
			<Header />

			<UsersTable />
		</div>
	);
};

export default UsersPage;
