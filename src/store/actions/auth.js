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
                dispatch(authSucess(res.data.idToken, res.data.localId));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error))
            })
    }
};