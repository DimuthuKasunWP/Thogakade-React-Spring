import React,{Component} from 'react';
import classes from "./OrdersForm.css";
import {Link, Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as actionCreators from "../../store/actions";
import axios from "../../axios/axios-order";
import Async from "react-code-splitting";

const ViewForm = () => <Async load={import('./ViewOrder/ViewOrder')} />

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,

    },
    input: {
        display: 'none',
        border:'none',
        outline:'none'
    },
});

const globalCustomerImagePath="http://localhost:8080/images/customer/";
const globalItemImagePath="http://localhost:8080/images/item/";

class OrdersForm extends Component{

    state={
        orders:[]
    }

    loadOrders=()=>{
        this.props.open();

        axios.get(`/order?action=all`)
            .then(response => {
                if(response.data!==null){
                    const ordersList=[];
                    response.data.map(order=>{
                        ordersList.push({
                            oid:order.oid,
                            totalPrice:order.totalPrice,
                            customer:order.customerDTO,
                            orderDetails:order.orderDetailDTOList,
                        })

                    })
                    this.setState({
                        orders:ordersList
                    })
                    this.props.close();
                }else{
                    this.props.close();
                }
            })

            .catch(error => {
                this.props.error();
                console.log("error: " + error)
            });
    }

    componentDidMount(){
        this.loadOrders();
    }

    render(){

        let count=0;
        const cards=this.state.orders.map((order,index)=>{

            let imgSet3=null;
            let imgSet2=null;
            let imgSet1=null;
            let imgSet0=null;

            if(order.orderDetails.length>0){
                imgSet0=<div className="row">
                    <img src={globalItemImagePath+""+order.orderDetails[0].item.image} alt={order.orderDetails[0].item.name} width="100%" height="130px" className="col-sm-12" />
                </div>
            }

            if(order.orderDetails.length>1){
                imgSet1=<div className="row">
                    <img src={globalItemImagePath+""+order.orderDetails[0].item.image} alt={order.orderDetails[0].item.name} width="100%" height="65px" className="col-sm-12" />
                    <img src={globalItemImagePath+""+order.orderDetails[1].item.image} alt={order.orderDetails[1].item.name} width="100%" height="65px" className="col-sm-12" />
                </div>
            }

            if(order.orderDetails.length>2){
                imgSet2=<div className="row">
                    <img src={globalItemImagePath+""+order.orderDetails[0].item.image} alt={order.orderDetails[0].item.name} width="100%" height="65px" className="col-sm-6" />
                    <img src={globalItemImagePath+""+order.orderDetails[1].item.image} alt={order.orderDetails[1].item.name} width="100%" height="65px" className="col-sm-6" />
                    <img src={globalItemImagePath+""+order.orderDetails[2].item.image} alt={order.orderDetails[2].item.name} width="100%" height="65px" className="col-sm-12" />
                </div>
            }

            if(order.orderDetails.length>3){
                imgSet3=<div className="row">
                    <img src={globalItemImagePath+""+order.orderDetails[0].item.image} alt={order.orderDetails[0].item.name} width="100%" height="65px" className="col-sm-6" />
                    <img src={globalItemImagePath+""+order.orderDetails[1].item.image} alt={order.orderDetails[1].item.name} width="100%" height="65px" className="col-sm-6" />
                    <img src={globalItemImagePath+""+order.orderDetails[2].item.image} alt={order.orderDetails[2].item.name} width="100%" height="65px" className="col-sm-6" />
                    <img src={globalItemImagePath+""+order.orderDetails[3].item.image} alt={order.orderDetails[3].item.name} width="100%" height="65px" className="col-sm-6" />
                </div>

            }

            count++;
            if(this.state.orders.length===count){

                return(
                    <div key={index} style={{marginTop:'2%',marginBottom:'2%'}} className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                        <Link to={this.props.match.url+"/"+order.oid}>
                            <div className="w3-card-4" style={{width:'90%',marginLeft:'6%'}}>
                                <div className="row"  style={{marginLeft:'0px',marginRight:'0px'}}>
                                    <img className="col-sm-6" width="100%" height="130px" src={globalCustomerImagePath+""+order.customer.image} alt={order.customer.name}/>
                                    <div className="col-sm-6">
                                        {
                                            order.orderDetails.length>3?imgSet3:order.orderDetails.length>2?imgSet2:order.orderDetails.length>1?imgSet1:imgSet0
                                        }
                                    </div>
                                </div>
                                <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start'}} className="w3-container w3-center">
                                    <p style={{fontWeight:'bold',fontSize:'13px'}}>{order.customer.name}</p>
                                    <p style={{fontSize:'12px'}}>{"Rs. " +order.totalPrice}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            }else{
                return(
                    <div key={index} style={{marginTop:'2%'}} className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                        <Link to={this.props.match.url+"/"+order.oid}>
                            <div className="w3-card-4" style={{width:'90%',marginLeft:'6%'}}>
                                <div className="row"  style={{marginLeft:'0px',marginRight:'0px'}}>
                                    <img className="col-sm-6" width="100%" height="130px" src={globalCustomerImagePath+""+order.customer.image} alt={order.customer.name}/>
                                    <div className="col-sm-6">
                                        {
                                            order.orderDetails.length>3?imgSet3:order.orderDetails.length>2?imgSet2:order.orderDetails.length>1?imgSet1:imgSet0
                                        }
                                    </div>
                                </div>
                                <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start'}} className="w3-container w3-center">
                                    <p style={{fontWeight:'bold',fontSize:'13px'}}>{order.customer.name}</p>
                                    <p style={{fontSize:'12px'}}>{"Rs. " +order.totalPrice}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            }
        })

        return(

            <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <div className={classes.Orders}>
                        <div className="row">
                            {cards}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <Route path={this.props.match.url+"/:id"} component={ViewForm} />
                </div>
            </div>
        );
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

export default withRouter(connect(null,mapDispatchToProps)(OrdersForm));