enum USER_MANAGEMENT {
	DATA_KEY = "ADMIN_USERS",
	DATA_PARAMS = "admin/users",
	PAGE = "page",
	PAGE_SIZE = "page_size",
}

enum RESOURCE_PARAM {
	URL = import.meta.env.VITE_RESOURCE_URL,
	FALLBACK_URL = "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
}

enum USER_UPDATE_MODAL {
	PARAM = "admin/users",
}

enum USER_REMOVE_MODAL {
	PARAM = "admin/users",
}

enum PARAMS {
	USER_ID = "userId",
}

enum TABS {
	KEY = "tabs/users",
}

export type CONTENT = {
	id: string;
	language: string;
	createdDate: null;
	fio: string;
	birthDate: string;
	gender: boolean;
	phone: string;
	lat: null;
	lon: null;
	avatarResourcesId: string | null;
	balance: number;
	updatedDate: string;
	isEnabled: boolean;
	resumeResourcesId: string | null;
};

export type DATA = {
	content: CONTENT[];
	pageable: {
		pageNumber: number;
		pageSize: number;
	};
	totalPages: number;
	totalElements: number;
	size: number;
	number: number;
};

export type USER_FORM = {
	fio: string;
	birthDate: string;
	gender: boolean;
	avatarResourcesId?: string;
	success?: boolean;
	message?: string;
};

export type AREAS_FORM = {
	nameUz: string;
	nameEn: string;
	nameRu: string;
};

export {
	RESOURCE_PARAM,
	USER_MANAGEMENT,
	PARAMS,
	TABS,
	USER_REMOVE_MODAL,
	USER_UPDATE_MODAL,
};
