export interface Message {
  _id: string
  fromOpenid: string
  toOpenid: string
  content: string
  createTime: number
  isRead: boolean
}