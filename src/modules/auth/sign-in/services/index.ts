import { BaseService, api } from "@/services/base";
import { SignInForm } from "../model";

export class AuthService {
	constructor(public api: BaseService) {}

	login = (data: SignInForm) => {
		return this?.api?.post<SignInForm, any>("/login", data);
	};

	log = () => {
		console.log("Log");
	};
}

export const authService = new AuthService(api);
