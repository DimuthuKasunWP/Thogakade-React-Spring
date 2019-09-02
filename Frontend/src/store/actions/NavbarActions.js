import * as actionTypes from './actions';

export const openDrawer=()=>{
    return{
        type:actionTypes.DRAWER_OPEN
    }
}

export const closeDrawer=()=>{
    return{
        type:actionTypes.DRAWER_CLOSE
    }
}
