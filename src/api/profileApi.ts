import { ProfileType } from './../types/types';
import { instance } from './api';


export const profileAPI = {
  getProfile(profileId: number | null) {
    return instance
          .get(`profile/${profileId}`)
          .then((response) => {
            return response.data
          })
  },
  getStatus(profileId: number) {
    return instance
          .get(`profile/status/${profileId}`)
          .then((response) => {
            return response.data
          })
  },
  updateStatus(status: string) {
    return instance 
          .put(`profile/status/`, {status: status})
          .then((response) => {
            return response.data
          })
  },
  savePhoto(filePhoto: any) {
    let dataFile = new FormData()
    dataFile.append('image', filePhoto);
    return instance
          .put('profile/photo/', dataFile, {headers: {'Content-Type': 'multipart/form-data'}})
          .then((response) => {
            return response.data
          })
  },
  saveProfile(editDataAboutMe: ProfileType) {
    return instance
          .put('profile/', editDataAboutMe)
          .then((response) => {
            return response.data
          })
  }
}