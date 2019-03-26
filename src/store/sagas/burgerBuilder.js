import axios from "../../axios-orders";
import { put } from 'redux-saga/effects';

import * as actions from '../../store/actions/index'

export function* initIngredientsSaga() {
    try{
        const response = yield axios.get('https://burger-builder-93.firebaseio.com/ingredients.json');
        yield put(actions.setIngredients(response.data))
    }
    catch(error){
            console.log(error);
        }
}