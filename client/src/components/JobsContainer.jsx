import { useAppContext } from '../hooks/useAppContext'
import Job from './Job'

const JobsContainer = () => {
  const { jobs } = useAppContext()

  if (jobs.length <= 0) {
    return (
      <div className='flex flex-col gap-4 justify-end items-center h-96'>
        <div className='p-4 rounded-md bg-red-error'>
          <img src='ic_error.svg' className='w-6 h-6' alt='no-jobs-error' />
        </div>
        <h1 className='text-2xl font-bold dark:text-white text-black'>
          Oops, no jobs were found
        </h1>
        <p className='text-slate-400'>
          Tip: <span className='italic'>Try other job keywords</span>
        </p>
        <p className='text-slate-400'>
          Return by clicking the{' '}
          <span className='italic underline'>Search</span> breadcrumb
        </p>
      </div>
    )
  }

  return (
    <ul className='dark:bg-dark-paper overflow-y-scroll h-custom-jobs-details rounded-lg scrollbar border border-slate-300 dark:border-none'>
      {jobs.map((job) => {
        return (
          <li key={job._id} className='p-4'>
            <Job {...job} />
          </li>
        )
      })}
    </ul>
  )
}
export default JobsContainer
