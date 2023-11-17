import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getLocations } from '../apis/apiClient'
import weatherapi from '../apis/weatherapi.ts'

export default function LocationDetails() {
  const idObject = useParams()
  const id = idObject.id
  const {
    data: locations,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['locations'],
    queryFn: getLocations,
  })

  const { data } = useQuery({
    queryKey: ['weatherData'],
    queryFn: getWeatherData,
  })

  if (isError) {
    return <p>There is an error sorry!</p>
  }

  if (isLoading) {
    return <p>Your page is loading...</p>
  }

  const city = locations.find((city) => city.id == Number(id))
  console.log(city)
  console.log(id)

  let num = 1

  async function getWeatherData() {
    const weatherData = await weatherapi(city?.latitude, city?.longitude)
    console.log(weatherData)
    return weatherData
  }
  if (data.temperature2m > 28) {
    num = 6
  }
  if (data.temperature2m < 5) {
    num = 5
  }
  if (data.cloudCover > 10) {
    num = 2
  }
  if (data.rain > 0) {
    num = 3
  }
  if (data.snowfall > 0) {
    num = 4
  }

  return (
    <>
      <div key={city?.id} className="hero-image">
        <img src={city?.imageURL} alt={city?.city} />
        <div className="hero-text">
          <h1>{city?.city}</h1>
          <div className="image-container">
            <div className="weather-icon">
              <h2>{data.temperature2m?.toFixed(0)}°C</h2>
              <img
                className="icon"
                src={`/client/public/images/icon${num}.png`}
                alt={'the sun'}
              ></img>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
