import type { User } from '@/types/user'

export default function mockGetUserInfo(): User {
  return {
    _id: 'mock_user_001',
    _openid: 'mock_openid_001',
    nickname: '活动达人',
    avatar: 'https://picsum.photos/id/64/200/200',
    createTime: Date.now() - 86400000 * 30
  }
}