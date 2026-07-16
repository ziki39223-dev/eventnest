export interface Participation {
  _id: string
  _openid: string
  eventId: string
  status: 'pending' | 'confirmed' | 'cancelled'
  createTime: number
}