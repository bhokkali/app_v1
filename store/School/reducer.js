import * as types from './actionType'

const initialState = {
    listSchoolCalendar: [],
    listSchoolCircular: [],
    loaderStatus: false
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {
      
      case types.LIST_SCHOOL_CALENDAR:
        return Object.assign({}, state, {
          listSchoolCalendar: action.payload
        })
      case types.LIST_SCHOOL_CIRCULAR:
        return Object.assign({}, state, {
          listSchoolCircular: action.payload
        })
      case types.LOADER_STATUS:
        return Object.assign({}, state, {
          loaderStatus: action.payload
        })
        
        
      default:
        return state
    }
  }