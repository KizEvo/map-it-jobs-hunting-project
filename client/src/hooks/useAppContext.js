import { useContext, createContext } from 'react'

const AppContext = createContext({
  isLoading: false,
  darkMode: false,
  showSidebar: false,
  showAlert: false,
  showJobSearchForm: true,
  alertType: '',
  alertText: '',
  jobs: [],
  toggleDarkMode: () => {},
  toggleJobSearchForm: () => {},
  fetchJobs: async () => {},
  displayAlert: () => {},
})

const useAppContext = () => {
  return useContext(AppContext)
}

export { useAppContext, AppContext }
