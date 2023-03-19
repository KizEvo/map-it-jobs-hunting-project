import { useReducer } from 'react'
import { AppContext } from '../hooks/useAppContext'
import { jobsApi } from '../utils/jobsApi'
import reducer from './reducer'

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

const initialState = {
  isLoading: false,
  darkMode: false,
  showSidebar: false,
  showAlert: false,
  alertType: '',
  alertText: '',
  jobs: [],
  totalPages: 0,
  currentPage: 1,
  queries: {
    title: '',
    location: '',
    companyBusiness: '',
    datePosted: '',
    page: '',
  },
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const displayAlert = (message, type) => {
    dispatch({ type: DISPLAY_ALERT, payload: { message, type } })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const toggleDarkMode = () => {
    dispatch({ type: TOGGLE_DARK_MODE })
  }

  const fetchJobs = async (queries) => {
    dispatch({ type: FETCH_JOBS_BEGIN })
    try {
      const queriesString = jobsApi(queries, false)
      const response = await fetch(queriesString)

      if (!response.ok)
        throw new Error('Could not fetch job details, please try again')

      const data = await response.json()
      dispatch({
        type: FETCH_JOBS_SUCCESS,
        payload: { jobs: data.jobs, totalPages: data.totalPages, queries },
      })
    } catch (error) {
      dispatch({ type: FETCH_JOBS_ERROR, payload: error.message })
    }
    clearAlert()
  }

  const paginationJobs = async (page) => {
    dispatch({ type: PAGINATION_JOBS_BEGIN })
    try {
      const queries = {
        location: state.queries.location,
        datePosted: state.queries.datePosted,
        companyBusiness: state.queries.companyBusiness,
        page: page,
        title: state.queries.title,
      }
      const queriesString = jobsApi(queries, true)

      const response = await fetch(queriesString)

      if (!response.ok) throw new Error('Pagination error, please try again')

      const data = await response.json()

      dispatch({
        type: PAGINATION_JOBS_SUCCESS,
        payload: { jobs: data.jobs, page },
      })
    } catch (error) {
      dispatch({ type: PAGINATION_JOBS_ERROR, payload: error.message })
    }
    clearAlert()
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        toggleDarkMode,
        fetchJobs,
        displayAlert,
        paginationJobs,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
