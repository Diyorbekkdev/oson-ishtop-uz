enum REGION_MANAGEMENT {
	DATA_KEY = "ADD_REGIONS",
	DATA_PARAMS = "region/read",
	PAGE = "page",
	PAGE_SIZE = "page_size",
}

enum REGIONS_CREATE_MODAL {
	PARAM = "region/create",
}

enum REGIONS_UPDATE_MODAL {
	PARAM = "region/update",
}

enum REGIONS_REMOVE_MODAL {
	PARAM = "region/delete",
}

enum AREAS {
	DATA_KEY = "REGION_AREAS",
	DATA_PARAMS = "areas/read",
	CREATE = "areas/create",
	UPDATE = "areas/update",
	REMOVE = "areas/delete",
}

enum PARAMS {
	REGION_ID = "regionId",
}

enum TABS {
	KEY = "tabs/areas",
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

type CONTENT = {
	name: string;
	id: number;
	regionsId: number;
	nameUz: string;
	nameEn: string;
	nameRu: string;
};

export type AREAS_DATA = {
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

export type REGION_FORM = {
	nameUz: string;
	nameEn: string;
	nameRu: string;
	success?: boolean;
	message?: string;
};

export type AREAS_FORM = {
	nameUz: string;
	nameEn: string;
	nameRu: string;
};

export {
	REGION_MANAGEMENT,
	REGIONS_CREATE_MODAL,
	REGIONS_REMOVE_MODAL,
	REGIONS_UPDATE_MODAL,
	AREAS,
	PARAMS,
	TABS,
};
