import React,{Component} from 'react';
import classes from './CustomerForm.css';
import Button from '@material-ui/core/Button';
import FileUploader from "../../components/FileUploader/FileUploader";
import axiosCustomer from '../../axios/axios-customer';
import axiosUpload from '../../axios/axios-upload';
import * as Scroll from 'react-scroll';

import {Modal} from "antd";
import {connect} from "react-redux";
import * as actionCreators from "../../store/actions";

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

const globalImagePath="http://localhost:8080/images/customer/"

class CustomerForm extends Component{

    state={
        customers:[],
        visible:false,
        name:'',
        address:'',
        searchText:'',
        pages:0,
        beforeSearch:'',

        updatedId:'',
        updatedAddress:'',
        updatedName:'',
        updatedImage:'',
        beforeCustomer:''
    }

    showModal = (url,customerObj) => {
        // this.getBase64Image(url, (base64image)=>{
        //     console.log(base64image);
        // });
        this.setState({
            visible: true,
            updatedId:customerObj.id,
            updatedAddress:customerObj.address,
            updatedName:customerObj.name,
            updatedImage:customerObj.image,
            beforeCustomer:customerObj
        });
        this.props.onHandleImageFiles([]);
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    getBase64Image=(imgUrl, callback)=>{

        const img = new Image();

        // onload fires when the image is fully loadded, and has width and height

        img.onload = ()=>{

            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL("image/png");
            const base64 = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

            callback(base64); // the base64 string

        };

        // set attributes and src
        img.setAttribute('crossOrigin', 'http://localhost:8081'); //
        img.src = imgUrl;

    }

    loadCards=(pageNumber)=>{
        this.props.open();

        axiosCustomer.get(`/customer?action=page&page=`+pageNumber+`&size=12`)
            .then(response => {
                if(response.data!==null){
                    const customerList=this.state.customers;
                    if(customerList.length===0){
                        response.data.map(customer=>{
                            customerList.push({
                                id:customer.id,
                                name:customer.name,
                                address:customer.address,
                                image:customer.image
                            })
                        })
                    }else{
                        response.data.map(customer=>{
                            let count=0;
                            this.state.customers.map(exist=>{
                                if(exist.id===customer.id){
                                    count++;
                                }
                            })
                            if(count===0){
                                customerList.push({
                                    id:customer.id,
                                    name:customer.name,
                                    address:customer.address,
                                    image:customer.image
                                })
                            }

                        })
                    }
                    this.setState({
                        customers:customerList
                    })
                    this.props.close();
                }
            })

            .catch(error => {
                this.props.error();
                console.log("error: " + error)
            });
    }

    loadLastCard=()=>{
        this.props.open();

        axiosCustomer.get(`/customer?action=last`)
            .then(response => {
                if(response.data!==null){
                    const customerList=this.state.customers;
                    customerList.push({
                        id:response.data.id,
                        name:response.data.name,
                        address:response.data.address,
                        image:response.data.image
                    })
                    this.setState({
                        customers:customerList
                    })
                    const elementName=""+response.data.id;
                    Scroll.scroller.scrollTo(elementName, {
                        duration: 1000,
                        smooth: true,
                        containerId: 'cardDiv',
                        offset: -120
                    })
                    this.props.done();
                }
            })

            .catch(error => {
                this.props.error();
                console.log("error: " + error)
            });
    }

    componentDidMount(){

        this.loadCards(0);
        document.getElementById('result').style.display='none';

    }

    scrollOnCard=()=>{
        let scrolledValue=document.getElementById('cardDiv').scrollTop;
        let pageNo=Math.round((scrolledValue/300));

        if(pageNo>this.state.pages){

            this.loadCards(pageNo);
            this.setState({
                pages:pageNo
            })
        }
        this.setState({
            currentPage:pageNo
        })

    }

    deleteCustomer=(customerObj)=>{
        this.props.open();

        axiosCustomer.delete(`/customer`,{data:customerObj})
            .then(response => {
                if(response.data){
                    const customerList=this.state.customers;
                    customerList.splice(customerList.indexOf(customerObj),1);
                    this.setState({
                        customers:customerList
                    })
                    this.props.done();
                }else{
                    this.props.error();
                }
            })

            .catch(error => {
                this.props.error();
                console.log("error: " + error)
            });
    }

    updateCustomer=()=>{
        this.props.open();
        console.log(this.props.imgFile)
        if(this.props.imgFile.length>0){

            this.props.open();
            const bodyFormData=new FormData();
            bodyFormData.set("file",this.props.imgFile[0].originFileObj);

            axiosUpload.post(`/customer`,bodyFormData)
                .then(response => {
                    if(response.data.StatusCode!==500){
                        const customerObj={
                            id:this.state.updatedId,
                            name:this.state.updatedName,
                            address:this.state.updatedAddress,
                            image:response.data
                        }
                        axiosCustomer.post(`/customer`,customerObj)
                            .then(response => {
                                if(response.data){
                                    const customerList=this.state.customers;
                                    customerList.splice(customerList.indexOf(this.state.beforeCustomer),1);
                                    customerList.push(customerObj);
                                    this.setState({
                                        customers:customerList,
                                        visible:false
                                    })
                                    this.props.done();
                                    const elementName=""+this.state.updatedId;
                                    Scroll.scroller.scrollTo(elementName, {
                                        duration: 1000,
                                        smooth: true,
                                        containerId: 'cardDiv',
                                        offset: -120
                                    })
                                    this.props.onHandleImageFiles([]);

                                }else{
                                    this.props.error();

                                }
                            })

                            .catch(error => {
                                this.props.error();
                                console.log("error: " + error)
                            });
                    }
                })

                .catch(error => {
                    this.props.error();
                    console.log("error: " + error)
                });

        }else{
            const customerObj={
                id:this.state.updatedId,
                name:this.state.updatedName,
                address:this.state.updatedAddress,
                image:this.state.updatedImage
            }
            axiosCustomer.post(`/customer`,customerObj)
                .then(response => {
                    if(response.data){
                        const customerList=this.state.customers;
                        customerList.splice(customerList.indexOf(this.state.beforeCustomer),1);
                        customerList.push(customerObj);
                        this.setState({
                            customers:customerList,
                            visible:false
                        })
                        this.props.done();
                        const elementName=""+this.state.updatedId;
                        Scroll.scroller.scrollTo(elementName, {
                            duration: 1000,
                            smooth: true,
                            containerId: 'cardDiv',
                            offset: -120
                        })
                    }else{
                        this.setState({
                            visible:false
                        })
                        this.props.error();
                    }
                })

                .catch(error => {
                    this.setState({
                        visible:false
                    })
                    this.props.error();
                    console.log("error: " + error)
                });
        }


    }

    // save customer function

    saveCustomer=()=>{

        if(this.state.beforeSearch!==''){
            this.removeBorder(this.state.beforeSearch);
        }

        this.props.open();
        const bodyFormData=new FormData();
        bodyFormData.set("file",this.props.imgFile[0].originFileObj);

        axiosUpload.post(`/customer`,bodyFormData)
            .then(response => {
                if(response.data.StatusCode!==500){
                    const customerObj={
                        id:0,
                        name:this.state.name,
                        address:this.state.address,
                        image:response.data
                    }
                    axiosCustomer.put(`/customer`,customerObj)
                        .then(response => {
                            if(response.data){
                                this.props.onHandleImageFiles([]);
                                this.setState({
                                    name:'',
                                    address:''
                                })
                                this.loadLastCard();

                            }else{
                                this.props.error();
                            }
                        })

                        .catch(error => {
                            this.props.error();
                            console.log("error: " + error)
                        });
                }
            })

            .catch(error => {
                this.props.error();
                console.log("error: " + error)
            });

    }

    searchTyping=(text)=>{
        document.getElementById('result').style.display='none';
        this.setState({
            searchText:text
        })
    }

    removeBorder=(cardId)=>{
        document.getElementById(cardId).style.border='0px solid black';
    }

    addBorder=(cardId)=>{
        document.getElementById(cardId).style.border='3px solid blue';
    }

    searchCustomer=()=>{
        if(this.state.beforeSearch!==''){
            const cardId=this.state.beforeSearch;
            this.removeBorder(cardId);
        }
        let count=0;
        this.state.customers.map(customer=>{
            if(customer.name===this.state.searchText){
                const cardId="c"+customer.id;
                this.addBorder(cardId)
                this.setState({
                    beforeSearch:cardId
                })
                const elementName=""+customer.id;
                Scroll.scroller.scrollTo(elementName, {
                    duration: 1000,
                    smooth: true,
                    containerId: 'cardDiv',
                    offset: -120
                })

            }else{
                count++;
            }
        })
        if(count===this.state.customers.length){
            document.getElementById('result').style.display='block';
        }
    }

    render(){

        const { fullScreen } = this.props;

        let count=0;
        const cards=this.state.customers.map((customer,index)=>{
            count++;
            if(this.state.customers.length===count){
                return(
                    <div key={index} style={{marginTop:'2%',marginBottom:'2%'}} className="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-3">
                        <Scroll.Element name={""+customer.id}>
                            <div id={"c"+customer.id} className="w3-card-4" style={{width:'90%',marginLeft:'6%'}}>
                                <img width="100%" height="130px" src={globalImagePath+""+customer.image} alt={customer.name}/>
                                <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start'}} className="w3-container w3-center">
                                    <p style={{fontWeight:'bold',fontSize:'13px'}}>{customer.name}</p>
                                    <p style={{fontSize:'12px'}}>{customer.address}</p>
                                    <div className={classes.ButtonRow}>
                                        <Button onClick={()=>this.showModal(globalImagePath+""+customer.image,customer)} style={{border:'none',outline:'none',fontWeight:'bold'}} color="primary" className={styles.button}>
                                            update
                                        </Button>
                                        <Button onClick={()=>this.deleteCustomer(customer)} style={{border:'none',outline:'none',fontWeight:'bold'}} color="secondary" className={styles.button}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Scroll.Element>
                    </div>
                )
            }else{
                return(
                    <div key={index} style={{marginTop:'2%'}} className="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-3">
                        <Scroll.Element name={""+customer.id}>
                            <div id={"c"+customer.id} className="w3-card-4" style={{width:'90%',marginLeft:'6%'}}>
                                <img width="100%" height="130px" src={globalImagePath+""+customer.image} alt={customer.name}/>
                                <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start'}} className="w3-container w3-center">
                                    <p style={{fontWeight:'bold',fontSize:'13px'}}>{customer.name}</p>
                                    <p style={{fontSize:'12px'}}>{customer.address}</p>
                                    <div className={classes.ButtonRow}>
                                        <Button onClick={()=>this.showModal(globalImagePath+""+customer.image,customer)} style={{border:'none',outline:'none',fontWeight:'bold'}} color="primary" className={styles.button}>
                                            update
                                        </Button>
                                        <Button onClick={()=>this.deleteCustomer(customer)} style={{border:'none',outline:'none',fontWeight:'bold'}} color="secondary" className={styles.button}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Scroll.Element>
                    </div>
                )
            }
        })

        const cardSet=<div className="row">{cards}</div>

        const updateForm=<Modal
            title="Update Customer"
            footer={null}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
        >
            <div className={classes.AddImage}>

                <FileUploader/>

            </div>

            <div className={classes.AddName}>

                <div>Name</div>
                <div><input value={this.state.updatedName} onChange={(event)=>this.setState({updatedName:event.target.value})} type="text" style={{marginLeft:'-2%'}}/></div>

            </div>

            <div className={classes.AddAddress}>

                <div>Address</div>
                <div><input value={this.state.updatedAddress} onChange={(event)=>this.setState({updatedAddress:event.target.value})} type="text"/></div>

            </div>

            <div className={classes.updateDiv}>
                <Button onClick={()=>this.updateCustomer()} style={{border:'none',outline:'none'}} color="primary" className={styles.button}>
                    Update Customer
                </Button>

            </div>
        </Modal>;

        return(

            <div className={classes.Container}>
                {updateForm}
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                        <div className="row" style={{marginLeft:'0px',marginRight:'0px'}}>
                            <div className={classes.Add}>
                                <div className={classes.AddContainer}>
                                    <h5>Add New Customer</h5>
                                    <div className="w3-panel w3-card-2" style={{marginBottom:'10%',width:'95%',display:'flex',flexDirection:'column',justifyContent:'flex-start'}}>

                                        <div className={classes.AddImage}>

                                            <FileUploader/>

                                        </div>

                                        <div className={classes.AddName}>

                                            <div>Name</div>
                                            <div><input value={this.state.name} onChange={(event)=>this.setState({name:event.target.value})} type="text"/></div>

                                        </div>

                                        <div className={classes.AddAddress}>

                                            <div>Address</div>
                                            <div><input value={this.state.address} onChange={(event)=>this.setState({address:event.target.value})} type="text"/></div>

                                        </div>

                                        <div className={classes.saveDiv}>
                                            <Button onClick={this.saveCustomer} style={{border:'none',outline:'none'}} color="primary" className={styles.button}>
                                                Save Customer
                                            </Button>

                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className={classes.Search}>

                                <div className={classes.AddContainer}>
                                    <h5>Search Customer</h5>
                                    <div className="w3-panel w3-card-2" style={{marginBottom:'10%',width:'95%',display:'flex',flexDirection:'column',justifyContent:'flex-start'}}>
                                        <div className={classes.AddName}>

                                            <div>Name</div>
                                            <div><input value={this.state.searchText} onChange={(event)=>{this.searchTyping(event.target.value)}} type="text"/></div>
                                            <div id="result" style={{color:'red'}}>No Result Found!</div>

                                        </div>

                                        <div className={classes.saveDiv}>
                                            <Button id="searchBtn" onClick={this.searchCustomer} style={{border:'none',outline:'none'}} color="primary" className={styles.button}>
                                                Search Customer
                                            </Button>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                        <div id="cardDiv" onScroll={this.scrollOnCard} className={classes.Cards}>
                            {cardSet}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        imgFile:state.uploadRed.imageFile,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        onHandleImageFiles:(data)=>dispatch(actionCreators.uploadImageOnAction(data)),

        open:()=>dispatch(actionCreators.loaderOpen()),
        close:()=>dispatch(actionCreators.loaderClose()),
        load:()=>dispatch(actionCreators.loaderLoad()),
        done:()=>dispatch(actionCreators.loaderDone()),
        error:()=>dispatch(actionCreators.loaderError()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomerForm);