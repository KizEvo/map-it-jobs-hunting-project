import { useAppContext } from '../hooks/useAppContext'

const Alert = () => {
  const { alertText, alertType } = useAppContext()
  const bgColor = alertType === 'danger' ? 'bg-red-error' : 'bg-green-success'
  const svgAlert = alertType === 'danger' ? '/ic_error.svg' : '/ic_success.svg'
  return (
    <div
      className={`${bgColor} p-2 px-4 font-bold rounded-md flex justify-start items-center gap-5 w-full`}
    >
      <img src={svgAlert} alt='alert-type-svg' className='w-6 h-6' />
      <p>{alertText}</p>
    </div>
  )
}
export default Alert
