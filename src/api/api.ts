import { ProfileType } from './../types/types';
import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers:  { 
    "API-KEY" : "1c91bcd7-1f26-496e-ac0c-dd6fe8ef5a1f"
    }
})

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeCaptchaEnum {
  CaptchaIsRequired = 10,
}

export const UsersAPI = {
  getUsers(currentPage = 1, pageSize = 5) {
    return instance
              .get(`users?page=${currentPage}&count=${pageSize}`)
              .then(response => { 
                return response.data
              })
  },
  followUser(userId: number) {
    return instance
              .post(`follow/${userId}`)
              .then(response => { 
                return response.data
              })
  },
  unfollowUser(userId: number) {
    return instance
              .delete(`follow/${userId}`)
              .then(response => { 
                return response.data
              })
  } 
}

type MeResponseType = {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: ResultCodesEnum
  messages: Array<string>
}

type LoginResponseType = {
  data: {
    userId: number
  }
  resultCode: ResultCodesEnum | ResultCodeCaptchaEnum
  messages: Array<string>
}

export const authAPI = {
  authMe() {
    return instance
              .get<MeResponseType>(`auth/me`)
              .then(response => {
                return response.data
              })
  },
  login(email: string, password: string, rememberMe: boolean, captcha: string | null) {
    return instance
              .post<LoginResponseType>('auth/login', { email, password, rememberMe, captcha })
              .then(response => {
                return response.data
              })
  },
  logout(){
    return instance
              .delete('auth/login')
              .then(response => {
                return response.data
              })
  }
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance
          .get('/security/get-captcha-url')
          .then( (response) => {
            return response.data
          })
  }
}

export const profileAPI = {
  getProfile(profileId: number) {
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
