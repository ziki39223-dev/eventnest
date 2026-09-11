import { useState, useEffect, useCallback, useMemo } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getEvents } from '@/services/event'
import type { Event } from '@/types/event'
import { useUser } from '@/store/user'
import { formatDate } from '@/utils'
import styles from './index.module.scss'

const USER_STATS = [
  { value: '5', label: '发布活动' },
  { value: '12', label: '参与活动' },
  { value: '28', label: '关注好友' }
]

const MENU_ITEMS = [
  { icon: '❤️', text: '我的收藏' },
  { icon: '💬', text: '我的评论' },
  { icon: '⚙️', text: '设置' }
]

export default function MinePage() {
  const { user } = useUser()
  const [myEvents, setMyEvents] = useState<Event[]>([])
  const [participatedEvents, setParticipatedEvents] = useState<Event[]>([])
  
  useEffect(() => {
    fetchMyEvents()
  }, [])
  
  const fetchMyEvents = useCallback(async () => {
    try {
      const events = await getEvents()
      setMyEvents(events.slice(0, 3))
      setParticipatedEvents(events.slice(2, 5))
    } catch (err) {
      console.error('[MinePage] fetchMyEvents error:', err)
    }
  }, [])
  
  const handleEditProfile = useCallback(() => {
    Taro.showToast({ title: '编辑资料功能开发中', icon: 'none' })
  }, [])
  
  const handleMenuItemClick = useCallback((title: string) => {
    Taro.showToast({ title: `${title}功能开发中`, icon: 'none' })
  }, [])
  
  const handleEventClick = useCallback((event: Event) => {
    Taro.navigateTo({ url: `/pages/detail/index?id=${event._id}` })
  }, [])
  
  const renderEventItem = useCallback((event: Event, status: string) => (
    <View key={event._id} className={styles.eventItem} onClick={() => handleEventClick(event)}>
      <View className={styles.eventImage}>
        <Image src={event.images[0]} mode="aspectFill" className={styles.eventImageInner} lazyLoad />
      </View>
      <View className={styles.eventInfo}>
        <Text className={styles.eventTitle}>{event.title}</Text>
        <Text className={styles.eventTime}>{formatDate(event.startTime)}</Text>
      </View>
      <Text className={styles.status}>{status}</Text>
    </View>
  ), [handleEventClick])
  
  const myEventsRendered = useMemo(() => {
    return myEvents.map(event => renderEventItem(event, event.status === 'active' ? '进行中' : '已结束'))
  }, [myEvents, renderEventItem])
  
  const participatedEventsRendered = useMemo(() => {
    return participatedEvents.map(event => renderEventItem(event, '已参与'))
  }, [participatedEvents, renderEventItem])
  
  return (
    <ScrollView className={styles.page} scrollY>
      <View className={styles.header}>
        <View className={styles.userInfo}>
          <View className={styles.avatar}>
            <Image 
              src={user?.avatar || 'https://picsum.photos/id/64/200/200'} 
              mode="aspectFill" 
              className={styles.avatarImage}
              lazyLoad
            />
          </View>
          <View className={styles.info}>
            <Text className={styles.nickname}>{user?.nickname || '用户'}</Text>
            <Text className={styles.openid}>ID: {user?._id?.slice(-8) || '****'}</Text>
          </View>
          <Text className={styles.editBtn} onClick={handleEditProfile}>编辑资料 →</Text>
        </View>
        
        <View className={styles.stats}>
          {USER_STATS.map((stat, index) => (
            <View key={index} className={styles.statItem}>
              <Text className={styles.value}>{stat.value}</Text>
              <Text className={styles.label}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View className={styles.menu}>
        {MENU_ITEMS.map((item, index) => (
          <View key={index} className={styles.menuItem} onClick={() => handleMenuItemClick(item.text)}>
            <Text className={styles.icon}>{item.icon}</Text>
            <Text className={styles.text}>{item.text}</Text>
            <Text className={styles.arrow}>→</Text>
          </View>
        ))}
      </View>
      
      <View className={styles.section}>
        <Text className={styles.sectionTitle}>
          <Text className={styles.icon}>📝</Text>
          我发布的活动
        </Text>
        {myEvents.length > 0 ? (
          myEventsRendered
        ) : (
          <Text style={{ textAlign: 'center', color: '#94a3b8', fontSize: '28rpx' }}>暂无发布</Text>
        )}
      </View>
      
      <View className={styles.section}>
        <Text className={styles.sectionTitle}>
          <Text className={styles.icon}>✅</Text>
          我参与的活动
        </Text>
        {participatedEvents.length > 0 ? (
          participatedEventsRendered
        ) : (
          <Text style={{ textAlign: 'center', color: '#94a3b8', fontSize: '28rpx' }}>暂无参与</Text>
        )}
      </View>
    </ScrollView>
  )
}