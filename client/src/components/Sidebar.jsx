const Sidebar = (props) => {
  const fetchJobs = async () => {
    const response = await fetch('/api/v1/jobs')
    const data = await response.json()
    console.log(data)
  }

  const imageTheme = props.darkMode ? '/dark-mode.svg' : 'light-mode.svg'

  return (
    <aside className='absolute top-0 left-0 dark:bg-gray-900 h-screen border-y-0 border-l-0 border border-slate-800'>
      <div className='container flex flex-col gap-8 p-5'>
        <div className='container flex flex-col justify-between'>
          <div className='flex justify-center items-end mb-32'>
            <h1 className='text-7xl bg-green-primary rounded-full border px-5'>
              J
            </h1>
          </div>
          <div className='flex gap-6'>
            <input
              className='theme__box-ui-text w-full placeholder:italic placeholder:font-light placeholder:text-slate-400 rounded-md py-2 px-4 hover:ring-1 ring-slate-300
            dark:hover:ring-0 focus:outline-none sm:text-sm dark:hover:bg-slate-700'
              placeholder='Search for anything...'
              type='text'
              name='search'
            />
            <button
              onClick={props.toggleTheme}
              className='border rounded-md p-2 dark:bg-slate-800 dark:border-slate-800'
            >
              <img
                src={imageTheme}
                alt='theme'
                className='w-5 h-5 svg-theme-color'
              />
            </button>
          </div>
        </div>
        <button type='button' className='btn-primary'>
          Click me
        </button>
      </div>
    </aside>
  )
}
export default Sidebar
