import { createSelector } from "reselect";

const getUsersSelector = (state) => {
  return state.dataFindUsers.dataUsers;
}

export const getUsers = createSelector(getUsersSelector, (users) => {
  return users.filter(u => true)
})

export const getPageSize = (state) => {
  return state.dataFindUsers.pageSize;
}

export const getUsersCount = (state) => {
  return state.dataFindUsers.totalUsersCount;
}

export const getCurrentPage = (state) => {
  return state.dataFindUsers.currentPage;
}

export const getInProgress = (state) => {
  return state.dataFindUsers.inProgress;
}

export const getFollowingInProgress = (state) => {
  return state.dataFindUsers.followingInProgress;
}