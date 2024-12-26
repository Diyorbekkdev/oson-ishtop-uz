enum JOB_TYPE_CONTROL {
	DATA_KEY = "JOB_TYPE_CONTROL",
	DATA_PARAMS = "ann-job-types/read",
	PAGE = "page",
	PAGE_SIZE = "page_size",
}

enum JOB_TYPE_CONTROL_CREATE_MODAL {
	PARAM = "ann-job-types/create",
}

enum JOB_TYPE_CONTROL_UPDATE_MODAL {
	PARAM = "ann-job-types/update",
}

enum JOB_TYPE_CONTROL_REMOVE_MODAL {
	PARAM = "ann-job-types/delete",
}

type CONTENT = {
	name: string;
	id: number;
	createdDate: string;
	updatedDate: string;
	nameUz: string;
	nameEn: string;
	nameRu: string;
	isThereTrialPeriod: boolean;
};

export type JOB_TYPE_CONTROL_DATA = {
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

export type JOB_TYPE_CONTROL_FORM = {
	nameUz: string;
	nameEn: string;
	nameRu: string;
	isThereTrialPeriod: boolean;
	success?: boolean;
	message?: string;
};

export {
	JOB_TYPE_CONTROL,
	JOB_TYPE_CONTROL_CREATE_MODAL,
	JOB_TYPE_CONTROL_REMOVE_MODAL,
	JOB_TYPE_CONTROL_UPDATE_MODAL,
};
