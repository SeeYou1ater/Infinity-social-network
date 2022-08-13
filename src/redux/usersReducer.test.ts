import { ResultCodesEnum, APIResponseType } from './../api/api';
import { FindUsersAPI } from './../api/findUsersApi';
import usersReducer, { actions, FollowThunkCreator, UnfollowThunkCreator, UsersReducerStateType } from "./usersReducer"
jest.mock('./../api/findUsersApi') // подменили путь API на фейк (mock)

const FindUsersAPIMock = FindUsersAPI as jest.Mocked<typeof FindUsersAPI>
       
const result: APIResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {},
}

let state: UsersReducerStateType

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach( () => {
  state = {
    dataUsers: [{id: 0, followed: false, name: 'name 0', photos: {small: null, large: null}, status: 'status 0'}, 
                {id: 1, followed: true, name: 'name 1', photos: {small: null, large: null}, status: 'status 1'},
                {id: 2, followed: false, name: 'name 2', photos: {small: null, large: null}, status: 'status 2'}, 
                {id: 3, followed: true, name: 'name 3', photos: {small: null, large: null}, status: 'status 3'}],
    pageSize: 5,
    currentPage: 1,
    inProgress: false,
    followingInProgress: [],
    filter: {
      term: ''
    }
  }

  dispatchMock.mockClear()
  getStateMock.mockClear()
  FindUsersAPIMock.followUser.mockClear()
  FindUsersAPIMock.unfollowUser.mockClear()
})

test('follow success', () => {

  const newState = usersReducer(state, actions.followActionCreator(2))

  expect(newState.dataUsers[0].followed).toBeFalsy()
  expect(newState.dataUsers[1].followed).toBeTruthy()
  expect(newState.dataUsers[2].followed).toBeTruthy()
  expect(newState.dataUsers[3].followed).toBeTruthy()
})

test('unfollow success', () => {

  const newState = usersReducer(state, actions.unfollowActionCreator(3))

  expect(newState.dataUsers[0].followed).toBeFalsy()
  expect(newState.dataUsers[1].followed).toBeTruthy()
  expect(newState.dataUsers[2].followed).toBeFalsy()
  expect(newState.dataUsers[3].followed).toBeFalsy()
})

test('follow thunk should be success', async () => {
  FindUsersAPIMock.followUser.mockReturnValue(Promise.resolve(result)) 

  const thunkMock = FollowThunkCreator(1)

  await thunkMock(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingProgressActionCreator(true, 1))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followActionCreator(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingProgressActionCreator(false, 1))
})

test('unfollow thunk should be success', async () => {
  FindUsersAPIMock.unfollowUser.mockReturnValue(Promise.resolve(result))

  const thunkMock = UnfollowThunkCreator(3)

  await thunkMock(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingProgressActionCreator(true, 3))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowActionCreator(3))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingProgressActionCreator(false, 3))
})
