import * as actionTypes from '../actions/actions';

export const loaderOpen=()=>{
    return{
        type:actionTypes.LOADER_OPEN
    }
}

export const loaderClose=()=>{
    return{
        type:actionTypes.LOADER_CLOSE
    }
}

export const loaderDone=()=>{
    return{
        type:actionTypes.LOADER_DONE
    }
}

export const loaderError=()=>{
    return{
        type:actionTypes.LOADER_ERROR
    }
}

export const loaderLoad=()=>{
    return{
        type:actionTypes.LOADER_LOAD
    }
}