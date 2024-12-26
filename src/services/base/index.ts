import { config } from "@/configs";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

export type BaseServiceOptions = {
	baseURL?: string;
	headers?: Record<string, string>;
};

export type FetchJsonOptions = {
	parseResponse?: boolean;
} & AxiosRequestConfig;

export class FetchError extends Error {
	status: number;
	response: any;

	constructor(error: AxiosError) {
		super(error.message);
		this.status = error.response?.status || 0;
		this.response = error.response?.data;
	}
}

export class BaseService {
	private _axios: AxiosInstance;

	constructor(options: BaseServiceOptions) {
		this._axios = axios.create({
			baseURL: options.baseURL ?? "",
			headers: options.headers || {
				"Content-Type": "application/json",
			},
		});
	}

	private _fetchJSON = async (
		endpoint: string,
		options: FetchJsonOptions = {},
	) => {
		try {
			const response = await this._axios.request({
				url: endpoint,
				...options,
			});

			if (options.parseResponse === false || response.status === 204) {
				return undefined;
			}

			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw new FetchError(error);
			}
			throw error;
		}
	};

	setBasicAuth = (token: string): this => {
		this._axios.defaults.headers.Authorization = `${token}`;
		return this;
	};

	setHeader = (key: string, value: string): this => {
		this._axios.defaults.headers[key] = value;
		return this;
	};

	get = <T>(endpoint: string, options: AxiosRequestConfig = {}): Promise<T> => {
		return this._fetchJSON(endpoint, {
			...options,
			method: "GET",
		});
	};

	post = <Request, Response>(
		endpoint: string,
		body?: Request,
		options: AxiosRequestConfig = {},
	): Promise<Response> => {
		const isFormData = body instanceof FormData;
		return this._fetchJSON(endpoint, {
			...options,
			data: isFormData ? body : JSON.stringify(body),
			method: "POST",
		});
	};

	patch = <T>(
		endpoint: string,
		body?: BodyInit,
		options: AxiosRequestConfig = {},
	): Promise<T> => {
		const isFormData = body instanceof FormData;
		return this._fetchJSON(endpoint, {
			...options,
			data: isFormData ? body : JSON.stringify(body),
			method: "PATCH",
		});
	};

	put = <Request, Response>(
		endpoint: string,
		body?: Request,
		options: AxiosRequestConfig = {},
	): Promise<Response> => {
		const isFormData = body instanceof FormData;
		return this._fetchJSON(endpoint, {
			...options,
			data: isFormData ? body : JSON.stringify(body),
			method: "PUT",
		});
	};

	delete = <Request, Response = void>(
		endpoint: string,
		body?: Request,
		options: AxiosRequestConfig = {},
	): Promise<Response> => {
		const isFormData = body instanceof FormData;
		return this._fetchJSON(endpoint, {
			...options,
			data: isFormData ? body : JSON.stringify(body),
			method: "DELETE",
		});
	};
}

export const api = new BaseService({
	baseURL: `${config?.apiUrl}/api/v1`,
});
