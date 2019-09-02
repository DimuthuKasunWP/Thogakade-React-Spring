import * as actionTypes from './actions';

export const uploadImageOnAction=(data)=>{
    return{
        type:actionTypes.UPLOAD_IMAGE,
        value:data
    }
}