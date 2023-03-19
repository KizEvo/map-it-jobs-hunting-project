const Job = (props) => {
  const isJobBenefits = props.jobBenefits.length > 0

  return (
    <div className='flex flex-col gap-8 justify-around w-full text-black dark:text-white border border-slate-400 rounded-lg p-4 cursor-pointer h-full'>
      <div className='grid sm:grid-cols-2 grid-cols-1 gap-5'>
        <img
          src={props.companyLogo}
          alt={`${props.company}-logo`}
          className='dark:bg-white p-1'
        />
        <p className='font-extrabold overflow-hidden text-ellipsis'>
          {props.title}
        </p>
      </div>
      {isJobBenefits && (
        <ul>
          {props.jobBenefits.map((benefit, index) => {
            return (
              <li
                key={index}
                className='text-ellipsis overflow-hidden dark:text-slate-400 text-sm font-semibold'
              >
                . {benefit}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
export default Job
