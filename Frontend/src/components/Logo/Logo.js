import React from 'react';
import classes from './Logo.css';
import Logo from '../../assets/logo.png';

const logo=()=>{
    return(
        <div className={classes.Logo}>
            <img src={Logo} alt="market-logo" />
        </div>
    )
}

export default logo;