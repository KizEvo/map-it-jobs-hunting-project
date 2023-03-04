import { useAppContext } from '../hooks/useAppContext'

const PaginationBtn = () => {
  const { paginationJobs, currentPage, totalPages, jobs } = useAppContext()

  const pageIncrementHandler = () => {
    let newPage = currentPage + 1
    if (newPage > totalPages) newPage = 1
    paginationJobs(newPage)
  }

  const pageDecrementHandler = () => {
    let newPage = currentPage - 1
    if (newPage <= 0) newPage = totalPages
    paginationJobs(newPage)
  }

  if (jobs.length <= 0) {
    return
  }

  return (
    <div className='flex justify-center gap-5'>
      <div className='flex items-center gap-5 border border-slate-300 dark:border-none dark:bg-dark-paper rounded-xl'>
        <button
          type='button'
          onClick={pageDecrementHandler}
          className='dark:hover:bg-slate-700 hover:bg-slate-200 p-2 rounded-l-xl'
        >
          <img
            src='left_arrow_shape.svg'
            alt='pagination-arrow-left'
            className='svg-theme-color w-3'
          />
        </button>
        <div className='p-1 dark:border-none text-black dark:text-white'>
          <p>
            {currentPage}/{totalPages}
          </p>
        </div>
        <button
          type='button'
          onClick={pageIncrementHandler}
          className='dark:hover:bg-slate-700 hover:bg-slate-200 p-2 rounded-r-xl'
        >
          <img
            src='right_arrow_shape.svg'
            alt='pagination-arrow-right'
            className='svg-theme-color w-3'
          />
        </button>
      </div>
    </div>
  )
}
export default PaginationBtn
