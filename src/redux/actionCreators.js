import { navigate } from "../Components/NavigationRoot";
import * as actionTypes from "./actionTypes";
import { url } from "./database";

export const addAccount = account => (dispatch, getState) => {
    let token = getState().token;
    let userId = getState().userId;
    fetch(url + "/" + userId + ".json?auth=" + token, {
        method: "POST",
        body: JSON.stringify(account)
    })
        .catch(error => console.log(error))
        .then(response => response.json())
        .then(data => {
            console.log(data);
            dispatch(loadAccounts());
        })
}

export const addCategory = category => (dispatch, getState) => {
    let token = getState().token;
    let userId = getState().userId;
    let selectedAccount = getState().selectedAccount;
    fetch(url + "/" + userId + "/" + selectedAccount.key + "/categories" + ".json?auth=" + token, {
        method: "POST",
        body: JSON.stringify(category)
    })
        .catch(error => console.log(error))
        .then(response => response.json())
        .then(data => {
            console.log(data);
            dispatch(loadCategories());
        })
}

export const addIncomeAndExpense = incomeAndExpense => (dispatch, getState) => {
    let token = getState().token;
    let selectedAccount = getState().selectedAccount;
    let selectedCategory = getState().selectedCategory;
    let userId = getState().userId;
    fetch(url + "/" + userId + "/" + selectedAccount.key + "/categories/" + selectedCategory.key + "/inc-exp" + ".json?auth=" + token, {
        method: "POST",
        body: JSON.stringify(incomeAndExpense)
    })
        .catch(error => console.log(error))
        .then(response => response.json())
        .then(data => console.log(data))
}

export const setAccounts = accounts => {
    return {
        type: actionTypes.SET_ACCOUNTS,
        payload: accounts
    }
}

export const setIncExp = inc_exp => {
    return {
        type: actionTypes.INCOME_AND_EXPENSE,
        payload: inc_exp
    }
}

export const setCategories = categories => {
    return {
        type: actionTypes.SET_CATEGORIES,
        payload: categories
    }
}

export const selectedAccount = account => {
    return {
        type: actionTypes.SELECTED_ACCOUNT,
        payload: account
    }
}

export const selectedCategoryFunc = category => {
    return {
        type: actionTypes.SELECTED_CATEGORY,
        payload: category
    }
}

export const loadAccounts = () => (dispatch, getState) => {
    let token = getState().token;
    let userId = getState().userId;
    fetch(url + "/" + userId + ".json?auth=" + token)
        .catch(err => {
            alert("Something Went Wrong!");
            console.log(err);
        })
        .then(res => res.json())
        .then(data => {
            const accounts = [];
            for (let key in data) {
                accounts.push({
                    ...data[key],
                    key: key
                })
            }
            dispatch(setAccounts(accounts));
        });
}

export const loadIncomeAndExpense = () => (dispatch, getState) => {
    let token = getState().token;
    let selectedAccount = getState().selectedAccount;
    let selectedCategory = getState().selectedCategory;
    let userId = getState().userId;
    fetch(url + "/" + userId + "/" + selectedAccount.key + "/categories/" + selectedCategory.key + "/inc-exp" + ".json?auth=" + token)
        .catch(err => {
            alert("Something Went Wrong!");
            console.log(err);
        })
        .then(res => res.json())
        .then(data => {
            const inc_exp = [];
            for (let key in data) {
                inc_exp.push({
                    ...data[key],
                    key: key
                })
            }
            dispatch(setIncExp(inc_exp));
        });
}

export const loadCategories = () => (dispatch, getState) => {
    let token = getState().token;
    let userId = getState().userId;
    let selectedAccount = getState().selectedAccount;
    fetch(url + "/" + userId + "/" + selectedAccount.key + "/categories" + ".json?auth=" + token)
        .catch(err => {
            alert("Something Went Wrong!");
            console.log(err);
        })
        .then(res => res.json())
        .then(data => {
            const categories = [];
            for (let key in data) {
                categories.push({
                    ...data[key],
                    key: key
                })
            }
            console.log(data)
            dispatch(setCategories(categories));
        });
}

export const authUser = userData => {
    return {
        type: actionTypes.AUTHENTICATE_USER,
        payload: userData
    }
}

export const tryAuth = (email, password, mode) => dispatch => {
    let url = "";
    const API_KEY = "AIzaSyAwJB9WQ0QePrKMASt0ilIaQwKbKKcs50Q";
    if (mode === "signup") {
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
    } else if (mode === "login") {
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    }
    fetch(url + API_KEY,
        {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }

        })
        .catch(err => {
            console.log(err);
            alert("Authentication Failed!");
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(data.error.message)
            } else {
                dispatch(authUser({ token: data.idToken, userId: data.localId }));
                navigate("Home");
            }
        })
}