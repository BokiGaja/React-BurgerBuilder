import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css';
import axios from '../../../axios-orders'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.props.price,
            customer: {
                name: 'Boza',
                address: {
                    street: 'V.D.134',
                    zipCode: '1234',
                    country: 'Serbia'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };
        // I set Timeout here just to see Spinner
        setTimeout(() => {
            axios.post('/orders.json', order)
                .then(response => {
                    this.setState({ loading: false });
                    this.props.history.push('/');
                })
                .catch(error => {
                    this.setState({ loading: false })
                })
        }, 2000)
    };

    currentForm() {
        let form = (
            <form action="">
                <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
                <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
                <input className={classes.Input} type="text" name="street" placeholder="Your street"/>
                <input className={classes.Input} type="text" name="postal" placeholder="Postal code"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner
            />
        }
        return form;
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {this.currentForm()}
            </div>
        )
    }
}

export default ContactData;