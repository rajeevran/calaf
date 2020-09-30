import axios from 'axios'
import { type } from 'os';
import { baseUrl, localUrl } from '../shared/baseUrl'
import { getToken } from './admin'


export const FETCH_TERM_LIST_START = 'FETCH_TERM_LIST_START'
export const FETCH_TERM_LIST_SUCCESS = 'FETCH_TERM_LIST_SUCCESS'
export const FETCH_TERM_LIST_FAILURE = 'FETCH_TERM_LIST_FAILURE'

export const POST_TERM_ADD_START = 'POST_TERM_ADD_START'
export const POST_TERM_ADD_SUCCESS = 'POST_TERM_ADD_SUCCESS'
export const POST_TERM_ADD_FAILURE = 'POST_TERM_ADD_FAILURE'

export const POST_TERM_EDIT_START = 'POST_TERM_EDIT_START'
export const POST_TERM_EDIT_SUCCESS = 'POST_TERM_EDIT_SUCCESS'
export const POST_TERM_EDIT_FAILURE = 'POST_TERM_EDIT_FAILURE'

export const POST_TERM_DELETE_START = 'POST_TERM_DELETE_START'
export const POST_TERM_DELETE_SUCCESS = 'POST_TERM_DELETE_SUCCESS'
export const POST_TERM_DELETE_FAILURE = 'POST_TERM_DELETE_FAILURE'



//...................TERM ...............................

    export const postEditTerm = postData => dispatch =>{

    dispatch( {type:'POST_TERM_EDIT_START'} )

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
    .post(baseUrl+'api/editTerms/',formData, {
        headers: headers
        })
    .then(res =>{
        console.log(res)
        dispatch( { type:'POST_TERM_EDIT_SUCCESS', payload: res.data } )
    })
    .catch(err => {
        console.log(err.response)
        dispatch( { type:'POST_TERM_EDIT_FAILURE', payload: err.response  } )
        
    })
    }

    export const fetchTerm = (id,page,limit,searchName) => {

    let token = JSON.parse(getToken()).token
    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': token
        }
    return (dispatch) => {
        dispatch(fetchTermRequest())

        axios
        .get(baseUrl+'api/listTerms/', {
            headers: headers,
            params:{
                ...(id ? { termId: id } : {}),
                ...(searchName ? { searchName: searchName } : {}),
                ...(page ? { page: page } : {}),
                ...(limit ? { limit: limit } : {})
            }
            })
        .then(res =>{
            console.log(res)
            dispatch(fetchTermSuccess(res.data))

        })
        .catch(err => {
            console.log(err.response)
            dispatch(fetchTermFailure(err.message))
        })
    }
    }

    export const fetchTermRequest = () => {
    return {
        type: FETCH_TERM_LIST_START
    }
    }

    export const fetchTermSuccess = users => {
    return {
        type: FETCH_TERM_LIST_SUCCESS,
        payload: users
    }
    }

    export const fetchTermFailure = err => {
    return {
        type: FETCH_TERM_LIST_FAILURE,
        payload: err
    }
    }

