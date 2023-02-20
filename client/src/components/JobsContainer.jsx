import { useAppContext } from '../hooks/useAppContext'
import Job from './Job'

const JobsContainer = () => {
  const { jobs } = useAppContext()
  return (
    <ul className='dark:bg-dark-paper overflow-y-scroll h-custom-jobs-details rounded-lg scrollbar border dark:border-none'>
      {jobs.map((job) => {
        return (
          <li key={job._id} className='p-4'>
            <Job />
          </li>
        )
      })}
    </ul>
  )
}
export default JobsContainer
