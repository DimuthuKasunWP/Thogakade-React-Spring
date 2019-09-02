import * as actionTypes from '../actions/actions';

const initialState={
    open:false,
    done:false,
    error:false,
    load:false,
    close:false
}

const reducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.LOADER_DONE:
            return{
                ...state,
                done:true,
                error:false,
                load:false,
                close:false
            };
        case actionTypes.LOADER_ERROR:
            return{
                ...state,
                done:false,
                error:true,
                load:false,
                close:false
            };
        case actionTypes.LOADER_LOAD:
            return{
                ...state,
                done:false,
                error:false,
                load:true,
                close:false
            };
        case actionTypes.LOADER_OPEN:
            return{
                ...state,
                open:true,
                load:true,
                error:false,
                done:false,
                close:false
            };
        case actionTypes.LOADER_CLOSE:
            return{
                ...state,
                open:false,
                load:false,
                error:false,
                done:false,
                close:true
            };
        default:return state;

    }
}

export default reducer;