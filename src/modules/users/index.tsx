import { Helmet } from "react-helmet-async";
import { Outlet, useOutlet } from "react-router-dom";

const Users = () => {
	const hasOutlet = useOutlet();
	if (hasOutlet) return <Outlet />;
	return (
		<>
			<Helmet>
				<title>Users - OsonIshTop.uz</title>
				<meta name="description" content="Users" />
				<link rel="canonical" href="/users" />
			</Helmet>
		</>
	);
};

export default Users;
