import { Helmet } from "react-helmet-async";
import { SignInPage } from "./routes/sign-in.page";

const SignIn = () => {
	return (
		<>
			<Helmet>
				<title>Sign-in - Foodify</title>
				<meta name="description" content="Sign-in to your Foodify account" />
				<link rel="canonical" href="/sign-in" />
			</Helmet>
			<SignInPage />
		</>
	);
};

export default SignIn;
