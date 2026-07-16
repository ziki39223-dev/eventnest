interface EventItem {
  _id: string
  title: string
  description: string
}

function filterEvents(events: EventItem[], keyword: string): EventItem[] {
  if (!keyword.trim()) {
    return events
  }
  const lowerKeyword = keyword.toLowerCase()
  return events.filter(event => 
    event.title.toLowerCase().includes(lowerKeyword) || 
    event.description.toLowerCase().includes(lowerKeyword)
  )
}

const mockEvents: EventItem[] = [
  {
    _id: 'event_001',
    title: '周末户外露营活动',
    description: '一起来享受大自然的美好！带上帐篷和美食，我们一起度过一个难忘的周末。'
  },
  {
    _id: 'event_002',
    title: '技术分享沙龙：React 新特性',
    description: '深入探讨 React 18 的并发特性和 Suspense，学习最新的前端技术趋势。'
  },
  {
    _id: 'event_003',
    title: '摄影爱好者聚会',
    description: '摄影爱好者们的线下交流活动，分享拍摄技巧，一起寻找城市中的美好瞬间。'
  }
]

describe('filterEvents', () => {
  test('should return all events when keyword is empty', () => {
    const result = filterEvents(mockEvents, '')
    expect(result).toEqual(mockEvents)
    expect(result.length).toBe(3)
  })

  test('should return all events when keyword is whitespace', () => {
    const result = filterEvents(mockEvents, '   ')
    expect(result).toEqual(mockEvents)
    expect(result.length).toBe(3)
  })

  test('should filter events by title', () => {
    const result = filterEvents(mockEvents, '露营')
    expect(result.length).toBe(1)
    expect(result[0].title).toBe('周末户外露营活动')
  })

  test('should filter events by description', () => {
    const result = filterEvents(mockEvents, 'React')
    expect(result.length).toBe(1)
    expect(result[0].title).toBe('技术分享沙龙：React 新特性')
  })

  test('should be case insensitive', () => {
    const result = filterEvents(mockEvents, 'react')
    expect(result.length).toBe(1)
    expect(result[0].title).toBe('技术分享沙龙：React 新特性')
  })

  test('should find events with matching title or description', () => {
    const result = filterEvents(mockEvents, '爱好者')
    expect(result.length).toBe(1)
    expect(result[0].title).toBe('摄影爱好者聚会')
  })

  test('should return empty array when no matches', () => {
    const result = filterEvents(mockEvents, '篮球')
    expect(result).toEqual([])
    expect(result.length).toBe(0)
  })

  test('should handle partial matches', () => {
    const result = filterEvents(mockEvents, '技术')
    expect(result.length).toBe(1)
    expect(result[0].title).toBe('技术分享沙龙：React 新特性')
  })

  test('should handle multiple matches', () => {
    const result = filterEvents(mockEvents, '活动')
    expect(result.length).toBe(2)
    expect(result[0].title).toBe('周末户外露营活动')
    expect(result[1].title).toBe('摄影爱好者聚会')
  })

  test('should handle empty events array', () => {
    const result = filterEvents([], '露营')
    expect(result).toEqual([])
  })
})