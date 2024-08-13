export const ACTION_TYPES = {
    SET_LOADING: "SET_LOADING",
    CATEGORIES: "CATEGORIES",
    SET_ERROR: "SET_ERROR",
    SET_MODAL_STATE: "SET_MODAL_STATE",
    SET_ADD: "SET_ADD",
    SET_CATADD_LOADING: "SET_CATADD_LOADING",
    SET_CATEGORY_NAME: "SET_CATEGORY_NAME",
};

export const initialState = {
    loading: false,
    modalState: false,
    add: false,
    catAddLoading: false,
    error: "",
    categories: [],
    categoryName: "",
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
        default:
            return state;
    }
}