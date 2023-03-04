import { useAppContext } from '../hooks/useAppContext'
import { useRef, useState, useEffect } from 'react'
import Alert from './Alert'
import JobSearchOption from './JobSearchOption'

const initialOptionState = {
  location: '',
  companyBusiness: '',
  datePosted: '',
}

const JobSearchForm = (props) => {
  const { fetchJobs, displayAlert, showAlert, isLoading } = useAppContext()
  const [options, setOptions] = useState(initialOptionState)
  const inputRef = useRef()

  const formHandler = (e) => {
    e.preventDefault()

    const jobInput = inputRef.current.value

    if (jobInput.trim() === '') {
      displayAlert('Job title must not be empty', 'danger')
      return
    }

    if (jobInput.length > 150) {
      displayAlert('Input text must not exceed 150 words', 'danger')
      return
    }

    const optionValues = Object.values(options)
    const optionProperties = Object.keys(initialOptionState)

    for (let i = 0; i < optionProperties.length; i++) {
      if (optionValues[i].includes('All')) optionValues[i] = ''
      if (optionValues[i] !== '')
        optionValues[i] = optionValues[i].toLowerCase()
    }

    const queries = { ...initialOptionState }

    let i = 0
    for (const prop in queries) {
      queries[prop] = optionValues[i]
      i++
    }

    queries.title = jobInput

    fetchJobs(queries)
    props.addSectionHandler('Job Details')
  }

  const optionsHandler = (e) => {
    setOptions((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  return (
    <>
      {showAlert && <Alert />}
      <form className='flex flex-col gap-8' onSubmit={formHandler}>
        <div className='flex flex-col gap-2'>
          <label
            htmlFor='title-input'
            className='flex justify-between items-center'
          >
            <h4 className='dark:text-white text-black'>Title</h4>
            <p className='font-light text-slate-400 text-xs'> (Required)</p>
          </label>
          <input
            ref={inputRef}
            id='title-input'
            className='theme__box-ui-text placeholder:italic placeholder:font-light placeholder:text-slate-400 form__job-search'
            placeholder='Enter a job keyword...'
            type='text'
            name='search'
          />
        </div>
        <JobSearchOption
          id='city-select-option'
          labelText='City'
          labelMutedText='Optional'
          options={['All', 'Ha Noi', 'Ho Chi Minh', 'Da Nang', 'Others']}
          value={options.location}
          name='location'
          handleChange={optionsHandler}
        />
        <JobSearchOption
          id='business-select-option'
          labelText='Business'
          labelMutedText='Optional'
          options={['All', 'Outsourcing', 'Product']}
          value={options.companyBusiness}
          name='companyBusiness'
          handleChange={optionsHandler}
        />
        <JobSearchOption
          id='date-select-option'
          labelText='Date'
          labelMutedText='Optional'
          options={['Latest', 'Oldest']}
          value={options.datePosted}
          name='datePosted'
          handleChange={optionsHandler}
        />
        <button
          type='submit'
          className='btn-primary disabled:bg-green-primary-dark mt-6'
          disabled={showAlert || isLoading}
        >
          Search
        </button>
      </form>
    </>
  )
}
export default JobSearchForm
