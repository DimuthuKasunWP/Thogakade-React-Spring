import React from 'react';
import classes from './NavItem.css';
import Ext from "../../../hoc/Ext/Ext";
import {NavLink} from "react-router-dom";

const navItem=(props)=>(
    <Ext>
        <div className={classes.Nav}>
            <NavLink to={props.link} >{props.children}</NavLink>
        </div>
    </Ext>
);

export default navItem;