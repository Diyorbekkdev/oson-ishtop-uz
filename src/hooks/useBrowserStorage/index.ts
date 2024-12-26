import cookieAccess from "js-cookie";

type ValueTypes = string | number | any[] | object;

type StorageMethod = {
	set: (values: { [key: string]: ValueTypes }) => void;
	get: <T>(key: string) => T | null;
	clear: () => void;
	remove: (key: string) => void;
};

type BrowserStorage = {
	local: StorageMethod;
	cookie: StorageMethod;
	session: StorageMethod;
};

export const useBrowserStorage = (): BrowserStorage => {
	const local: StorageMethod = {
		set: (values: { [key: string]: ValueTypes }) => {
			for (const key in values)
				if (values.hasOwnProperty(key))
					window.localStorage.setItem(key, JSON.stringify(values[key]));
		},
		get: <T>(key: string): T | null => {
			const item = window.localStorage.getItem(key);
			return item ? (JSON.parse(item) as T) : null;
		},
		remove: (key: string) => window.localStorage.removeItem(key),
		clear: () => window.localStorage.clear(),
	};

	const session: StorageMethod = {
		set: (values: {
			[key: string]: ValueTypes;
		}) => {
			for (const key in values)
				if (values.hasOwnProperty(key))
					window.sessionStorage.setItem(key, JSON.stringify(values[key]));
		},
		get: <T>(key: string): T | null => {
			const item = window.sessionStorage.getItem(key);
			return item ? (JSON.parse(item) as T) : null;
		},
		remove: (key: string) => window.sessionStorage.removeItem(key),
		clear: () => window.sessionStorage.clear(),
	};

	const cookie: StorageMethod = {
		set: (values: {
			[key: string]: ValueTypes;
		}) => {
			for (const key in values)
				if (values.hasOwnProperty(key))
					cookieAccess.set(key, JSON.stringify(values[key]));
		},
		get: <T>(key: string): T | null => {
			const item = cookieAccess.get(key);
			return item ? (JSON.parse(item) as T) : null;
		},
		remove: (key: string) => cookieAccess.remove(key),
		clear: () => {
			const cookies = cookieAccess.get();
			for (const key in cookies)
				if (cookies.hasOwnProperty(key)) cookieAccess.remove(key);
		},
	};

	return {
		local,
		cookie,
		session,
	};
};
