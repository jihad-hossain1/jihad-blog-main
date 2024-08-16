export const ACTION_TYPES = {
    SET_LOADING: "SET_LOADING",
    SET_ERROR: "SET_ERROR",
    SET_BLOGS: "SET_BLOGS",
    SET_PAGE: "SET_PAGE",
    SET_PAGE_SIZE: "SET_PAGE_SIZE",
    SET_LIMIT: "SET_LIMIT",
    SET_SEARCH_TERM: "SET_SEARCH_TERM",
    SET_IS_ADD: "SET_IS_ADD",
};

export const initialState = {
    loading: false,
    error: null,
    blogs: [],
    page: 1,
    pageSize: 10,
    limit: 10,
    searchTerm: "",
    isAdd: true,
};

export const reducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case ACTION_TYPES.SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case ACTION_TYPES.SET_BLOGS:
            return {
                ...state,
                blogs: action.payload,
            };
        case ACTION_TYPES.SET_PAGE:
            return {
                ...state,
                page: action.payload,
            };
        case ACTION_TYPES.SET_PAGE_SIZE:
            return {
                ...state,
                pageSize: action.payload,
            };
        case ACTION_TYPES.SET_LIMIT:
            return {
                ...state,
                limit: action.payload,
            };
        case ACTION_TYPES.SET_SEARCH_TERM:
            return {
                ...state,
                searchTerm: action.payload,
            };
        case ACTION_TYPES.SET_IS_ADD:
            return {
                ...state,
                isAdd: action.payload,
            };
        default:
            return state;
    }
};

