import {
	useLocation,
	useSearchParams as useRouterSearchParams,
} from "react-router-dom";

type ISearchParams = {
	getAllParams: () => {
		keys: string[];
		pair: { [key: string]: string };
		values: string[];
	};
	removeParamsByKey: ({ keys }: { keys: string[] }) => void;
	setParams: (params: { [key: string]: string }) => void;
	getParams: (params: string) => string | null;
	clearParams: () => void;
};

export const useSearchParams = (): ISearchParams => {
	const { search } = useLocation();
	const [get, set] = useRouterSearchParams();

	const params = new URLSearchParams(search);

	const getAllParams = (): {
		keys: string[];
		values: string[];
		pair: { [key: string]: string };
	} => {
		return {
			keys: Array.from(params.keys()),
			values: Array.from(params.values()),
			pair: Object.fromEntries(Array.from(params.entries())),
		};
	};

	const removeParamsByKey = ({ keys }: { keys: string[] }) => {
		const { pair } = getAllParams();

		for (const key of keys) delete pair[key];

		set({ ...pair });
	};

	const setParams = (params: { [key: string]: string }) => {
		const { pair } = getAllParams();
		set({ ...pair, ...params });
	};

	const clearParams = () => set({});

	const getParams = (params: string) => get.get(params);

	return {
		getAllParams,
		removeParamsByKey,
		setParams,
		getParams,
		clearParams,
	};
};
