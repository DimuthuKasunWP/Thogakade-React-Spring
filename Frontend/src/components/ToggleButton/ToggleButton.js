import React,{Component} from 'react';
import classes from './ToggleButton.css';
import {connect} from "react-redux";
import * as actionCreators from '../../store/actions/index';

class Hambuger extends Component{
    render(){
        console.log(this.props.isDrawerOpen)
        return(
            <div>
                <div className={this.props.isDrawerOpen?classes.hamburger:classes.hamburgerClose} onClick={this.props.isDrawerOpen?()=>this.props.drawerOnClose():()=>this.props.drawerOnOpen()}>
                    <div className={classes["hamburger-box"]}>
                        <div className={classes["hamburger-inner"]}></div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        isDrawerOpen:state.navbarRed.open
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        drawerOnOpen:()=>dispatch(actionCreators.openDrawer()),
        drawerOnClose:()=>dispatch(actionCreators.closeDrawer())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Hambuger);