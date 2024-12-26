import { Helmet } from "react-helmet-async";
import { SignUpComponent } from "./routes/sign-up.component";

const SignUp = () => {
	return (
		<>
			<Helmet>
				<title>Sign-up - Foodify</title>
				<meta name="description" content="Sign-up to your Foodify account" />
				<link rel="canonical" href="/sign-up" />
			</Helmet>
			<SignUpComponent />
		</>
	);
};

export default SignUp;
