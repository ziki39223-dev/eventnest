import { callFunction } from './cloud'
import { withTracking } from '@/utils/performance'
import type { Message } from '@/types/message'

export function getMessages(params?: {
  page?: number
  size?: number
}): Promise<Message[]> {
  return withTracking(
    'message.getMessages',
    () => callFunction<Message[]>('getMessages', params),
    {
      successData: (result) => ({ count: result.length, page: params?.page, size: params?.size })
    }
  )
}

export function sendMessage(data: {
  toOpenid: string
  content: string
}): Promise<{ success: boolean }> {
  return withTracking(
    'message.sendMessage',
    () => callFunction<{ success: boolean }>('sendMessage', data),
    { errorData: { toOpenid: data.toOpenid } }
  )
}
