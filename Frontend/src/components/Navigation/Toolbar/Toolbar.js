import React from 'react';
import classes from './Toolbar.css';
import NavItem from "../NavItem/NavItem";

const toolbar =()=>{

    const items=["Customer","Item","Place-Order","Orders"];

    const navItems=items.map((item,index)=>(
        <div key={index} className={classes.Item}>
            &nbsp;
            &nbsp;
            <NavItem link={"/"+item}>{"  "+item+"  "}</NavItem>
        </div>
    ))
    return(
        <div className={classes.Toolbar}>
            {navItems}
        </div>
    );
}

export default toolbar;