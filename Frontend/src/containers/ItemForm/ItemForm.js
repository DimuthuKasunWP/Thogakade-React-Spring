import React,{Component} from 'react';
import classes from './ItemForm.css';
import Button from '@material-ui/core/Button';
import FileUploader from "../../components/FileUploader/FileUploader";
import axiosItem from '../../axios/axios-item';
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

const globalImagePath="http://localhost:8080/images/item/";

class ItemForm extends Component{

    state={
        items:[],
        visible:false,
        name:'',
        price:'',
        amount:'',
        unit:'',
        searchText:'',
        pages:0,
        beforeSearch:'',

        updatedId:'',
        updatedName:'',
        updatedPrice:'',
        updatedAmount:'',
        updatedUnit:'',
        updatedImage:'',
        beforeItem:''
    }

    showModal = (url,itemObj) => {
        // this.getBase64Image(url, (base64image)=>{
        //     console.log(base64image);
        // });
        this.setState({
            visible: true,
            updatedId:itemObj.id,
            updatedPrice:itemObj.price,
            updatedAmount:itemObj.amount,
            updatedName:itemObj.name,
            updatedUnit:itemObj.unit,
            updatedImage:itemObj.image,
            beforeCustomer:itemObj
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

        axiosItem.get(`/item?action=page&page=`+pageNumber+`&size=12`)
            .then(response => {
                if(response.data!==null){
                    const itemList=this.state.items;
                    if(itemList.length===0){
                        response.data.map(item=>{
                            itemList.push({
                                id:item.id,
                                name:item.name,
                                price:item.price,
                                amount:item.amount,
                                unit:item.unit,
                                image:item.image
                            })
                        })
                    }else{
                        response.data.map(item=>{
                            let count=0;
                            this.state.items.map(exist=>{
                                if(exist.id===item.id){
                                    count++;
                                }
                            })
                            if(count===0){
                                itemList.push({
                                    id:item.id,
                                    name:item.name,
                                    price:item.price,
                                    amount:item.amount,
                                    unit:item.unit,
                                    image:item.image
                                })
                            }

                        })
                    }
                    this.setState({
                        items:itemList
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

        axiosItem.get(`/item?action=last`)
            .then(response => {
                if(response.data!==null){
                    const itemList=this.state.items;
                    itemList.push({
                        id:response.data.id,
                        name:response.data.name,
                        unit:response.data.unit,
                        price:response.data.price,
                        amount:response.data.amount,
                        image:response.data.image
                    })
                    this.setState({
                        items:itemList
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

    deleteItem=(itemObj)=>{
        this.props.open();

        axiosItem.delete(`/item`,{data:itemObj})
            .then(response => {
                if(response.data){
                    const itemList=this.state.items;
                    itemList.splice(itemList.indexOf(itemObj),1);
                    this.setState({
                        items:itemList
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

    updateItem=()=>{
        this.props.open();
        if(this.props.imgFile.length>0){

            this.props.open();
            const bodyFormData=new FormData();
            bodyFormData.set("file",this.props.imgFile[0].originFileObj);

            axiosUpload.post(`/item`,bodyFormData)
                .then(response => {
                    if(response.data.StatusCode!==500){
                        const itemObj={
                            id:this.state.updatedId,
                            name:this.state.updatedName,
                            unit:this.state.updatedUnit,
                            price:this.state.updatedPrice,
                            amount:this.state.updatedAmount,
                            image:response.data
                        }
                        axiosItem.post(`/item`,itemObj)
                            .then(response => {
                                if(response.data){
                                    const itemList=this.state.items;
                                    itemList.splice(itemList.indexOf(this.state.beforeItem),1);
                                    itemList.push(itemObj);
                                    this.setState({
                                        items:itemList,
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
            const itemObj={
                id:this.state.updatedId,
                name:this.state.updatedName,
                price:this.state.updatedPrice,
                unit:this.state.updatedUnit,
                amount:this.state.updatedAmount,
                image:this.state.updatedImage
            }
            axiosItem.post(`/item`,itemObj)
                .then(response => {
                    if(response.data){
                        const itemList=this.state.items;
                        itemList.splice(itemList.indexOf(this.state.beforeItem),1);
                        itemList.push(itemObj);
                        this.setState({
                            items:itemList,
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

    saveItem=()=>{

        if(this.state.beforeSearch!==''){
            this.removeBorder(this.state.beforeSearch);
        }

        this.props.open();
        const bodyFormData=new FormData();
        bodyFormData.set("file",this.props.imgFile[0].originFileObj);

        axiosUpload.post(`/item`,bodyFormData)
            .then(response => {
                if(response.data.StatusCode!==500){
                    const itemObj={
                        id:0,
                        name:this.state.name,
                        price:this.state.price,
                        amount:this.state.amount,
                        unit:this.state.unit,
                        image:response.data
                    }
                    axiosItem.put(`/item`,itemObj)
                        .then(response => {
                            if(response.data){
                                this.props.onHandleImageFiles([]);
                                this.setState({
                                    name:'',
                                    unit:'',
                                    price:'',
                                    amount:'',
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

    searchItem=()=>{
        if(this.state.beforeSearch!==''){
            const cardId=this.state.beforeSearch;
            this.removeBorder(cardId);
        }
        let count=0;
        this.state.items.map(item=>{
            if(item.name===this.state.searchText){
                const cardId="i"+item.id;
                this.addBorder(cardId)
                this.setState({
                    beforeSearch:cardId
                })
                const elementName=""+item.id;
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
        if(count===this.state.items.length){
            document.getElementById('result').style.display='block';
        }
    }

    render(){

        const { fullScreen } = this.props;

        let count=0;
        const cards=this.state.items.map((item,index)=>{
            count++;
            if(this.state.items.length===count){
                return(
                    <div key={index} style={{marginTop:'2%',marginBottom:'2%'}} className="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-3">
                        <Scroll.Element name={""+item.id}>
                            <div id={"i"+item.id} className="w3-card-4" style={{width:'90%',marginLeft:'6%'}}>
                                <img width="100%" height="130px" src={globalImagePath+""+item.image} alt={item.name}/>
                                <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start'}} className="w3-container w3-center">
                                    <p style={{fontWeight:'bold',fontSize:'13px'}}>{item.name}</p>
                                    <p style={{fontSize:'12px'}}>{"RS "+item.price}</p>
                                    <p style={{fontSize:'12px'}}>{item.amount+""+item.unit}</p>
                                    <div className={classes.ButtonRow}>
                                        <Button onClick={()=>this.showModal(globalImagePath+""+item.image,item)} style={{border:'none',outline:'none',fontWeight:'bold'}} color="primary" className={styles.button}>
                                            update
                                        </Button>
                                        <Button onClick={()=>this.deleteItem(item)} style={{border:'none',outline:'none',fontWeight:'bold'}} color="secondary" className={styles.button}>
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
                        <Scroll.Element name={""+item.id}>
                            <div id={"i"+item.id} className="w3-card-4" style={{width:'90%',marginLeft:'6%'}}>
                                <img width="100%" height="130px" src={globalImagePath+""+item.image} alt={item.name}/>
                                <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start'}} className="w3-container w3-center">
                                    <p style={{fontWeight:'bold',fontSize:'13px'}}>{item.name}</p>
                                    <p style={{fontSize:'12px'}}>{"RS "+item.price}</p>
                                    <p style={{fontSize:'12px'}}>{item.amount+""+item.unit}</p>
                                    <div className={classes.ButtonRow}>
                                        <Button onClick={()=>this.showModal(globalImagePath+""+item.image,item)} style={{border:'none',outline:'none',fontWeight:'bold'}} color="primary" className={styles.button}>
                                            update
                                        </Button>
                                        <Button onClick={()=>this.deleteItem(item)} style={{border:'none',outline:'none',fontWeight:'bold'}} color="secondary" className={styles.button}>
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

            <div className={classes.AddPrice}>

                <div>Price</div>
                <div><input value={this.state.updatedPrice} onChange={(event)=>this.setState({updatedPrice:event.target.value})} type="text"/></div>

            </div>

            <div className={classes.AddAmount}>

                <div>Amount</div>
                <div><input value={this.state.updatedAmount} onChange={(event)=>this.setState({updatedAmount:event.target.value})} type="text"/></div>

            </div>

            <div className={classes.AddUnit}>

                <div>Unit</div>
                <div><input value={this.state.updatedUnit} onChange={(event)=>this.setState({updatedUnit:event.target.value})} type="text"/></div>

            </div>

            <div className={classes.updateDiv}>
                <Button onClick={()=>this.updateItem()} style={{border:'none',outline:'none'}} color="primary" className={styles.button}>
                    Update Item
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
                                    <h5>Add New Item</h5>
                                    <div className="w3-panel w3-card-2" style={{marginBottom:'10%',width:'95%',display:'flex',flexDirection:'column',justifyContent:'flex-start'}}>

                                        <div className={classes.AddImage}>

                                            <FileUploader/>

                                        </div>

                                        <div className={classes.AddName}>

                                            <div>Name</div>
                                            <div><input value={this.state.name} onChange={(event)=>this.setState({name:event.target.value})} type="text"/></div>

                                        </div>

                                        <div className={classes.AddPrice}>

                                            <div>Price</div>
                                            <div><input value={this.state.price} onChange={(event)=>this.setState({price:event.target.value})} type="text"/></div>

                                        </div>

                                        <div className={classes.AddAmount}>

                                            <div>Amount</div>
                                            <div><input value={this.state.amount} onChange={(event)=>this.setState({amount:event.target.value})} type="text"/></div>

                                        </div>

                                        <div className={classes.AddUnit}>

                                            <div>Unit</div>
                                            <div><input value={this.state.unit} onChange={(event)=>this.setState({unit:event.target.value})} type="text"/></div>

                                        </div>

                                        <div className={classes.saveDiv}>
                                            <Button onClick={this.saveItem} style={{border:'none',outline:'none'}} color="primary" className={styles.button}>
                                                Save Item
                                            </Button>

                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className={classes.Search}>

                                <div className={classes.AddContainer}>
                                    <h5>Search Item</h5>
                                    <div className="w3-panel w3-card-2" style={{marginBottom:'10%',width:'95%',display:'flex',flexDirection:'column',justifyContent:'flex-start'}}>
                                        <div className={classes.AddName}>

                                            <div>Name</div>
                                            <div><input value={this.state.searchText} onChange={(event)=>{this.searchTyping(event.target.value)}} type="text"/></div>
                                            <div id="result" style={{color:'red'}}>No Result Found!</div>

                                        </div>

                                        <div className={classes.saveDiv}>
                                            <Button id="searchBtn" onClick={this.searchItem} style={{border:'none',outline:'none'}} color="primary" className={styles.button}>
                                                Search Item
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

export default connect(mapStateToProps,mapDispatchToProps)(ItemForm);