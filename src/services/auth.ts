import { callFunction } from './cloud'
import { withTracking } from '@/utils/performance'
import type { User, LoginResult } from '@/types/user'

export function login(): Promise<LoginResult> {
  return withTracking(
    'auth.login',
    () => callFunction<LoginResult>('login'),
    { successData: (result) => ({ hasUser: !!result.user }) }
  )
}

export function getUserInfo(openid: string): Promise<User> {
  return withTracking(
    'auth.getUserInfo',
    () => callFunction<User>('getUserInfo', { openid }),
    { errorData: { openid } }
  )
}

export function updateUserInfo(data: {
  nickname: string
  avatar: string
}): Promise<User> {
  return withTracking(
    'auth.updateUserInfo',
    () => callFunction<User>('updateUserInfo', data),
    {
      successData: () => ({ nickname: data.nickname }),
      errorData: { nickname: data.nickname }
    }
  )
}
