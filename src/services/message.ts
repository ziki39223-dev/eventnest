import { callFunction } from './cloud'
import type { Message } from '@/types/message'

export async function getMessages(params?: {
  page?: number
  size?: number
}): Promise<Message[]> {
  return callFunction<Message[]>('getMessages', params)
}

export async function sendMessage(data: {
  toOpenid: string
  content: string
}): Promise<{ success: boolean }> {
  return callFunction<{ success: boolean }>('sendMessage', data)
}