import { PhotosType, ProfileType } from './../types/types';
import { instance, APIResponseType } from './api';


type SavePhotoResponseDataType = {
  photos: PhotosType
}

export const profileAPI = {
  getProfile(profileId: number | null) {
    return instance
          .get<ProfileType>(`profile/${profileId}`)
          .then((response) => {
            return response.data
          })
  },
  getStatus(profileId: number) {
    return instance
          .get<string>(`profile/status/${profileId}`)
          .then((response) => {
            return response.data
          })
  },
  updateStatus(status: string) {
    return instance 
          .put<APIResponseType>(`profile/status/`, {status: status})
          .then((response) => {
            return response.data
          })
  },
  savePhoto(filePhoto: any) {
    let dataFile = new FormData()
    dataFile.append('image', filePhoto);
    return instance
          .put<APIResponseType<SavePhotoResponseDataType>>('profile/photo/', dataFile, {headers: {'Content-Type': 'multipart/form-data'}})
          .then((response) => {
            return response.data
          })
  },
  saveProfile(editDataAboutMe: ProfileType) {
    return instance
          .put<APIResponseType>('profile/', editDataAboutMe)
          .then((response) => {
            return response.data
          })
  }
}