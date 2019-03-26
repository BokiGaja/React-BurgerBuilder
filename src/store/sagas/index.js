// takeEvery will allow us to listen to certain actions and do something when
// they occur
import { takeEvery } from 'redux-saga/effects';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';

import { initIngredientsSaga } from './burgerBuilder'
import * as actionType from '../actions/actionTypes'

// Here i set listener that will execute logout saga whenever auth initiate runs
export function* watchAuth() {
    yield takeEvery(actionType.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionType.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionType.AUTH_USER, authUserSaga);
    yield takeEvery(actionType.AUTH_CHECK_STATE, authCheckStateSaga)
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionType.INIT_INGREDIENTS, initIngredientsSaga)
}