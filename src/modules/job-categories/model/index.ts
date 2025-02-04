enum JOB_CATEGORIES_MANAGEMENT {
	DATA_KEY = "JOB-CATEGORIES",
	DATA_PARAMS = "ann-job-categories-parent/read",
	PAGE = "page",
	PAGE_SIZE = "page_size",
	CREATE = "ann-job-categories/create-parent",
	UPDATE = "ann-job-categories/update-parent",
	REMOVE = "ann-job-categories/delete",
}

enum CHILD_CATEGORIES_MANAGEMENT {
	DATA_KEY = "REGION_AREAS",
	DATA_PARAMS = "ann-job-categories/read",
	CREATE = "ann-job-categories/create",
	UPDATE = "ann-job-categories/update",
	REMOVE = "ann-job-categories/delete",
}

enum PARAMS {
	CATEGORY_ID = "categoryId",
}

enum TABS {
	KEY = "tabs/job-categories",
}

type PARENT_CONTENT = {
	name: string;
	id: number;
	parentId: null;
	createdDate: string;
	nameUz: string;
	nameEn: string;
	nameRu: string;
};

export type PARENT_DATA = {
	content: PARENT_CONTENT[];
	pageable: {
		pageNumber: number;
		pageSize: number;
	};
	totalPages: number;
	totalElements: number;
	size: number;
	number: number;
};

type CHILD_CONTENT = {
	name: string;
	id: number;
	parentId: number;
	createdDate: string;
	nameUz: string;
	nameEn: string;
	nameRu: string;
};

export type CHILD_DATA = {
	content: CHILD_CONTENT[];
	pageable: {
		pageNumber: number;
		pageSize: number;
	};
	totalPages: number;
	totalElements: number;
	size: number;
	number: number;
};

export type PARENT_FORM = {
	nameUz: string;
	nameEn: string;
	nameRu: string;
	success?: boolean;
	message?: string;
};

export type CHILD_FORM = {
	nameUz: string;
	nameEn: string;
	nameRu: string;
	success?: boolean;
	message?: string;
};

export { JOB_CATEGORIES_MANAGEMENT, CHILD_CATEGORIES_MANAGEMENT, PARAMS, TABS };
