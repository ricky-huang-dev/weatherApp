export interface Location {
  id: number
  city: string
  country: string
  latitude: number
  longitude: number
  imageURL: number
}

export interface Weather {
  time: Date
  temperature2m: number | undefined
  rain: number | undefined
  snowfall: number | undefined
  cloudCover: number | undefined
}
