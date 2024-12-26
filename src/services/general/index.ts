import { useAuth } from "@/configs/auth";

type TGeneralService = {
	user_role: string;
};

export const useGeneralService = (): TGeneralService => {
	const { user } = useAuth();
	const user_role = String(user?.role);
	return {
		user_role,
	};
};
