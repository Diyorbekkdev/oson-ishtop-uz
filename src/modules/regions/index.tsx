import { Helmet } from "react-helmet-async";
import { Outlet, useOutlet } from "react-router-dom";
import DashboardPage from "./routes/regions.component";

const Regions = () => {
	const hasOutlet = useOutlet();
	if (hasOutlet) return <Outlet />;
	return (
		<>
			<Helmet>
				<title>Joylashuvlar - OsonIshTop</title>
				<meta name="description" content="Joylashuvlar" />
				<link rel="canonical" href="/regions" />
			</Helmet>
			<DashboardPage />
		</>
	);
};

export default Regions;
