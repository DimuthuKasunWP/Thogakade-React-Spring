import React,{Component} from 'react';
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Button from "@material-ui/core/Button/Button";
import Slide from "@material-ui/core/Slide/Slide";
import classes from './Loader.css';
import correct from '../../assets/correct.png';
import wrong from '../../assets/error.png';
import {connect} from "react-redux";
import * as actionCreators from '../../store/actions/index';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Loader extends Component{

    handleClose=()=>{
        this.props.close();
    }

    render(){

        const spin=<div className={classes.loader}>Loading...</div>;

        const done=<div className={classes.success}>
            <img className="animated bounceIn" src={correct} />
            <h5  className="animated fadeIn">Success!</h5>
            <Button onClick={this.handleClose} color="primary">
            Close
            </Button>
        </div>

        const error=<div className={classes.error}>
            <img className="animated bounceIn" src={wrong} />
            <h5  className="animated fadeIn">Error!</h5>
            <Button onClick={this.handleClose} color="primary">
                Close
            </Button>
        </div>

        return(
            <Dialog
                open={this.props.openLoader}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                classes={{paper:classes.paper}}
            >

                <DialogContent>

                    {this.props.loadLoader?spin:this.props.doneLoader?done:error}


                </DialogContent>

            </Dialog>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        openLoader:state.loaderRed.open,
        closeLoader:state.loaderRed.close,
        errorLoader:state.loaderRed.error,
        doneLoader:state.loaderRed.done,
        loadLoader:state.loaderRed.load,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        open:()=>dispatch(actionCreators.loaderOpen()),
        close:()=>dispatch(actionCreators.loaderClose()),
        load:()=>dispatch(actionCreators.loaderLoad()),
        done:()=>dispatch(actionCreators.loaderDone()),
        error:()=>dispatch(actionCreators.loaderError()),

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Loader);