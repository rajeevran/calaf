
import { combineReducers } from 'redux'

import adminReducer from './adminReducer'
import privacyReducer from './privacyReducer'
import termReducer from './termReducer'


export default combineReducers ({

        adminReducer,
        privacyReducer,
        termReducer

})