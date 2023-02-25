import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  FETCH_JOBS_BEGIN,
  FETCH_JOBS_ERROR,
  FETCH_JOBS_SUCCESS,
  TOGGLE_DARK_MODE,
  TOGGLE_JOB_SEARCH_FORM,
} from './action'

const reducer = (state, action) => {
  if (action.type === TOGGLE_DARK_MODE) {
    return { ...state, darkMode: !state.darkMode }
  }
  if (action.type === TOGGLE_JOB_SEARCH_FORM) {
    return { ...state, showJobSearchForm: !state.showJobSearchForm }
  }
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertText: action.payload.message || state.alertText,
      alertType: action.payload.type || state.alertType,
    }
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertText: '',
      alertType: '',
    }
  }
  if (action.type === FETCH_JOBS_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === FETCH_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: 'Finished! New jobs are displayed on the map',
      alertType: 'success',
      jobs: [...action.payload],
    }
  }
  if (action.type === FETCH_JOBS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload,
      alertType: 'danger',
    }
  }

  return state
}

export default reducer
