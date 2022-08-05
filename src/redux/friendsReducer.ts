type UserType = {
  fullName: string
  id: number
  location: {
    country: string
    city: string
  }
}

let initialState = {
  dataFriends: [
    {fullName: 'Sergey', id: 1, location: {country: 'Russia', city: 'Moscow'}},
    {fullName: 'Rostoslav', id: 2, location: {country: 'Russia', city: 'Voronezh'}},
    {fullName: 'Igor', id: 3, location: {country: 'Russia', city: 'Moscow'}},
    {fullName: 'Vladislav', id: 4, location: {country: 'Russia', city: 'Moscow'}},
    {fullName: 'Pavel', id: 5, location: {country: 'Russia', city: 'Voronezh'}}
  ] as Array<UserType>
}

type InitialStateType = typeof initialState

let friendsReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
  return state
}


export default friendsReducer;