export const ACTION_TYPES = {
    SET_LOADING: "SET_LOADING",
    CATEGORIES: "CATEGORIES",
    SET_ERROR: "SET_ERROR",
    SET_MODAL_STATE: "SET_MODAL_STATE",
    SET_ADD: "SET_ADD",
    SET_CATADD_LOADING: "SET_CATADD_LOADING",
    SET_CATEGORY_NAME: "SET_CATEGORY_NAME",
    SET_SUB_CATEGORY_NAME: "SET_SUB_CATEGORY_NAME",
    SET_SUB_ADD: "SET_SUB_ADD",
    SET_SUB_LOADING: "SET_SUB_LOADING",
    SET_SUB_MODAL_STATE: "SET_SUB_MODAL_STATE",
    SET_SUB_ERROR: "SET_SUB_ERROR",
    SET_SUB_CATEGORIES: "SET_SUB_CATEGORIES",
    SET_CAT_ID: "SET_CAT_ID",
};

export const initialState = {
    loading: false,
    modalState: false,
    add: true,
    catAddLoading: false,
    error: "",
    categories: [],
    categoryName: "",
    subCategories: [],
    subCategoryName: "",
    catId: "",
    subAdd: true,
    subLoading: false,
    subModalState: false,
    subError: "",
};

export function reducer(state, action) {
    switch (action.type) {
        case ACTION_TYPES.SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case ACTION_TYPES.CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };
        case ACTION_TYPES.SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case ACTION_TYPES.SET_MODAL_STATE:
            return {
                ...state,
                modalState: action.payload,
            };
        case ACTION_TYPES.SET_ADD:
            return {
                ...state,
                add: action.payload,
            };
        case ACTION_TYPES.SET_CATADD_LOADING:
            return {
                ...state,
                catAddLoading: action.payload,
            };
        case ACTION_TYPES.SET_CATEGORY_NAME:
            return {
                ...state,
                categoryName: action.payload,
            };
        case ACTION_TYPES.SET_SUB_CATEGORY_NAME:
            return {
                ...state,
                subCategoryName: action.payload,
            };
        case ACTION_TYPES.SET_SUB_ADD:
            return {
                ...state,
                subAdd: action.payload,
            };
        case ACTION_TYPES.SET_SUB_LOADING:
            return {
                ...state,
                subLoading: action.payload,
            };
        case ACTION_TYPES.SET_SUB_MODAL_STATE:
            return {
                ...state,
                subModalState: action.payload,
            };
        case ACTION_TYPES.SET_SUB_ERROR:
            return {
                ...state,
                subError: action.payload,
            };
        case ACTION_TYPES.SET_SUB_CATEGORIES:
            return {
                ...state,
                subCategories: action.payload,
            };
        case ACTION_TYPES.SET_CAT_ID:
            return {
                ...state,
                catId: action.payload,
            };
        default:
            return state;
    }
}