import { useAppContext } from '../hooks/useAppContext'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { nightMode, dayMode, center } from '../utils/mapConfig'

const Map = () => {
  const { darkMode } = useAppContext()
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  })

  if (!isLoaded) return <div>Loading...</div>

  return (
    <GoogleMap
      mapContainerClassName='w-full h-full z-0'
      center={center}
      zoom={10}
      options={{
        disableDefaultUI: true,
        styles: darkMode ? nightMode : dayMode,
      }}
    >
      <Marker
        position={{ lat: 10.7895223, lng: 106.6876004 }}
        title={'Hello world'}
      />
    </GoogleMap>
  )
}
export default Map
