// takeEvery will allow us to listen to certain actions and do something when
// they occur
import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder'
import { purchaseBurgerSaga, fetchOrderSaga } from './order'
import * as actionType from '../actions/actionTypes'

// Here i set listener that will execute logout saga whenever auth initiate runs
export function* watchAuth() {
    // Use all when you have multiple yields
    yield all([
            takeEvery(actionType.AUTH_INITIATE_LOGOUT, logoutSaga),
            takeEvery(actionType.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
            takeEvery(actionType.AUTH_USER, authUserSaga),
            takeEvery(actionType.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionType.INIT_INGREDIENTS, initIngredientsSaga)
}

export function* watchOrder() {
    // In case you have multiple request (multi click on button in short time) you might want to use latest request
    yield takeLatest(actionType.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionType.FETCH_ORDERS, fetchOrderSaga)
}