import React,{Component} from 'react';
import classes from './SideDrawer.css';
import Sidebar from "../Sidebar/Sidebar";
import {connect} from "react-redux";

class SideDrawer extends Component{

    render(){
        console.log("side drawer "+this.props.drawerIsOpen)
        return(
            <div className={this.props.drawerIsOpen?classes.Open:classes.Close}>
                <Sidebar />
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        drawerIsOpen:state.navbarRed.open
    }
}

export default connect(mapStateToProps,null)(SideDrawer);