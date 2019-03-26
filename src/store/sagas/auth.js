// call allows you to call some function on some object
import { put, call, all } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import axios from "axios";

import * as actions from '../actions/index';

// * turns function into generator - functions that can be executed incrementally
export function* logoutSaga() {
    // Advantage of call is that it makes your generators testable
    // First argument is object, second is function and third parameters
    yield call([localStorage, 'removeItem'], 'token');
    // yield will wait for each step finish
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    // put will dispatch new action
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    // Here we will wait for expiration time to pass and than do logout
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

// Get info for sign up/in on https://firebase.google.com/docs/reference/rest/auth/#section-create-email-password
// Get your API key in Firebase/Authenticate/Web setup
export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    // Url for Sign up
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB-kZrVI5k3iWqRwWqHdTlM88OlxvbPloc';
    if (!action.isSignup) {
        // Url for Sign In
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB-kZrVI5k3iWqRwWqHdTlM88OlxvbPloc';
    }
    try {
        const response =  yield axios.post(url, authData);
        // We are setting time here to save in memory date when will token expire
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield all([
                 localStorage.setItem('token', response.data.idToken),
                 localStorage.setItem('expirationDate', expirationDate),
                 localStorage.setItem('userId', response.data.userId),
                 put(actions.authSucess(response.data.idToken, response.data.localId)),
                 put(actions.checkAuthTimeout(response.data.expiresIn))
        ])

    }
    catch(error) {
        yield put(actions.authFail(error.response.data.error))
    }
}

export function* authCheckStateSaga() {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            yield put(actions.logout())
        } else {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSucess(token, userId));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
        }
    }
}