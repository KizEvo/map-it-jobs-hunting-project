import { useAppContext } from '../hooks/useAppContext'
import Job from './Job'

const JobsContainer = () => {
  const { jobs } = useAppContext()
  return (
    <ul className='bg-lime-500 overflow-y-scroll h-custom-jobs-details'>
      {jobs.map((job) => {
        return (
          <li key={job._id}>
            <Job />
          </li>
        )
      })}
    </ul>
  )
}
export default JobsContainer
