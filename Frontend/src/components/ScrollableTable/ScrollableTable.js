import React,{Component} from 'react';
import classes from './ScrollableTable.css';
import PropTypes from 'prop-types';


class ScrollTable extends Component{


    render(){

        // get the properties from usage point

        const theadData=this.props.theadData;
        const tbodyData=this.props.tbodyData;

        const theadStyle=this.props.theadStyle;
        const tableStyle=this.props.tableStyle;
        const containerStyle=this.props.containerStyle;
        const trStyle=this.props.trStyle;
        const tdStyle=this.props.tdStyle;

        const thead=theadData.map((data,index)=>{
            return(
                <th key={index} style={{fontWeight:'normal',textAlign:'center'}}><span className="text">{data}</span></th>
            )
        });

        const rows=tbodyData.map((row,index)=>(
            <tr key={index} style={trStyle} >
                {
                    Object.keys(row).map((col,index)=>(
                        <td style={tdStyle} key={index} align="center">{row[col]}</td>
                    ))
                }
            </tr>
        ))


        return(

            <div style={containerStyle}>
                <table className={classes.tableSection} style={tableStyle}>
                    <thead style={theadStyle}>
                    <tr>
                        {thead}
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>


            </div>

        )
    }
}

ScrollTable.propTypes={
    theadData:PropTypes.array,
    tbodyData:PropTypes.array,
    theadStyle:PropTypes.object,
    tableStyle:PropTypes.object,
    containerStyle:PropTypes.object,
    trStyle:PropTypes.object,
    tdStyle:PropTypes.object
}


export default ScrollTable;