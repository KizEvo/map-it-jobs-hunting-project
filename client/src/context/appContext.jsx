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
} from './action'

const initialState = {
  isLoading: false,
  darkMode: false,
  showSidebar: false,
  showAlert: false,
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

  const fetchJobs = async () => {
    dispatch({ type: FETCH_JOBS_BEGIN })
    try {
      const response = await fetch('/api/v1/jobs')
      const data = await response.json()
      dispatch({ type: FETCH_JOBS_SUCCESS, payload: data.jobs })
    } catch (error) {
      console.log(error)
      dispatch({ type: FETCH_JOBS_ERROR, payload: error.message })
    }
    clearAlert()
  }

  return (
    <AppContext.Provider
      value={{ ...state, toggleDarkMode, fetchJobs, displayAlert }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
