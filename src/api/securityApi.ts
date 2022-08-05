import { instance } from './api';


export const securityAPI = {
  getCaptchaUrl() {
    return instance
          .get('/security/get-captcha-url')
          .then( (response) => {
            return response.data
          })
  }
}