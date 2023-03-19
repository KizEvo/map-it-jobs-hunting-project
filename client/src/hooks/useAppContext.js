import { useContext, createContext } from 'react'

const AppContext = createContext({
  isLoading: false,
  darkMode: false,
  showSidebar: false,
  showAlert: false,
  alertType: '',
  alertText: '',
  totalPages: 0,
  currentPage: 1,
  jobs: [],
  queries: {
    title: '',
    location: '',
    companyBusiness: '',
    datePosted: '',
    page: '',
  },
  toggleDarkMode: () => {},
  displayAlert: () => {},
  fetchJobs: async () => {},
  paginationJobs: async () => {},
})

const useAppContext = () => {
  return useContext(AppContext)
}

export { useAppContext, AppContext }
