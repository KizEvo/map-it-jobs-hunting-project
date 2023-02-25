import { useAppContext } from '../hooks/useAppContext'
import JobSearchForm from './JobSearchForm'
import JobsContainer from './JobsContainer'

const Sidebar = (props) => {
  const { jobs, showJobSearchForm } = useAppContext()

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
          {showJobSearchForm && <JobSearchForm />}
        </section>
        {jobs.length > 0 ||
          (showJobSearchForm && (
            <section className='flex flex-col h-full justify-end gap-2'>
              <h1 className='font-bold text-2xl dark:text-white text-black mb-2'>
                Jobs Details
              </h1>
              <JobsContainer />
            </section>
          ))}
      </div>
    </aside>
  )
}
export default Sidebar
