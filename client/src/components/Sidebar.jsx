import { useState } from 'react'
import JobSearchForm from './JobSearchForm'
import JobDetails from './JobDetails'
import Breadcrumb from './Breadcrumb'

const Sidebar = (props) => {
  const [sections, setSections] = useState(['Search'])

  const addSectionHandler = (newSection) => {
    setSections((prevState) => {
      return [...prevState, newSection]
    })
  }

  const jobDetails = sections.find((element) => element === 'Job Details')

  const isRootSection = sections.length === 1

  return (
    <aside
      className={`fixed w-full sm:w-custom-sidebar z-10 top-0 h-screen border-y-0 border-l-0 border dark:border-slate-800 border-slate-300 dark:bg-gray-900 bg-slate-100 transition-left ease-in-out delay-150 ${
        props.showSidebar ? 'left-0' : '-left-full'
      }`}
    >
      <div className='container flex flex-col p-5 h-full gap-8'>
        <section className='flex flex-grow-0 flex-col justify-between gap-2'>
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
        </section>
        <section className='flex flex-col gap-4'>
          <Breadcrumb
            sections={sections}
            setSections={setSections}
            isRootSection={isRootSection}
          />
          {isRootSection && (
            <JobSearchForm
              addSectionHandler={addSectionHandler}
              isRootSection={isRootSection}
            />
          )}
          {jobDetails && <JobDetails />}
        </section>
      </div>
    </aside>
  )
}
export default Sidebar
