import { instance, APIResponseType } from './api';

type MeResponseDataType = {
  id: number
  email: string
  login: string
}
type LoginResponseDataType = {
  userId: number
}

export const authAPI = {
  authMe() {
    return instance
              .get<APIResponseType<MeResponseDataType>>(`auth/me`)
              .then(response => {
                return response.data
              })
  },
  login(email: string, password: string, rememberMe: boolean, captcha: string | null) {
    return instance
              .post<APIResponseType<LoginResponseDataType>>('auth/login', { email, password, rememberMe, captcha })
              .then(response => {
                return response.data
              })
  },
  logout(){
    return instance
              .delete<APIResponseType>('auth/login')
              .then(response => {
                return response.data
              })
  }
}