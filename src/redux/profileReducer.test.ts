import profileReducer, { actions } from "./profileReducer";

let initialState = {
  dataPosts: [
    { postText: "Hello World!", likes: 3, id: 0 }, 
    { postText: "Working...", likes: 7, id: 1 }, 
    { postText: "Learning...", likes: 5, id: 2 }
  ],
  profile: null,
  status: '',
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test('length of posts should be incremented', () => {
  //1.initial test data
  let action = actions.newPostActionCreator('Hello!')

  //2. create action for test

  let newState = profileReducer(initialState, action)

  //3.expectation

  expect(newState.dataPosts.length).toBe(4);
  expect(newState.dataPosts[3].postText).toBe('Hello!');
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test('last post should be named like incremented post message', () => {
  //1.initial test data
  let action = actions.newPostActionCreator('Hello!')

  //2. create action for test

  let newState = profileReducer(initialState, action)

  //3.expectation
  expect(newState.dataPosts[3].postText).toBe('Hello!');
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test('after deleting posts length should be decremented', () => {
  //1.initial test data
  let action = actions.deletePostActionCreator(1)

  //2. create action for test

  let newState = profileReducer(initialState, action)

  //3.expectation
  expect(newState.dataPosts.length).toBe(2);
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

test('after deleting posts length shouldn\'t be decremented if id is incorrect', () => {
  //1.initial test data
  let action = actions.deletePostActionCreator(100)

  //2. create action for test

  let newState = profileReducer(initialState, action)

  //3.expectation
  expect(newState.dataPosts.length).toBe(3);
})

