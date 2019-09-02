import React, { Component } from 'react';
import Backdrop from "./components/Backdrop/Backdrop";
import {connect} from "react-redux";
import Navigation from "./components/Navigation/Navigation";
import {Route, Switch, withRouter} from "react-router-dom";
import Async from 'react-code-splitting'
import classes from './App.css';
import Loader from "./components/Loader/Loader";

const CustomerForm = () => <Async load={import('./containers/CustomerForm/CustomerForm')} />
const PlaceOrderForm = () => <Async load={import('./containers/PlaceOrderForm/PlaceOrderForm')} />
const OrdersForm = () => <Async load={import('./containers/OrdersForm/OrdersForm')} />
const ItemForm = () => <Async load={import('./containers/ItemForm/ItemForm')} />

class App extends Component {
    render () {
        return (
            <div>
                <Backdrop show={this.props.openDrawer}/>
                <Loader/>
                <Navigation/>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style={{position:'absolute',marginTop:'100px'}}>
                    <Switch>
                        <Route path="/Customer" component={CustomerForm} />
                        <Route path="/Item" component={ItemForm} />
                        <Route path="/Place-Order" component={PlaceOrderForm} />
                        <Route path="/Orders" component={OrdersForm} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps=(state)=>{
    return{
        openDrawer:state.navbarRed.open
    }
}

export default withRouter(connect(mapDispatchToProps,null)(App));
