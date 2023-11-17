import { useQuery } from '@tanstack/react-query'
import weatherapi from '../apis/weatherapi.ts'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Home() {
  const [defaultLocation, setDefaultLocation] = useState({
    city: 'Auckland',
    country: 'New Zealand',
    latitude: -36.86,
    longitude: 174.54,
    imageURL:
      'https://a.cdn-hotels.com/gdcs/production133/d294/4e4195aa-b9ca-42cd-923f-e8a65c8c5c7b.jpg',
  })

  let num = 1

  const { data, isError, isLoading } = useQuery({
    queryKey: ['weatherData'],
    queryFn: getWeatherData,
  })

  if (isError) {
    return <p>There is an error sorry!</p>
  }

  if (isLoading) {
    return <p>Your page is loading...</p>
  }

  async function getWeatherData() {
    const weatherData = await weatherapi(
      defaultLocation.latitude,
      defaultLocation.longitude,
    )
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
      <div key={defaultLocation.city} className="hero-image">
        <img src={defaultLocation.imageURL} alt={defaultLocation.city} />
        <div className="hero-text">
          <h1>{defaultLocation.city}</h1>
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
