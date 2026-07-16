import type { Event } from '@/types/event'

const mockEvents: Event[] = [
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
    updateTime: Date.now() - 86400000
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
    updateTime: Date.now() - 86400000 * 2
  },
  {
    _id: 'event_003',
    _openid: 'mock_openid_003',
    title: '摄影爱好者聚会',
    description: '摄影爱好者们的线下交流活动，分享拍摄技巧，一起寻找城市中的美好瞬间。',
    images: ['https://picsum.photos/id/1015/750/400', 'https://picsum.photos/id/1018/750/400'],
    participants: ['mock_openid_001', 'mock_openid_002'],
    location: '朝阳公园南门',
    startTime: Date.now() + 86400000 * 5,
    endTime: Date.now() + 86400000 * 5 + 3600000 * 3,
    status: 'active',
    createTime: Date.now() - 86400000,
    updateTime: Date.now() - 3600000
  },
  {
    _id: 'event_004',
    _openid: 'mock_openid_004',
    title: '读书会：《人类简史》',
    description: '一起阅读尤瓦尔·赫拉利的《人类简史》，探讨人类发展历程和未来趋势。',
    images: ['https://picsum.photos/id/292/750/400'],
    participants: ['mock_openid_001', 'mock_openid_003', 'mock_openid_005'],
    location: '西西弗书店（国贸店）',
    startTime: Date.now() + 86400000 * 7,
    endTime: Date.now() + 86400000 * 7 + 3600000 * 2,
    status: 'active',
    createTime: Date.now() - 86400000 * 4,
    updateTime: Date.now() - 86400000 * 2
  },
  {
    _id: 'event_005',
    _openid: 'mock_openid_005',
    title: '篮球友谊赛',
    description: '周末篮球友谊赛，欢迎热爱篮球的朋友们一起来切磋球技！',
    images: ['https://picsum.photos/id/1082/750/400'],
    participants: ['mock_openid_001', 'mock_openid_002', 'mock_openid_004', 'mock_openid_006'],
    location: '五棵松篮球馆',
    startTime: Date.now() + 86400000 * 2,
    endTime: Date.now() + 86400000 * 2 + 3600000 * 2,
    status: 'active',
    createTime: Date.now() - 86400000 * 5,
    updateTime: Date.now() - 86400000 * 3
  }
]

export default function mockGetEvents(): Event[] {
  return mockEvents
}