const JobSearchOption = (props) => {
  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor={props.id} className='flex justify-between items-center'>
        <h4 className='dark:text-white text-black'>{props.labelText}</h4>
        <p className='font-light text-slate-400 text-xs'>
          ({props.labelMutedText})
        </p>
      </label>
      <select
        className='theme__box-ui-text form__job-search cursor-pointer relative placeholder:italic placeholder:font-light placeholder:text-slate-400'
        id={props.id}
        name={props.name}
        onChange={props.handleChange}
        value={props.value}
      >
        {props.options.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  )
}
export default JobSearchOption
