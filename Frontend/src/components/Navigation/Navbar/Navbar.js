import React,{Component} from 'react';
import Toolbar from "../Toolbar/Toolbar";
import classes from './Navbar.css';
import Logo from '../../Logo/Logo';
import ToggleButton from "../../ToggleButton/ToggleButton";

class Navbar extends Component{
    render(){
        return(
            <div className={classes.Navbar}>
                <Logo/>
                <ToggleButton/>
                <Toolbar />
            </div>
        )
    }
}

export default Navbar;