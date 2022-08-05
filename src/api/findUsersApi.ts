import { instance } from './api';

export const FindUsersAPI = {
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