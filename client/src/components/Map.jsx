import { useAppContext } from '../hooks/useAppContext'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import { nightMode, dayMode, center, zoom } from '../utils/mapConfig'
import React from 'react'
import CustomMarker from './CustomMarker'

const Map = () => {
  const { darkMode, jobs } = useAppContext()
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  })

  if (!isLoaded) return <div>Loading...</div>

  return (
    <GoogleMap
      mapContainerClassName='w-full h-full z-0'
      center={center}
      zoom={zoom}
      options={{
        disableDefaultUI: true,
        styles: darkMode ? nightMode : dayMode,
      }}
    >
      {jobs.map((job) => {
        return (
          <React.Fragment key={job._id}>
            <CustomMarker {...job} />
          </React.Fragment>
        )
      })}
    </GoogleMap>
  )
}
export default Map
