import * as axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers:  { 
    "API-KEY" : "1c91bcd7-1f26-496e-ac0c-dd6fe8ef5a1f"
    }
})

export const UsersAPI = {
  getUsers(currentPage = 1, pageSize = 5) {
    return instance
              .get(`users?page=${currentPage}&count=${pageSize}`)
              .then(response => { 
                return response.data
              })
  },
  followUser(userId) {
    return instance
              .post(`follow/${userId}`)
              .then(response => { 
                return response.data
              })
  },
  unfollowUser(userId) {
    return instance
              .delete(`follow/${userId}`)
              .then(response => { 
                return response.data
              })
  } 
}

export const authAPI = {
  authMe() {
    return instance
              .get(`auth/me`)
              .then(response => {
                return response.data
              })
  },
  login(email, password, rememberMe, captcha) {
    return instance
              .post('auth/login', { email, password, rememberMe, captcha})
              .then(response => {
                console.log(response.data)
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
  getProfile(profileId) {
    return instance
          .get(`profile/${profileId}`)
          .then((response) => {
            return response.data
          })
  },
  getStatus(profileId) {
    return instance
          .get(`profile/status/${profileId}`)
          .then((response) => {
            return response.data
          })
  },
  updateStatus(status) {
    return instance 
          .put(`profile/status/`, {status: status})
          .then((response) => {
            return response.data
          })
  },
  savePhoto(filePhoto) {
    let dataFile = new FormData()
    dataFile.append('image', filePhoto);
    return instance
          .put('profile/photo/', dataFile, {headers: {'Content-Type': 'multipart/form-data'}})
          .then((response) => {
            return response.data
          })
  },
  saveProfile(editDataAboutMe) {
    return instance
          .put('profile/', editDataAboutMe)
          .then((response) => {
            return response.data
          })
  }
}
