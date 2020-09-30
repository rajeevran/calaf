import axios from 'axios'
import { type } from 'os';
import { baseUrl, localUrl } from '../shared/baseUrl'
import { getToken } from './admin'


export const FETCH_PRIVACY_LIST_START = 'FETCH_PRIVACY_LIST_START'
export const FETCH_PRIVACY_LIST_SUCCESS = 'FETCH_PRIVACY_LIST_SUCCESS'
export const FETCH_PRIVACY_LIST_FAILURE = 'FETCH_PRIVACY_LIST_FAILURE'

export const POST_PRIVACY_ADD_START = 'POST_PRIVACY_ADD_START'
export const POST_PRIVACY_ADD_SUCCESS = 'POST_PRIVACY_ADD_SUCCESS'
export const POST_PRIVACY_ADD_FAILURE = 'POST_PRIVACY_ADD_FAILURE'

export const POST_PRIVACY_EDIT_START = 'POST_PRIVACY_EDIT_START'
export const POST_PRIVACY_EDIT_SUCCESS = 'POST_PRIVACY_EDIT_SUCCESS'
export const POST_PRIVACY_EDIT_FAILURE = 'POST_PRIVACY_EDIT_FAILURE'

export const POST_PRIVACY_DELETE_START = 'POST_PRIVACY_DELETE_START'
export const POST_PRIVACY_DELETE_SUCCESS = 'POST_PRIVACY_DELETE_SUCCESS'
export const POST_PRIVACY_DELETE_FAILURE = 'POST_PRIVACY_DELETE_FAILURE'



//...................PRIVACY ...............................
export const fetchPrivacy = (id,page,limit,searchName) => dispatch =>{

    console.log('LOGIN auth data--->', JSON.parse(getToken()).token);
    let token = JSON.parse(getToken()).token

    dispatch( {type:'FETCH_PRIVACY_LIST_START'} )

    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
      
    axios
    .get(baseUrl+'api/listPrivacyPolicy/', {
        headers: headers,
        params:{
            ...(id ? { privacyId: id } : {}),
            ...(searchName ? { searchName: searchName } : {}),
            ...(page ? { page: page } : {}),
            ...(limit ? { limit: limit } : {})
        }
        })
    .then(res =>{
        console.log(res)
        dispatch( { type:'FETCH_PRIVACY_LIST_SUCCESS', payload: res.data } )
    })
    .catch(err => {
        console.log(err.response)
        dispatch( { type:'FETCH_PRIVACY_LIST_FAILURE', payload: err.response  } )
        
    })
}


export const postEditPrivacy = postData => dispatch =>{

    dispatch( {type:'POST_PRIVACY_EDIT_START'} )

    console.log('Post  edit data--->', postData);
    let token = JSON.parse(getToken()).token

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-access-token': token
      }

    const formData = new FormData();
    for (const key in postData) {
      formData.append(key, postData[key]);
    }

    axios
    .post(baseUrl+'api/editPrivacyPolicy/',formData, {
        headers: headers
        })
    .then(res =>{
        console.log(res)
        dispatch( { type:'POST_PRIVACY_EDIT_SUCCESS', payload: res.data } )
    })
    .catch(err => {
        console.log(err.response)
        dispatch( { type:'POST_PRIVACY_EDIT_FAILURE', payload: err.response  } )
        
    })
}
