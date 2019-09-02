import React,{Component} from 'react';
import classes from './Sidebar.css';
import NavItem from "../NavItem/NavItem";
import {connect} from "react-redux";
import * as actionCreators from "../../../store/actions";

class Sidebar extends Component{

    render(){
        const items=["Customer","Item","Place-Order","Orders"];

        const navItems=items.map((item,index)=>(
            <div onClick={()=>this.props.drawerOnClose()} key={index} className={classes.Item}>
                &nbsp;
                &nbsp;
                <NavItem link={"/"+item}>{"  "+item+"  "}</NavItem>
            </div>
        ))
        return(
            <div className={classes.Sidebar}>
                {navItems}
            </div>
        );
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        drawerOnClose:()=>dispatch(actionCreators.closeDrawer())
    }
}

export default connect(null,mapDispatchToProps)(Sidebar);