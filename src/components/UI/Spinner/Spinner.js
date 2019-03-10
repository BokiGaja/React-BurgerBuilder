// We found this spinners css on https://projects.lukehaas.me/css-loaders/
import React from 'react';
import classes from './Spinner.css'

const spinner = () => (
    <div className={classes.Loader}>Loading...</div>
);

export default spinner;