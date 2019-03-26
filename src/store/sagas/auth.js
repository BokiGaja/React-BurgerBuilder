import { put } from 'redux-saga/effects'
import * as actionTypes from "../actions/actionTypes";

// * turns function into generator - functions that can be executed incrementally
function* logout(action) {
    // yield will wait for each step finish
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    // put will dispatch new action
    yield put(
        {
            type: actionTypes.AUTH_LOGOUT
        });
}