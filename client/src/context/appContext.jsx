import { useReducer } from 'react'
import { AppContext } from '../hooks/useAppContext'
import reducer from './reducer'

import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  FETCH_JOBS_BEGIN,
  FETCH_JOBS_ERROR,
  FETCH_JOBS_SUCCESS,
  TOGGLE_DARK_MODE,
  TOGGLE_JOB_SEARCH_FORM,
} from './action'

const initialState = {
  isLoading: false,
  darkMode: false,
  showSidebar: false,
  showAlert: false,
  showJobSearchForm: true,
  alertType: '',
  alertText: '',
  jobs: [],
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

  const toggleJobSearchForm = () => {
    dispatch({ type: TOGGLE_JOB_SEARCH_FORM })
  }

  const fetchJobs = async (queries) => {
    dispatch({ type: FETCH_JOBS_BEGIN })
    try {
      const response = await fetch('/api/v1/jobs')

      if (!response.ok) throw new Error('Please provide a job title or keyword')

      const data = await response.json()
      dispatch({ type: FETCH_JOBS_SUCCESS, payload: data.jobs })
      toggleJobSearchForm()
    } catch (error) {
      dispatch({ type: FETCH_JOBS_ERROR, payload: error.message })
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
        toggleJobSearchForm,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
