// takeEvery will allow us to listen to certain actions and do something when
// they occur
import { takeEvery } from 'redux-saga/effects';
import { logoutSaga } from './auth';
import * as actionType from '../actions/actionTypes'

// Here i set listener that will execute logout saga whenever auth initiate runs
export function* watchAuth() {
    yield takeEvery(actionType.AUTH_INITIATE_LOGOUT, logoutSaga);
}