import { combineReducers } from 'redux'
import Auth from './Auth/reducer'
import Parents from './Parents/reducer'
import School from './School/reducer'
import Teacher from './Teacher/reducer'

const rootReducer = combineReducers({
    Auth,
    Parents,
    School,
    Teacher
})

export default rootReducer