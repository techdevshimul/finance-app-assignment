import * as actionTypes from "./actionTypes";

const initState = {
    accounts: [],
    categories: [],
    selectedAccount: null,
    selectedCategory: null,
    incomeandexpense: [],
    isAuth: false,
    token: null,
    userId: null
}

export const rootReducer = (state = initState, action) => {
    switch (action.type) {

        case actionTypes.SET_ACCOUNTS:
            return {
                ...state,
                accounts: action.payload
            }
        case actionTypes.SELECTED_ACCOUNT:
            return {
                ...state,
                selectedAccount: action.payload
            }
        case actionTypes.SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case actionTypes.SELECTED_CATEGORY:
            return {
                ...state,
                selectedCategory: action.payload
            }
        case actionTypes.INCOME_AND_EXPENSE:
            return {
                ...state,
                incomeandexpense: action.payload
            }
        case actionTypes.AUTHENTICATE_USER:
            return {
                ...state,
                isAuth: true,
                token: action.payload.token,
                userId: action.payload.userId
            }
        default:
            return state;
    }
}