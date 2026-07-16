import { callFunction } from './cloud'
import { startTimer, endTimer, trackError } from '@/utils/performance'
import type { Event, EventDetail } from '@/types/event'

export async function getEvents(params?: {
  page?: number
  size?: number
}): Promise<Event[]> {
  startTimer('event.getEvents')
  try {
    const result = await callFunction<Event[]>('getEvents', params)
    endTimer('event.getEvents', { count: result.length, page: params?.page, size: params?.size })
    return result
  } catch (err) {
    endTimer('event.getEvents', { success: false })
    trackError('event.getEvents.error', err as Error, params)
    throw err
  }
}

export async function createEvent(data: {
  title: string
  description: string
  images: string[]
  location: string
  startTime: number
  endTime: number
}): Promise<Event> {
  startTimer('event.createEvent')
  try {
    const result = await callFunction<Event>('createEvent', data)
    endTimer('event.createEvent', { title: data.title, imageCount: data.images.length })
    return result
  } catch (err) {
    endTimer('event.createEvent', { success: false })
    trackError('event.createEvent.error', err as Error, { title: data.title })
    throw err
  }
}

export async function getEventDetail(eventId: string): Promise<EventDetail> {
  startTimer('event.getEventDetail')
  try {
    const result = await callFunction<EventDetail>('getEventDetail', { eventId })
    endTimer('event.getEventDetail', { eventId })
    return result
  } catch (err) {
    endTimer('event.getEventDetail', { success: false })
    trackError('event.getEventDetail.error', err as Error, { eventId })
    throw err
  }
}

export async function participateEvent(eventId: string): Promise<{ success: boolean }> {
  startTimer('event.participateEvent')
  try {
    const result = await callFunction<{ success: boolean }>('participateEvent', { eventId })
    endTimer('event.participateEvent', { eventId, success: result.success })
    return result
  } catch (err) {
    endTimer('event.participateEvent', { success: false })
    trackError('event.participateEvent.error', err as Error, { eventId })
    throw err
  }
}