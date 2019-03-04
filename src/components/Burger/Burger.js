import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = props => {
    // Turn object into array
    let transformedIngredients = Object.keys(props.ingredients).map(ingredientKey => {
        // Here Array will create new array with length in ()
        // We will return here array that has length defined in ingredients in parent
        return [...Array(props.ingredients[ingredientKey])].map( (el, index) => {
            return <BurgerIngredient type={ ingredientKey } key={ ingredientKey + index }/>
        })
    //    This function will transform our ingredients array to array of lengths of ingredients
    }).reduce((arr,el) => {
       return arr.concat(el);
    },[]);

    if (transformedIngredients.length === 0) {
       transformedIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            { transformedIngredients }
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;