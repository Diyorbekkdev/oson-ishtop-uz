import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

type TUser = {
	id: string;
	role: "admin";
	delivery_time_from: string;
	delivery_time_till: string;
	rating: number;
	review_count: number;
	type: string;
	joinedAt: string;
	isActive: boolean;
	longitude: number;
	latitude: number;
	views: number;
	workers: string;
	workerpass: string;
	owner_fullname: string;
	user_metadata: {
		id: string;
		username: string;
		password: string;
		phone: string;
		img: string;
		fullname: string;
	};
};

export const useAuth = (): { user: TUser | null; isAuthicated: boolean } => {
	const user = useAuthUser() as TUser;
	return {
		user,
		isAuthicated: useAuthenticated(),
	};
};

type AuthEventProviderProps = {
	children: React.ReactNode;
};

const AuthEventProvider: React.FC<AuthEventProviderProps> = ({ children }) => {
	return children;
};

export default AuthEventProvider;
