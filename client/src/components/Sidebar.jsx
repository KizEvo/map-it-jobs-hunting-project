import { useRef } from 'react'
import { useAppContext } from '../hooks/useAppContext'
import Alert from './Alert'
import JobsContainer from './JobsContainer'

const Sidebar = (props) => {
  const { fetchJobs, displayAlert, showAlert } = useAppContext()
  const inputRef = useRef()

  const formHandler = (e) => {
    e.preventDefault()
    const jobInput = inputRef.current.value
    if (jobInput.trim() === '') {
      displayAlert('Input text must not be empty', 'danger')
      return
    }

    if (jobInput.length > 150) {
      displayAlert('Input text must not exceed 150 words', 'danger')
      return
    }

    fetchJobs()
  }

  return (
    <aside
      className={`fixed w-full sm:w-custom-sidebar z-10 top-0 h-screen border-y-0 border-l-0 border dark:border-slate-800 border-slate-300 dark:bg-gray-900 bg-white transition-left ease-in-out delay-150 ${
        props.showSidebar ? 'left-0' : '-left-full'
      }`}
    >
      <div className='container flex flex-col p-5 h-full'>
        <section className='flex flex-grow-0 flex-col justify-between gap-8'>
          <button onClick={props.sidebarHandler} className='self-end'>
            <img
              src='/ic_remove.svg'
              alt='close-button'
              className='svg-theme-color w-6 h-6'
            />
          </button>
          <div className='flex justify-center'>
            <h1 className='text-7xl px-5 bg-green-primary rounded-full shadow-md shadow-lime-900'>
              J
            </h1>
          </div>
          {showAlert && <Alert />}
          <form className='flex flex-col gap-8' onSubmit={formHandler}>
            <input
              ref={inputRef}
              className='theme__box-ui-text w-full placeholder:italic placeholder:font-light placeholder:text-slate-400 rounded-md py-2 px-4 hover:ring-1 ring-slate-300
            dark:hover:ring-0 focus:outline-none sm:text-sm dark:hover:bg-slate-700'
              placeholder='Enter a job keyword...'
              type='text'
              name='search'
            />
            <button className='btn-primary'>Search</button>
          </form>
        </section>
        <section className='flex flex-col h-full justify-end gap-2'>
          <h1 className='font-bold text-2xl dark:text-white text-black mb-2'>
            Jobs Details
          </h1>
          <JobsContainer />
        </section>
      </div>
    </aside>
  )
}
export default Sidebar
