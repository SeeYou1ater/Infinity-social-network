import { UserType } from './../types/types';
import { AppStateType } from './redux-store';
import { createSelector } from "reselect";
import { FilterType } from './usersReducer';

const getUsersSelector = (state: AppStateType): Array<UserType> => {
  return state.dataFindUsers.dataUsers;
}

export const getUsers = createSelector(getUsersSelector, (users: Array<UserType>): Array<UserType> => {
  return users.filter(u => true)
})

export const getPageSize = (state: AppStateType): number => {
  return state.dataFindUsers.pageSize;
}

export const getCurrentPage = (state: AppStateType): number => {
  return state.dataFindUsers.currentPage;
}

export const getInProgress = (state: AppStateType): boolean => {
  return state.dataFindUsers.inProgress;
}

export const getFollowingInProgress = (state: AppStateType): Array<number> => {
  return state.dataFindUsers.followingInProgress;
}

export const getFilter = (state: AppStateType): FilterType => {
  return state.dataFindUsers.filter
}