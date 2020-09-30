

import {
    POST_ADMIN_LOGIN_START,
    POST_ADMIN_LOGIN_SUCCESS,
    POST_ADMIN_LOGIN_FAILURE,
    POST_ADMIN_LOGINOUT_SUCCESS,  
    
    FETCH_ADMIN_LIST_START,
    FETCH_ADMIN_LIST_SUCCESS,
    FETCH_ADMIN_LIST_FAILURE,

    POST_ADMIN_ADD_START,
    POST_ADMIN_ADD_SUCCESS,
    POST_ADMIN_ADD_FAILURE,

    POST_ADMIN_EDIT_START,
    POST_ADMIN_EDIT_SUCCESS,
    POST_ADMIN_EDIT_FAILURE,

    POST_ADMIN_CHANGEPASSWORD_START,
    POST_ADMIN_CHANGEPASSWORD_SUCCESS,
    POST_ADMIN_CHANGEPASSWORD_FAILURE,

    POST_ADMIN_DELETE_START,
    POST_ADMIN_DELETE_SUCCESS,
    POST_ADMIN_DELETE_FAILURE,

    FETCH_USER_LIST_START,
    FETCH_USER_LIST_SUCCESS,
    FETCH_USER_LIST_FAILURE,

    POST_USER_ADD_START,
    POST_USER_ADD_SUCCESS,
    POST_USER_ADD_FAILURE,    

    POST_USER_EDIT_START,
    POST_USER_EDIT_SUCCESS,
    POST_USER_EDIT_FAILURE,

    POST_SEND_EMAIL_START,
    POST_SEND_EMAIL_SUCCESS,
    POST_SEND_EMAIL_FAILURE,

    POST_USER_DELETE_START,
    POST_USER_DELETE_SUCCESS,
    POST_USER_DELETE_FAILURE

} from  '../actions/admin'

//postSendEmail
const initialState = {
        list            : { success: false , STATUSCODE:2000, error: false , response : {docs:[]}},
        userList        : { success: false ,STATUSCODE:2000, error: false , response : {docs:[]}},
        login           : { success: false ,STATUSCODE:2000, error: false , response : {}},
        sendEmail       : { success: false ,STATUSCODE:2000, error: false , response : {}},
        changepassword  : { success: false ,STATUSCODE:2000, error: false , response : {}},
        ismailsend      : false,
        message         : 'Welcome To Calaf Admin',
        isloading       : false,
        isSuccess       : false
}

export default( state=initialState, action) =>{

    const newState = {...state}

    switch(action.type){

        case POST_ADMIN_LOGIN_START:
        return {
            ...state,
            isloading:true
        };
        case POST_ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                isloading:false,
                login:action.payload
            };
        case POST_ADMIN_LOGIN_FAILURE:
            return {
                ...state,
                isloading:false
            };  
        case POST_ADMIN_LOGINOUT_SUCCESS:
            return {
                ...state,
                isloading:false,
                login:action.payload
            };    
                    
        case FETCH_ADMIN_LIST_START:
            return {
                ...state,
                isloading:true
            };
        case FETCH_ADMIN_LIST_SUCCESS:
            return {
                ...state,
                isloading:false,
                list:action.payload,
                isSuccess   : action.payload.success,
            };
        case FETCH_ADMIN_LIST_FAILURE:
            return {
                ...state,
                isloading:false
            };
        case POST_ADMIN_CHANGEPASSWORD_START:
            return {
                ...state,
                isloading:true
            };
        case POST_ADMIN_CHANGEPASSWORD_SUCCESS:
            return {
                ...state,
                isloading:false,
                changepassword:action.payload
            };
        case POST_ADMIN_CHANGEPASSWORD_FAILURE:
            return {
                ...state,
                isloading:false
            };

        case POST_ADMIN_ADD_START:
            return {
                ...state,
                isloading:true,
                isSuccess:false,

            };
        case POST_ADMIN_ADD_SUCCESS:
            return {
                ...state,
                isloading:false,
                isSuccess   : action.payload.success,
                message     : action.payload.message
            };
        case POST_ADMIN_ADD_FAILURE:
            return {
                ...state,
                isloading:false,
                isSuccess:false,
                message     : action.payload

            }; 

        case POST_ADMIN_EDIT_START:
            return {
                ...state,
                isloading:true,
                isSuccess:false,
                message     : null

            };
        case POST_ADMIN_EDIT_SUCCESS:
            return {
                ...state,
                isloading:false,
                isSuccess   : action.payload.success,
                message     : action.payload.message
            };
        case POST_ADMIN_EDIT_FAILURE:
            return {
                ...state,
                isloading:false,
                isSuccess:false,
                message : action.payload

            };             

        case POST_ADMIN_DELETE_START:
            return {
                ...state,
                isloading:true
            };
        case POST_ADMIN_DELETE_SUCCESS:
            return {
                ...state,
                isloading:false,
            };
        case POST_ADMIN_DELETE_FAILURE:
            return {
                ...state,
                isloading:false
            }; 

        case FETCH_USER_LIST_START:
            return {
                ...state,
                isloading:true
            };
        case FETCH_USER_LIST_SUCCESS:
            return {
                ...state,
                isloading:false,
                userList:action.payload,
                isSuccess   : action.payload.success,
            };
        case FETCH_USER_LIST_FAILURE:
            return {
                ...state,
                isloading:false
            };
        case POST_USER_ADD_START:
            return {
                ...state,
                isloading   : true,
                isSuccess   : false,
            };
        case POST_USER_ADD_SUCCESS:
            return {
                ...state,
                isloading   : false,
                isSuccess   : action.payload.success,
                message     : action.payload.message
            };
        case POST_USER_ADD_FAILURE:
            return {
                ...state,
                isloading   : false,
                isSuccess   : false,
                message     : action.payload

            };  

        case POST_USER_EDIT_START:
            return {
                ...state,
                isloading   : true,
                isSuccess   : false,
                message     : null

            };
        case POST_USER_EDIT_SUCCESS:
        console.log('action.payload---->',action.payload);
        
            return {
                ...state,
                isloading   : false,
                isSuccess   : action.payload.success,
                message     : action.payload.message
            };
        case POST_USER_EDIT_FAILURE:
            return {
                ...state,
                isloading   : false,
                isSuccess   : false,
                message     : action.payload

            };             


        case POST_SEND_EMAIL_START:
            return {
                ...state,
                isloading   : true,
                ismailsend   : false,
                sendmailmessage     : null

            };
        case POST_SEND_EMAIL_SUCCESS:
        console.log('action.payload---->',action.payload);
        
            return {
                ...state,
                isloading       : false,
                ismailsend      : true,
                isloading       : false,
                sendmailmessage : action.payload.message
            };
        case POST_SEND_EMAIL_FAILURE:
            return {
                ...state,
                isloading        : false,
                ismailsend       : false,
                sendmailmessage  : action.payload
            }; 


        case POST_USER_DELETE_START:
            return {
                ...state,
                isloading:true
            };
        case POST_USER_DELETE_SUCCESS:
            return {
                ...state,
                isloading:false,
            };
        case POST_USER_DELETE_FAILURE:
            return {
                ...state,
                isloading:false
            };             

        default :
            return state
    }
    //console.log(newState);
    
    
}

//export default reducer