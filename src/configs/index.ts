const stage: keyof typeof configs = import.meta.env.NODE_ENV;

const configs = {
	development: {
		apiUrl: "http://localhost:8081",
	},
	production: {
		apiUrl: "http://localhost:8081",
	},
	test: {
		apiUrl: "http://localhost:8081",
	},
};

export const config = configs[stage];
