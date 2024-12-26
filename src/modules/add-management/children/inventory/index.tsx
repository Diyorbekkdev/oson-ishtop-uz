import { Helmet } from "react-helmet-async";
import InventoryPage from "./routes/inventory.component";

const Inventory = () => {
	return (
		<>
			<Helmet>
				<title>Managment/Inventory - Foodify</title>
				<meta name="description" content="Inventory page for Foodify" />
				<link rel="canonical" href="/inventory" />
			</Helmet>
			<InventoryPage />
		</>
	);
};

export default Inventory;
