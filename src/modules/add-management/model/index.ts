enum ADD_MANAGEMENT {
  DATA_KEY = "ADD_MANAGEMENT",
  DATA_PARAMS = "ann-types/read",
  PAGE = "page",
  PAGE_SIZE = "page_size",
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

export type ADD_MANAGEMENT_FORM = {
  nameUz: string;
  nameEn: string;
  nameRu: string;
  pricePerDay: number;
  success?: boolean;
  message?: string;
};

export {
  ADD_MANAGEMENT,
  ADD_MANAGEMENT_CREATE_MODAL,
  ADD_MANAGEMENT_UPDATE_MODAL,
  ADD_MANAGEMENT_REMOVE_MODAL,
};
