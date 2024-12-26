import { useHttpRequest } from "@/hooks/useHttpRequest";
import { useReduxDispatch, useReduxSelector } from "@/hooks/useRedux";
import { setAuth } from "@/redux/slices/auth/sign-in";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import toast from "react-hot-toast";
import { SignInData, SignInForm } from "../model";

type ON_SUBMIT = (T: SignInForm) => Promise<void>;

type SignInFeatures = {
	onSubmit: ON_SUBMIT;
};

export const useSignInFeatures = (): SignInFeatures => {
	const dispatch = useReduxDispatch();
	const { rememberMe, auth } = useReduxSelector(({ signIn }) => signIn);
	const { functionInvoke } = useHttpRequest();
	const signIn = useSignIn();

	const rememberMeController = () => {
		rememberMe
			? localStorage.setItem("rememberMe", JSON.stringify(auth))
			: localStorage.removeItem("rememberMe");
	};

	const onSubmit: ON_SUBMIT = async (value) => {
		if (!value.phone || !value.password || auth?.status === "loading") return;

		dispatch(setAuth({ status: "loading" }));

		const { data, error } = await functionInvoke<SignInData>({
			functionName: "auth/signin",
			method: "POST",
			body: {
				phone: value?.phone,
				password: value?.password,
			},
		});
		if (error) {
			dispatch(setAuth({ status: "error" }));
			toast.error(error);
		} else {
			signIn({
				auth: {
					token: String(data?.jwt),
					type: "Bearer",
				},
				userState: {
					id: String(data?.id),
					phone: String(data?.phone),
					roles: data?.roles,
				},
			});

			rememberMeController();

			toast.success("Successfully logged in");
			dispatch(setAuth({ status: "initial" }));
			window.location.assign(window.location.origin);
		}
	};

	return {
		onSubmit,
	};
};
