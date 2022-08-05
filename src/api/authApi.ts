import { instance, ResultCodeCaptchaEnum, ResultCodesEnum } from './api';

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