import { Helmet } from "react-helmet-async";
import { Outlet, useOutlet } from "react-router-dom";
import DashboardPage from "./routes/regions.component";

const JobTypeControl = () => {
	const hasOutlet = useOutlet();
	if (hasOutlet) return <Outlet />;
	return (
		<>
			<Helmet>
				<title>Bandlik turlarini boshqarish - OsonIshTop.uz</title>
				<meta name="description" content="Joylashuvlar" />
				<link rel="canonical" href="/regions" />
			</Helmet>
			<DashboardPage />
		</>
	);
};

export default JobTypeControl;
