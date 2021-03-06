import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = props => (
    <div className={classes.BuildControls}>
        {/* toFixed will convert number to 2 decimals in our case */}
        <p>Current price: <strong>{props.price.toFixed(2)}$</strong></p>
        {controls.map(control => {
            return  <BuildControl
                        key={control.label}
                        label={control.label}
                        // Pass type to the children component
                        added={() => props.ingredientAdded(control.type)}
                        removed={() => props.ingredientRemoved(control.type)}
                        disabled={props.disabled[control.type]}
                    />
        })}
        <button
            className={classes.OrderButton}
            disabled={props.disabledOrder}
            onClick={props.ordered}
        >{props.isAuth? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
);

export default buildControls;