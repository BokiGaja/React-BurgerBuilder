import React from 'react';
import classes from './Input.css'

const input = props => {
    const inputClasses = [classes.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    let inputElement = null;
    switch (props.elementType) {
        case('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                defaultValue={props.value}
                onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement= <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                defaultValue={props.value}
                onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement= (
                <select
                    onChange={props.changed}
                    className={inputClasses.join(' ')}
                    defaultValue={props.value}>
                    { props.elementConfig.options.map(option => (
                        <option value={option.value} key={option.value}>
                            { option.displayValue }
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                defaultValue={props.value}/>
    }
    return (
        <div className={inputClasses.join(' ')}>
            <label className={classes.Label}>{props.label}</label>
            { inputElement }
        </div>
    )
};

export default input;