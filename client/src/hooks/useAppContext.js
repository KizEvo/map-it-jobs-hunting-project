import { useContext, createContext } from 'react'

const AppContext = createContext({
  isLoading: false,
  darkMode: false,
  showSidebar: false,
  showAlert: false,
  alertType: '',
  alertText: '',
  jobs: [],
  toggleDarkMode: () => {},
  fetchJobs: async () => {},
  displayAlert: () => {},
})

const useAppContext = () => {
  return useContext(AppContext)
}

export { useAppContext, AppContext }
