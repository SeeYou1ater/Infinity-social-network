import usersReducer, { actions, UsersReducerStateType } from "./usersReducer"

let state: UsersReducerStateType

beforeEach( () => {
  state = {
    dataUsers: [{id: 0, followed: false, name: 'name 0', photos: {small: null, large: null}, status: 'status 0'}, 
                {id: 1, followed: true, name: 'name 1', photos: {small: null, large: null}, status: 'status 1'},
                {id: 2, followed: false, name: 'name 2', photos: {small: null, large: null}, status: 'status 2'}, 
                {id: 3, followed: true, name: 'name 3', photos: {small: null, large: null}, status: 'status 3'}],
    pageSize: 5,
    currentPage: 1,
    inProgress: false,
    followingInProgress: []
  }
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