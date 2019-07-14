import { NativeModules } from 'react-native'
import GoogleApi from './googleApi'

const { RNGeocoder } = NativeModules

export default {
  apiKey: null,

  fallbackToGoogle(key: string) {
    this.apiKey = key
  },

  geocodePosition(position: { lat: number, lng: number } | null, locale: string = 'en') {
    if (!position || !position.lat || !position.lng) {
      return Promise.reject(new Error('invalid position: {lat, lng} required'))
    }

    return RNGeocoder.geocodePosition(position, locale).catch((err: any) => {
      if (!this.apiKey) {
        throw err
      }
      return GoogleApi.geocodePosition(this.apiKey, position)
    })
  },

  geocodeAddress(address: string) {
    if (!address) {
      return Promise.reject(new Error('address is null'))
    }

    return RNGeocoder.geocodeAddress(address).catch((err: any) => {
      if (!this.apiKey) {
        throw err
      }
      return GoogleApi.geocodeAddress(this.apiKey, address)
    })
  },
}
