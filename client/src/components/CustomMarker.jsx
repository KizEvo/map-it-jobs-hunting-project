import { OverlayViewF, OverlayView } from '@react-google-maps/api'
import { useState } from 'react'
import useDebounce from '../hooks/useDebounce'

const CustomMarker = (props) => {
  const [modal, setModal] = useState(false)

  const debouncedModalBoolean = useDebounce(modal, 500)

  const onMouseLeaveModalHandler = () => {
    setModal(false)
  }

  const onMouseOverModalHandler = () => {
    setModal(true)
  }

  return (
    <OverlayViewF
      position={props.geometry.location}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div
        className='relative'
        onMouseOver={onMouseOverModalHandler}
        onMouseLeave={onMouseLeaveModalHandler}
      >
        <img src='Logo.png' alt='custom-marker' className='w-12 h-12' />
        <div
          className={`z-20 text-black absolute top-12 left-12 bg-white rounded-r-2xl rounded-b-2xl transition-all duration-200 ease-in-out ${
            debouncedModalBoolean
              ? 'opacity-100 p-10 w-72'
              : 'opacity-0 p-0 w-0'
          }`}
          onMouseOver={onMouseOverModalHandler}
          onMouseLeave={onMouseLeaveModalHandler}
        >
          <h1 className='font-bold text-base'>{props.title}</h1>
          <a
            href={props.companyWebsite}
            target='_blank'
            className='underline text-sm text-blue-400'
          >
            {props.company}
          </a>
          <div className='text-xs'>
            <p className='capitalize'>{props.companyBusiness}</p>
            <p>HQ: {props.companyLocation}</p>
            <p>{props.location}</p>
          </div>
        </div>
      </div>
    </OverlayViewF>
  )
}
export default CustomMarker
