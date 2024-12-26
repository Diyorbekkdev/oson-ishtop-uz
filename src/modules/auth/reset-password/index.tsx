import { Helmet } from "react-helmet-async";

const ResetPassword = () => {
	return (
		<>
			<Helmet>
				<title>Reset Password - Foodify</title>
				<meta
					name="description"
					content="Reset your password for your Foodify account"
				/>
				<link rel="canonical" href="/reset-password" />
			</Helmet>
			<ResetPassword />
		</>
	);
};

export default ResetPassword;
