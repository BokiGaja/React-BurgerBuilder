import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSucess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
};


export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime*1000)
    }
};
// Get info for sign up/in on https://firebase.google.com/docs/reference/rest/auth/#section-create-email-password
// Get your API key in Firebase/Authenticate/Web setup
export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        // Url for Sign up
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB-kZrVI5k3iWqRwWqHdTlM88OlxvbPloc';
        if (!isSignup) {
            // Url for Sign In
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB-kZrVI5k3iWqRwWqHdTlM88OlxvbPloc';
        }
        axios.post(url, authData)
            .then(res => {
                console.log(res);
                // We are setting time here to save in memory date when will token expire
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDatfe', expirationDate);
                localStorage.setItem('userId', res.data.userId);
                dispatch(authSucess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error))
            })
    }
};

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSucess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
            }
        }
    }
};