

import {
    
    FETCH_PRIVACY_LIST_START,
    FETCH_PRIVACY_LIST_SUCCESS,
    FETCH_PRIVACY_LIST_FAILURE,

    POST_PRIVACY_EDIT_START,
    POST_PRIVACY_EDIT_SUCCESS,
    POST_PRIVACY_EDIT_FAILURE,


} from  '../actions/privacy'


const initialState = {
    privacylist:{ success: false ,STATUSCODE:2000, error: false , response : {docs:[]}},
    isSuccess:false,
    isloading:false
}

export default( state=initialState, action) =>{

    const newState = {...state}

    switch(action.type){
        
        case FETCH_PRIVACY_LIST_START:
            return {
                ...state,
                isloading:true
            };
        case FETCH_PRIVACY_LIST_SUCCESS:
            return {
                ...state,
                isloading:false,
                privacylist:action.payload
            };
        case FETCH_PRIVACY_LIST_FAILURE:
            return {
                ...state,
                isloading:false
            };

        case POST_PRIVACY_EDIT_START:
            return {
                ...state,
                isSuccess:false,
                isloading:true
            };
        case POST_PRIVACY_EDIT_SUCCESS:
            return {
                ...state,
                isSuccess:true,
                isloading:false,
            };
        case POST_PRIVACY_EDIT_FAILURE:
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
