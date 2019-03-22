import React, { Component } from 'react'
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from "react-redux";
import * as burgerBuilderActions from '../../store/actions/index'


class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    isOrderAvailable = () => {
        let disabledOrder = true;
        for (let key in this.props.ings) {
            if (this.props.ings[key] > 0) {
                disabledOrder = false;
            }
        }
        return disabledOrder;
    };

    isInfoDisabled = () => {
        const disabledInfo = {
            ...this.props.ings
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
        this.props.history.push('/checkout');
    };

    isLoading = () => {
        let orderSummary = null;
        if (this.props.ings)  {
             orderSummary = <OrderSummary
                                ingredients={this.props.ings}
                                purchaseCanceled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler}
                                price={this.props.price}
                            />;
        }

        return orderSummary;
    };

    loadIngredients = () => {
        let burger = <Spinner/>;
        if (this.props.ings) {
            burger =
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={this.isInfoDisabled()}
                        price={this.props.price}
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngridients())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);