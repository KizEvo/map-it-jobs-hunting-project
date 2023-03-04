import JobsContainer from './JobsContainer'
import PaginationBtn from './PaginationBtn'

const JobDetails = () => {
  return (
    <article className='flex flex-col h-full gap-4'>
      <JobsContainer />
      <PaginationBtn />
    </article>
  )
}
export default JobDetails
