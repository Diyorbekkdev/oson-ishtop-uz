import { TStatus, TTab } from "@/types";

enum ADD_MANAGEMENT {
	DATA_KEY = "ADD_MANAGEMENT",
	DATA_PARAMS = "ann-types/read",
	PAGE = "page",
	PAGE_SIZE = "page_size",
	SELECTED_DATA_KEY = "",
}

enum ADD_MANAGEMENT_CREATE_MODAL {
	PARAM = "ann-types/create",
}

enum ADD_MANAGEMENT_UPDATE_MODAL {
	PARAM = "ann-types/update",
}

enum ADD_MANAGEMENT_REMOVE_MODAL {
	PARAM = "ann-types/delete",
}

//############# DISCOUNT ENUMS #####################
enum DISCOUNT {
	DATA_KEY = "DISCOUNT",
	DATA_PARAMS = "ann-discounts/read",
	CREATE = "ann-discounts/create",
	UPDATE = "ann-discounts/update",
	REMOVE = "ann-discounts/delete",
}

enum PARAMS {
	ADD_TYPE_ID = "add",
}

enum TABS {
	KEY = "tabs/add-management",
}

type ADD__CONTENT = {
	name: string;
	id: number;
	createdDate: string;
	pricePerDay: number;
	nameUz: string;
	nameEn: string;
	nameRu: string;
};

export type ADD_DATA = {
	content: ADD__CONTENT[];
	pageable: {
		pageNumber: number;
		pageSize: number;
	};
	totalPages: number;
	totalElements: number;
	size: number;
	number: number;
};

export type DISCOUNT_CONTENT = {
	id: string;
	createdDate: string;
	fixedDay: number;
	discount: number;
	annTypesId: number;
};

export type DISCOUNT_DATA = {
	content: DISCOUNT_CONTENT[];
	pageable: {
		pageNumber: number;
		pageSize: number;
	};
	totalPages: number;
	totalElements: number;
	size: number;
	number: number;
};

export type ADD_MANAGEMENT_FORM = {
	nameUz: string;
	nameEn: string;
	nameRu: string;
	pricePerDay: number;
	success?: boolean;
	message?: string;
};

export type DISCOUNT_FORM = {
	fixedDay: number;
	discount: number;
};

export type ReduxInitialState = {
	tabs: TTab[];
};

export interface ITab {
	id: string;
	title?: string;
	status?: TStatus;
	info?: any;
}

export {
	ADD_MANAGEMENT,
	ADD_MANAGEMENT_CREATE_MODAL,
	ADD_MANAGEMENT_UPDATE_MODAL,
	ADD_MANAGEMENT_REMOVE_MODAL,
	DISCOUNT,
	PARAMS,
	TABS,
};
