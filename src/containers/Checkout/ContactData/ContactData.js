import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'
import classes from './ContactData.css';
import axios from '../../../axios-orders'

class ContactData extends Component {
    state = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: 'Boza'
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: ''
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP'
                    },
                    value: ''
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: ''
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Email'
                    },
                    value: ''
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'},
                        ]
                    },
                    value: ''
                },
        },
        loading: false
    };

    orderHandler = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,

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
                <Input elementType="..." elementConfig="..." value="..."/>
                <Input inputtype="input" type="email" name="email" placeholder="Your email"/>
                <Input inputtype="input" type="text" name="street" placeholder="Your street"/>
                <Input inputtype="input" type="text" name="postal" placeholder="Postal code"/>
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