import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';

import * as actions from '../actions/index';

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
    yield delay(action.expirationTime);
    yield put(actions.logout());
}