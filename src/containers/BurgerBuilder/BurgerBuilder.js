import React, { Component } from 'react'
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasing: false,
        loading: false
    };

    componentDidMount() {
        axios.get('https://burger-builder-93.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
    }

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

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        // this.setState({ loading: true });
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Boza',
        //         address: {
        //             street: 'V.D.134',
        //             zipCode: '1234',
        //             country: 'Serbia'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // };
        // // I set Timeout here just to see Spinner
        // setTimeout(() => {
        //     axios.post('/orders.json', order)
        //         .then(response => {
        //             this.setState({ loading: false, purchasing: false })
        //         })
        //         .catch(error => {
        //             this.setState({ loading: false, purchasing: false })
        //         })
        // }, 2000)
        const queryParams = [];
        for (let i in this.state.ingredients) {
            // Encode component so it can be used in URL
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    };

    isLoading = () => {
        let orderSummary = null;
        if (this.state.ingredients)  {
             orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice}
            />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>
        }
        return orderSummary;
    };

    loadIngredients = () => {
        let burger = <Spinner/>;
        if (this.state.ingredients) {
            burger =
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={this.isInfoDisabled()}
                        price={this.state.totalPrice}
                        disabledOrder={this.isOrderAvailable()}
                        ordered={this.purchaseHandler}
                    />
                </Aux>;
        }
        return burger;
    };

    render() {
        return (
            <Aux>
                {/* Only if purchasing is true this Modal should be visible*/}
                {/* We can control will OrderSummary render through Modal component hooks */}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {this.isLoading()}
                </Modal>
                {this.loadIngredients()}
            </Aux>
        );
    }
}

export default BurgerBuilder;