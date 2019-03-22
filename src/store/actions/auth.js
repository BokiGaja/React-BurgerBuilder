import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSucess = authData => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
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
export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB-kZrVI5k3iWqRwWqHdTlM88OlxvbPloc', authData)
            .then(res => {
                console.log(res);
                dispatch(authSucess(res));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err))
            })
    }
};