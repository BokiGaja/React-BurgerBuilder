import React, { Component } from 'react'
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
      ingredients: {
          salad: 0,
          bacon: 0,
          cheese: 0,
          meat: 0
      },
      totalPrice: 4
    };

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
    };

    removeIngredientHandler = type => {
        const updatedCount = this.state.ingredients[type] - 1;
        const updatedIngredients = {...this.state.ingredients};
        if (updatedIngredients[type] > 0) {
            updatedIngredients[type] = updatedCount;
        }
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENT_PRICES[type];
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
    };

    isOrderAvailable = () => {
        let disabledOrder = true;
        for (let key in this.state.ingredients) {
            if (this.state.ingredients[key] > 0) {
                disabledOrder = false;
            }
        }
        return disabledOrder;
    };

    isInfoDisabled = () => {
        const disabledInfo = {
            ...this.state.ingredients
        };
        // Here result will be: {salad: true, meat: false...}
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return disabledInfo;
    };

    render() {
        return (
            <Aux>
                <Modal>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={this.isInfoDisabled()}
                    price={this.state.totalPrice}
                    disabledOrder={this.isOrderAvailable()}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;