import { useAppContext } from '../hooks/useAppContext'

const DarkMode = () => {
  const { darkMode, toggleDarkMode } = useAppContext()

  const imageTheme = darkMode ? '/dark-mode.svg' : '/light-mode.svg'

  return (
    <button
      onClick={toggleDarkMode}
      className='z-10 w-full h-full sm:w-auto sm:h-auto sm:fixed top-6 right-6 sm:border sm:rounded-md sm:p-1 sm:bg-amber-50 dark:sm:bg-slate-800 dark:sm:border-slate-100 sm:border-slate-800 flex justify-center items-center dark:hover:bg-slate-700 hover:bg-slate-300'
    >
      <img src={imageTheme} alt='theme' className='w-6 h-6 svg-theme-color' />
    </button>
  )
}
export default DarkMode
