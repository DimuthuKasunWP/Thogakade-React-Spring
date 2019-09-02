import React,{Component} from 'react';
import Navbar from "./Navbar/Navbar";
import SideDrawer from "./SideDrawer/SideDrawer";

class Navigation extends Component{
    render(){
        return(
            <div>
                <Navbar/>
                <SideDrawer/>
            </div>
        );
    }
}

export default Navigation;