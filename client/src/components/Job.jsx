const Job = (props) => {
  const isJobBenefits = props.jobBenefits.length > 0

  return (
    <div className='flex flex-col gap-10 justify-around w-full text-black dark:text-white border border-slate-400 rounded-lg p-4 cursor-pointer h-full'>
      <div className='flex sm:flex-nowrap flex-wrap gap-5'>
        <div className='overflow-clip'>
          <img
            src={props.companyLogo}
            alt={`${props.company}-logo`}
            className='bg-white p-1'
          />
        </div>
        <p className='font-extrabold overflow-clip'>{props.title}</p>
      </div>
      {isJobBenefits && (
        <ul className='pl-5'>
          {props.jobBenefits.map((benefit, index) => {
            return (
              <li
                key={index}
                className='list-disc dark:text-slate-400 text-sm font-semibold'
              >
                {benefit}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
export default Job
