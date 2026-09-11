import { callFunction } from './cloud'
import { withTracking } from '@/utils/performance'
import type { Event, EventDetail } from '@/types/event'

export function getEvents(params?: {
  page?: number
  size?: number
}): Promise<Event[]> {
  return withTracking(
    'event.getEvents',
    () => callFunction<Event[]>('getEvents', params),
    {
      successData: (result) => ({ count: result.length, page: params?.page, size: params?.size })
    }
  )
}

export function createEvent(data: {
  title: string
  description: string
  images: string[]
  location: string
  startTime: number
  endTime: number
}): Promise<Event> {
  return withTracking(
    'event.createEvent',
    () => callFunction<Event>('createEvent', data),
    {
      successData: () => ({ title: data.title, imageCount: data.images.length }),
      errorData: { title: data.title }
    }
  )
}

export function getEventDetail(eventId: string): Promise<EventDetail> {
  return withTracking(
    'event.getEventDetail',
    () => callFunction<EventDetail>('getEventDetail', { eventId }),
    { errorData: { eventId } }
  )
}

export function participateEvent(eventId: string): Promise<{ success: boolean }> {
  return withTracking(
    'event.participateEvent',
    () => callFunction<{ success: boolean }>('participateEvent', { eventId }),
    { errorData: { eventId } }
  )
}
