
export type ContactsType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}

export type PostType = {
  postText: string
  likes: number
  id?: number
}

export type PhotosType = {
  small: string | null
  large: string | null
}

export type ProfileType = {
  aboutMe: string | null
  userId: number | null
  lookingForAJob: boolean
  lookingForAJobDescription: string | null
  fullName: string | null
  contacts: ContactsType
  photos: PhotosType | null
}

export type UserType = {
  id: number
  name: string
  status: string
  photos: PhotosType
  followed: boolean
}