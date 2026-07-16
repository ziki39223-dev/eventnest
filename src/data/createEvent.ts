import type { Event } from '@/types/event'

export default function mockCreateEvent(data: {
  title: string
  description: string
  images: string[]
  location: string
  startTime: number
  endTime: number
}): Event {
  return {
    _id: 'event_' + Date.now().toString(36),
    _openid: 'mock_openid_001',
    title: data.title,
    description: data.description,
    images: data.images,
    participants: [],
    location: data.location,
    startTime: data.startTime,
    endTime: data.endTime,
    status: 'active',
    createTime: Date.now(),
    updateTime: Date.now()
  }
}