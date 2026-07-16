export interface User {
  _id: string
  _openid: string
  nickname: string
  avatar: string
  createTime: number
}

export interface LoginResult {
  openid: string
  user?: User
}