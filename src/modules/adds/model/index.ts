enum ADDS_MANAGEMENT {
	DATA_KEY = "ADMIN__ADDS",
	DATA_PARAMS = "admin/ann",
	PAGE = "page",
	PAGE_SIZE = "page_size",
	SELECTED_DATA_KEY = "ADMIN__ADD",
	SELECTED_DATA_PARAMS = "ann/get-by-id",
}

enum RESOURCE_PARAM {
	URL = import.meta.env.VITE_RESOURCE_URL,
	FALLBACK_URL = "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
}

enum PARAMS {
	ADD_ID = "add_id",
	STATUS = "status",
	WAITING = "WAITING",
	DRAFT = "DRAFT",
	ALL = "ALL",
	ACCEPTED = "ACCEPTED",
	REJECTED = "REJECTED",
	ARCHIVE = "ARCHIVE",
	TAB = "tab",
}

enum ADD_STATUS_PARAMS {
	REJECTED = "ann/reject",
	ACCEPTED = "ann/accept",
}

type TStatus = "WAITING" | "ACCEPTED" | "REJECTED" | "ARCHIVE" | "DRAFT";
const statusMap: Record<TStatus, { color: string; label: string }> = {
	WAITING: { color: "warning", label: "WAITING" },
	ACCEPTED: { color: "success", label: "ACCEPTED" },
	ARCHIVE: { color: "warning", label: "ARCHIVE" },
	REJECTED: { color: "danger", label: "REJECTED" },
	DRAFT: { color: "warning", label: "DRAFT" },
};

const generateStatus = (status: TStatus) =>
	statusMap[status] || { color: "default", label: "UNKNOWN" };

enum TABS {
	KEY = "tabs/add",
}

export type CONTENT = {
	resources: Array<{
		resourcesId: string;
		ordering: number;
	}>;
	id: string;
	description: string;
	status: TStatus;
	gender: string;
	lat: number;
	lon: number;
	code: number;
	viewCnt: number;
	isThereTrialPeriod: boolean;
	company: string;
	jobName: string;
	peopleCnt: number;
	salaryFrom: number;
	salaryTo: number;
	trialPeriod: number;
	studentIsNeeded: number;
	annContacts: Array<{
		name: string;
		id: string;
		tgUsername: string;
		numbers: string[];
	}>;
	phoneCnt: 0;
	expiredDate: string;
	rejectedDescription: string | null;
	jobTypesName: string | null;
	trialPeriodType: string;
	jobCategories: {
		children: Array<{
			id: string;
			name: string;
			createdDate: string;
		}>;
		parents: {
			id: string;
			name: string;
			createdDate: string;
		};
	};
	success?: boolean;
	message?: string;
	info?: boolean;
	workSchedule: string;
	workTimeStart: string;
	workTimeEnd: string;
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

export type REJECT_FORM = {
	description: string;
};

export type AREAS_FORM = {
	nameUz: string;
	nameEn: string;
	nameRu: string;
};

export {
	RESOURCE_PARAM,
	ADDS_MANAGEMENT,
	PARAMS,
	TABS,
	generateStatus,
	ADD_STATUS_PARAMS,
};
