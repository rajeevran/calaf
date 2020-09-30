

import {
    
    FETCH_TERM_LIST_START,
    FETCH_TERM_LIST_SUCCESS,
    FETCH_TERM_LIST_FAILURE,

    POST_TERM_EDIT_START,
    POST_TERM_EDIT_SUCCESS,
    POST_TERM_EDIT_FAILURE,


} from  '../actions/terms'


const initialState = {
    termlist:{ success: false ,STATUSCODE:2000, error: false , response : {docs:[]}},
    isSuccess:false,
    isloading:false
}

export default( state=initialState, action) =>{

    const newState = {...state}

    switch(action.type){
        
        case FETCH_TERM_LIST_START:
            return {
                ...state,
                isloading:true
            };
        case FETCH_TERM_LIST_SUCCESS:
            return {
                ...state,
                isloading:false,
                termlist:action.payload
            };
        case FETCH_TERM_LIST_FAILURE:
            return {
                ...state,
                isloading:false
            };

        case POST_TERM_EDIT_START:
            return {
                ...state,
                isSuccess:false,
                isloading:true
            };
        case POST_TERM_EDIT_SUCCESS:
            return {
                ...state,
                isSuccess:true,
                isloading:false,
            };
        case POST_TERM_EDIT_FAILURE:
            return {
                ...state,
                isSuccess:false,
                isloading:false
            };                      

        default :
            return state
    }
    //console.log(newState);
    
    
}
