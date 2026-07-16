import type { LoginResult } from '@/types/user'

export default function mockLogin(): LoginResult {
  return {
    openid: 'mock_openid_001',
    user: {
      _id: 'mock_user_001',
      _openid: 'mock_openid_001',
      nickname: '活动达人',
      avatar: 'https://picsum.photos/id/64/200/200',
      createTime: Date.now() - 86400000 * 30
    }
  }
}