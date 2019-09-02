import * as actionTypes from '../actions/actions';

const initialState={
    imageFile:[]
}

const reducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.UPLOAD_IMAGE:
            return{
                ...state,
                imageFile:action.value
            };
        default:return state;
    }
}

export default reducer;