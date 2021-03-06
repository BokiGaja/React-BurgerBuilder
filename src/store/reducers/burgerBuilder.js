import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../../shared/utility";

const initalState = {
    ingredients: null,
    totalPrice: 4,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName] : state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const removedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updatedIngredientsRemove = updateObject(state.ingredients, removedIngredient);
    const updatedStateRemove = {
        ingredients: updatedIngredientsRemove,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state, updatedStateRemove);
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        building: false
    });
};

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state,action);

        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);


        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);

        default: {
            return state;
        }
    }
};

export default reducer;