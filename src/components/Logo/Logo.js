import React from 'react';
// You need to import image to use it, not using src in img
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css'

const logo = props => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="MyBurger"/>
    </div>
);

export default logo;