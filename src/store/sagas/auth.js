import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import axios from "axios";

import * as actions from '../actions/index';
import {authFail, authStart, authSucess, checkAuthTimeout} from "../actions/auth";

// * turns function into generator - functions that can be executed incrementally
export function* logoutSaga() {
    // yield will wait for each step finish
    yield localStorage.removeItem('token');
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
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.userId);
        yield put(actions.authSucess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    }
    catch(error) {
        yield put(actions.authFail(error.response.data.error))
    }
}