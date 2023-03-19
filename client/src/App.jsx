import { useState } from 'react'
import { useAppContext } from './hooks/useAppContext'
import DarkMode from './components/DarkMode'
import Sidebar from './components/Sidebar'
import Map from './components/Map'

let initialVisit = true

function App() {
  const { darkMode } = useAppContext()
  const [showSidebar, setShowSidebar] = useState(false)

  const sidebarHandler = () => {
    setShowSidebar((prevState) => !prevState)
    initialVisit = false
  }

  return (
    <section
      className={`h-screen flex flex-col justify-end ${
        darkMode ? 'dark' : 'bg-white'
      }`}
    >
      <button
        className={`z-10 fixed top-1/2 left-6 sm:block hidden ${
          initialVisit ? 'animate-pulse hover:animate-none' : ''
        } ${showSidebar ? 'sm:hidden' : ''}`}
        onClick={sidebarHandler}
      >
        <div className='flex flex-row items-center gap-5'>
          <div className='p-2 rounded-full bg-green-primary shadow-2xl shadow-green-700 hover:bg-green-primary-dark'>
            <img
              src='/right_arrow_shape.svg'
              alt='show-sidebar'
              className='w-10 h-10 svg-theme-color-white'
            />
          </div>
          <p
            className={`dark:text-black dark:bg-white text-white bg-slate-700 p-2 rounded-md ${
              initialVisit ? '' : 'hidden'
            }`}
          >
            Explore new job opportunities
          </p>
        </div>
      </button>
      <div
        className={`z-10 absolute flex justify-around sm:hidden dark:bg-gray-900 bg-amber-50 w-full h-14 dark:border-green-primary-dark border-t-2 border-green-primary ${
          showSidebar ? 'hidden' : ''
        }`}
      >
        <button
          className='w-full h-full flex justify-center items-center dark:hover:bg-slate-700 hover:bg-slate-300'
          onClick={sidebarHandler}
        >
          <img
            src='/ic_search.svg'
            alt='search-job'
            className='svg-theme-color w-6 h-6'
          />
        </button>
        <DarkMode />
      </div>
      <div className='hidden sm:block z-10'>
        <DarkMode />
      </div>
      <Map />
      <Sidebar showSidebar={showSidebar} sidebarHandler={sidebarHandler} />
    </section>
  )
}

export default App
