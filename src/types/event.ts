export interface Event {
  _id: string
  _openid: string
  title: string
  description: string
  images: string[]
  participants: string[]
  location: string
  startTime: number
  endTime: number
  status: 'draft' | 'active' | 'ended'
  createTime: number
  updateTime: number
}

export interface EventDetail extends Event {
  participantCount: number
  isParticipated: boolean
}