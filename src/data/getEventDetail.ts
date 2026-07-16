import type { EventDetail } from '@/types/event'

export default function mockGetEventDetail(data: { eventId: string }): EventDetail {
  const mockEvents: EventDetail[] = [
    {
      _id: 'event_001',
      _openid: 'mock_openid_001',
      title: '周末户外露营活动',
      description: '一起来享受大自然的美好！带上帐篷和美食，我们一起度过一个难忘的周末。活动包含烧烤、游戏、篝火晚会等精彩环节。',
      images: ['https://picsum.photos/id/1036/750/400', 'https://picsum.photos/id/1044/750/400'],
      participants: ['mock_openid_002', 'mock_openid_003', 'mock_openid_004'],
      location: '西山国家森林公园',
      startTime: Date.now() + 86400000,
      endTime: Date.now() + 86400000 * 2,
      status: 'active',
      createTime: Date.now() - 86400000 * 2,
      updateTime: Date.now() - 86400000,
      participantCount: 3,
      isParticipated: false
    },
    {
      _id: 'event_002',
      _openid: 'mock_openid_002',
      title: '技术分享沙龙：React 新特性',
      description: '深入探讨 React 18 的并发特性和 Suspense，学习最新的前端技术趋势。欢迎各位开发者前来交流！',
      images: ['https://picsum.photos/id/1/750/400', 'https://picsum.photos/id/2/750/400'],
      participants: ['mock_openid_001', 'mock_openid_005', 'mock_openid_006', 'mock_openid_007'],
      location: '中关村创业大厦 3 层会议室',
      startTime: Date.now() + 86400000 * 3,
      endTime: Date.now() + 86400000 * 3 + 3600000 * 2,
      status: 'active',
      createTime: Date.now() - 86400000 * 3,
      updateTime: Date.now() - 86400000 * 2,
      participantCount: 4,
      isParticipated: true
    }
  ]
  
  return mockEvents.find(e => e._id === data.eventId) || mockEvents[0]
}