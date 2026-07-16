import type { Message } from '@/types/message'

const mockMessages: Message[] = [
  {
    _id: 'msg_001',
    fromOpenid: 'mock_openid_002',
    toOpenid: 'mock_openid_001',
    content: '你好！周末的露营活动还有名额吗？我想参加。',
    createTime: Date.now() - 3600000,
    isRead: false
  },
  {
    _id: 'msg_002',
    fromOpenid: 'mock_openid_003',
    toOpenid: 'mock_openid_001',
    content: '技术沙龙的分享资料可以提前发一下吗？',
    createTime: Date.now() - 7200000,
    isRead: true
  },
  {
    _id: 'msg_003',
    fromOpenid: 'mock_openid_004',
    toOpenid: 'mock_openid_001',
    content: '篮球比赛定在几点开始？',
    createTime: Date.now() - 14400000,
    isRead: true
  },
  {
    _id: 'msg_004',
    fromOpenid: 'mock_openid_005',
    toOpenid: 'mock_openid_001',
    content: '读书会的书籍需要自己准备吗？',
    createTime: Date.now() - 21600000,
    isRead: true
  }
]

export default function mockGetMessages(): Message[] {
  return mockMessages
}