import { callFunction } from './cloud'
import { startTimer, endTimer, trackError } from '@/utils/performance'
import type { User, LoginResult } from '@/types/user'

export async function login(): Promise<LoginResult> {
  startTimer('auth.login')
  try {
    const result = await callFunction<LoginResult>('login')
    endTimer('auth.login', { hasUser: !!result.user })
    return result
  } catch (err) {
    endTimer('auth.login', { success: false })
    trackError('auth.login.error', err as Error)
    throw err
  }
}

export async function getUserInfo(openid: string): Promise<User> {
  startTimer('auth.getUserInfo')
  try {
    const result = await callFunction<User>('getUserInfo', { openid })
    endTimer('auth.getUserInfo', { openid })
    return result
  } catch (err) {
    endTimer('auth.getUserInfo', { success: false })
    trackError('auth.getUserInfo.error', err as Error, { openid })
    throw err
  }
}

export async function updateUserInfo(data: {
  nickname: string
  avatar: string
}): Promise<User> {
  startTimer('auth.updateUserInfo')
  try {
    const result = await callFunction<User>('updateUserInfo', data)
    endTimer('auth.updateUserInfo', { nickname: data.nickname })
    return result
  } catch (err) {
    endTimer('auth.updateUserInfo', { success: false })
    trackError('auth.updateUserInfo.error', err as Error, data)
    throw err
  }
}