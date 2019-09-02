import React,{Component} from 'react';
import classes from './Backdrop.css';

class Backdrop extends Component{
    render(){
        return(
            <div className={this.props.show?classes.Backdrop:classes.Close}></div>
        );
    }
}

export default Backdrop;