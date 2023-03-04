import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  FETCH_JOBS_BEGIN,
  FETCH_JOBS_ERROR,
  FETCH_JOBS_SUCCESS,
  PAGINATION_JOBS_BEGIN,
  PAGINATION_JOBS_ERROR,
  PAGINATION_JOBS_SUCCESS,
  TOGGLE_DARK_MODE,
} from './action'

const reducer = (state, action) => {
  if (action.type === TOGGLE_DARK_MODE) {
    return { ...state, darkMode: !state.darkMode }
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
      totalPages: action.payload.totalPages,
      jobs: [...action.payload.jobs],
      queries: {
        ...state.queries,
        title: action.payload.queries.title,
        location: action.payload.queries.location,
        companyBusiness: action.payload.queries.companyBusiness,
        datePosted: action.payload.queries.datePosted,
      },
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
  if (action.type === PAGINATION_JOBS_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === PAGINATION_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      currentPage: action.payload.page,
      jobs: [...action.payload.jobs],
    }
  }
  if (action.type === PAGINATION_JOBS_ERROR) {
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
