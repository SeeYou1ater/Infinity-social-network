import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers:  { 
    "API-KEY" : "1c91bcd7-1f26-496e-ac0c-dd6fe8ef5a1f"
    }
})

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeCaptchaEnum {
  CaptchaIsRequired = 10,
}










