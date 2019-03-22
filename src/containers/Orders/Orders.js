import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import { connect } from "react-redux";
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders();
    }

    isLoading = () => {
        let orders = <Spinner/>;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            ))
        }
        return orders;
    };

    render() {
        return this.isLoading();
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);