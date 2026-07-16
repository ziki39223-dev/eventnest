import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { View, Text, ScrollView, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getEvents } from '@/services/event'
import type { Event } from '@/types/event'
import EventCard from '@/components/EventCard'
import StatCard from '@/components/StatCard'
import { login } from '@/services/auth'
import { useUser } from '@/store/user'
import { startTimer, endTimer, trackEvent, trackError } from '@/utils/performance'
import styles from './index.module.scss'

const STATS_DATA = [
  { title: '本周活动', value: '12', icon: '📅', color: '#e0e7ff' },
  { title: '已参与', value: '5', icon: '✅', color: '#d1fae5' },
  { title: '好友动态', value: '8', icon: '👥', color: '#fef3c7' }
]

export function filterEvents(events: Event[], keyword: string): Event[] {
  if (!keyword.trim()) {
    return events
  }
  const lowerKeyword = keyword.toLowerCase()
  return events.filter(event => 
    event.title.toLowerCase().includes(lowerKeyword) || 
    event.description.toLowerCase().includes(lowerKeyword)
  )
}

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [loading, setLoading] = useState(false)
  const { setUser, setOpenid } = useUser()
  
  useEffect(() => {
    startTimer('homepage.init')
    initLogin()
    fetchEvents()
  }, [])
  
  const initLogin = useCallback(async () => {
    try {
      const result = await login()
      setOpenid(result.openid)
      if (result.user) {
        setUser(result.user)
      }
    } catch (err) {
      trackError('homepage.login.error', err as Error)
      console.error('[HomePage] login error:', err)
    }
  }, [setUser, setOpenid])
  
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getEvents()
      setEvents(data)
      trackEvent('homepage.events.loaded', { count: data.length })
    } catch (err) {
      trackError('homepage.events.error', err as Error)
      console.error('[HomePage] fetchEvents error:', err)
      Taro.showToast({ title: '获取活动失败', icon: 'none' })
    } finally {
      setLoading(false)
      Taro.stopPullDownRefresh()
      endTimer('homepage.init')
    }
  }, [])
  
  const handleRefresh = useCallback(() => {
    trackEvent('homepage.refresh')
    fetchEvents()
  }, [fetchEvents])
  
  const handleSearch = useCallback(() => {
    trackEvent('homepage.search', { keyword: searchKeyword })
    Taro.showToast({ title: `搜索: ${searchKeyword}`, icon: 'none' })
  }, [searchKeyword])
  
  const handleSearchChange = useCallback((e: { detail: { value: string } }) => {
    setSearchKeyword(e.detail.value)
  }, [])
  
  const filteredEvents = useMemo(() => {
    startTimer('homepage.filter')
    const result = filterEvents(events, searchKeyword)
    endTimer('homepage.filter', { keyword: searchKeyword, resultCount: result.length })
    return result
  }, [events, searchKeyword])
  
  return (
    <ScrollView 
      className={styles.page} 
      scrollY 
      onPullDownRefresh={handleRefresh}
      onReachBottom={fetchEvents}
    >
      <View className={styles.header}>
        <Text className={styles.title}>EventNest</Text>
        <Text className={styles.subtitle}>发现精彩活动，连接志同道合的朋友</Text>
        <View className={styles.searchBar}>
          <Text className={styles.searchIcon}>🔍</Text>
          <Input 
            className={styles.searchInput}
            placeholder="搜索活动"
            placeholderStyle="color: rgba(255,255,255,0.6)"
            value={searchKeyword}
            onChange={handleSearchChange}
            onConfirm={handleSearch}
          />
        </View>
      </View>
      
      <View className={styles.statsRow}>
        {STATS_DATA.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </View>
      
      <View className={styles.section}>
        <Text className={styles.sectionTitle}>
          <Text className={styles.icon}>🔥</Text>
          热门活动
        </Text>
        <View className={styles.eventList}>
          {loading ? (
            <Text>加载中...</Text>
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <EventCard key={event._id} event={event} />
            ))
          ) : (
            <Text style={{ textAlign: 'center', color: '#94a3b8' }}>暂无活动</Text>
          )}
        </View>
      </View>
      
      <Text className={styles.loadMore}>下拉加载更多</Text>
    </ScrollView>
  )
}