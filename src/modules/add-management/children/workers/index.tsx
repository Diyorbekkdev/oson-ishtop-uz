import { Helmet } from "react-helmet-async";
import WorkersPage from "./routes/workers.component";

const Workers = () => {
	return (
		<>
			<Helmet>
				<title>Workers - Foodify</title>
				<meta name="description" content="workers pages for Foodify" />
				<link rel="canonical" href="/workers" />
			</Helmet>
			<WorkersPage />
		</>
	);
};

export default Workers;
