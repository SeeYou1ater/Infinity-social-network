import profileReducer, { deletePostActionCreator, newPostActionCreator } from "./profileReducer";

let initialState = {
  dataPosts: [
    { message: "Hello World!", likes: '3', id: 0 }, { message: "Working...", likes: '7', id: 1 }, { message: "Learning...", likes: '5', id: 2 }
  ],
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

it('length of posts should be incremented', () => {
  //1.initial test data
  let action = newPostActionCreator('Hello!')

  //2. create action for test

  let newState = profileReducer(initialState, action)

  //3.expectation

  expect(newState.dataPosts.length).toBe(4);
  expect(newState.dataPosts[3].message).toBe('Hello!');
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

it('last post should be named like incremented post message', () => {
  //1.initial test data
  let action = newPostActionCreator('Hello!')

  //2. create action for test

  let newState = profileReducer(initialState, action)

  //3.expectation
  expect(newState.dataPosts[3].message).toBe('Hello!');
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

it('after deleting posts length should be decremented', () => {
  //1.initial test data
  let action = deletePostActionCreator(1)

  //2. create action for test

  let newState = profileReducer(initialState, action)

  //3.expectation
  expect(newState.dataPosts.length).toBe(2);
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

it('after deleting posts length shouldn\'t be decremented if id is incorrect', () => {
  //1.initial test data
  let action = deletePostActionCreator(100)

  //2. create action for test

  let newState = profileReducer(initialState, action)

  //3.expectation
  expect(newState.dataPosts.length).toBe(3);
})

