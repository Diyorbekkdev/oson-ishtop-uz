import { InvModal } from "../components/modal/modal";
import { InvetoryTable } from "../components/table";

const InventoryPage = () => {
	return (
		<div>
			<InvetoryTable />
			<InvModal />
		</div>
	);
};

export default InventoryPage;
