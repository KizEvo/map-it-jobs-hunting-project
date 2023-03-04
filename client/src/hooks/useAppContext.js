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
  fetchJobs: async () => {},
  paginationJobs: async () => {},
  displayAlert: () => {},
})

const useAppContext = () => {
  return useContext(AppContext)
}

export { useAppContext, AppContext }
