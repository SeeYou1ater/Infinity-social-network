import { GetItemsType, instance, APIResponseType } from './api';

export const FindUsersAPI = {
  getUsers(currentPage = 1, pageSize = 5, term = '') {
    return instance
              .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`)
              .then(response => { 
                return response.data
              })
  },
  followUser(userId: number) {
    return instance
              .post<APIResponseType>(`follow/${userId}`)
              .then(response => { 
                return response.data
              })
  },
  unfollowUser(userId: number) {
    return instance
              .delete<APIResponseType>(`follow/${userId}`)
              .then(response => { 
                return response.data
              })
  } 
}