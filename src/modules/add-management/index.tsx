import { Helmet } from "react-helmet-async";
import { Outlet, useOutlet } from "react-router-dom";
import DashboardPage from "./routes/add-management.component";

const AddManagement = () => {
	const hasOutlet = useOutlet();
	if (hasOutlet) return <Outlet />;
	return (
		<>
			<Helmet>
				<title>Elonlarni Boshqarish - Foodify</title>
				<meta name="description" content="Elonlarni boshqarish" />
				<link rel="canonical" href="/adds-control" />
			</Helmet>
			<DashboardPage />
		</>
	);
};

export default AddManagement;
