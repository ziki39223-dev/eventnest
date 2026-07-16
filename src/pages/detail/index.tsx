import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, Button, Swiper, SwiperItem } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getEventDetail, participateEvent } from '@/services/event'
import type { EventDetail } from '@/types/event'
import { formatTime, formatDate } from '@/utils'
import styles from './index.module.scss'

export default function DetailPage() {
  const [event, setEvent] = useState<EventDetail | null>(null)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const options = Taro.getLaunchOptionsSync()
    const eventId = options.query?.id || ''
    if (eventId) {
      fetchEventDetail(eventId)
    }
  }, [])
  
  const fetchEventDetail = async (eventId: string) => {
    try {
      setLoading(true)
      const data = await getEventDetail(eventId)
      setEvent(data)
    } catch (err) {
      console.error('[DetailPage] fetchEventDetail error:', err)
      Taro.showToast({ title: '获取详情失败', icon: 'none' })
    } finally {
      setLoading(false)
      Taro.stopPullDownRefresh()
    }
  }
  
  const handleParticipate = async () => {
    if (!event) return
    
    try {
      await participateEvent(event._id)
      setEvent(prev => prev ? { ...prev, isParticipated: true, participantCount: prev.participantCount + 1 } : null)
      Taro.showToast({ title: '参与成功', icon: 'success' })
    } catch (err) {
      console.error('[DetailPage] participateEvent error:', err)
      Taro.showToast({ title: '参与失败', icon: 'none' })
    }
  }
  
  const handleRefresh = () => {
    if (event) {
      fetchEventDetail(event._id)
    }
  }
  
  if (loading) {
    return (
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Text>加载中...</Text>
      </View>
    )
  }
  
  if (!event) {
    return (
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Text>活动不存在</Text>
      </View>
    )
  }
  
  return (
    <ScrollView className={styles.page} scrollY onPullDownRefresh={handleRefresh}>
      <View className={styles.imageContainer}>
        {event.images.length > 1 ? (
          <Swiper className={styles.swiper} circular indicatorDots autoplay>
            {event.images.map((img, index) => (
              <SwiperItem key={index}>
                <Image src={img} mode="aspectFill" className={styles.image} />
              </SwiperItem>
            ))}
          </Swiper>
        ) : (
          <Image src={event.images[0]} mode="aspectFill" className={styles.image} />
        )}
      </View>
      
      <View className={styles.content}>
        <Text className={styles.title}>{event.title}</Text>
        
        <View className={styles.meta}>
          <View className={styles.metaItem}>
            <Text className={styles.icon}>📍</Text>
            <Text>{event.location}</Text>
          </View>
          <View className={styles.metaItem}>
            <Text className={styles.icon}>📅</Text>
            <Text>{formatDate(event.startTime)}</Text>
          </View>
          <View className={styles.metaItem}>
            <Text className={styles.icon}>🕐</Text>
            <Text>{formatTime(event.startTime)} - {formatTime(event.endTime)}</Text>
          </View>
        </View>
        
        <View className={styles.divider} />
        
        <View className={styles.section}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.icon}>📝</Text>
            活动介绍
          </Text>
          <Text className={styles.description}>{event.description}</Text>
        </View>
        
        <View className={styles.statsRow}>
          <View className={styles.statItem}>
            <Text className={styles.value}>{event.participantCount}</Text>
            <Text className={styles.label}>参与人数</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.value}>★★★★★</Text>
            <Text className={styles.label}>活动评分</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.value}>128</Text>
            <Text className={styles.label}>浏览次数</Text>
          </View>
        </View>
        
        <View className={styles.section}>
          <Text className={styles.sectionTitle}>
            <Text className={styles.icon}>💬</Text>
            讨论区
          </Text>
          <Text style={{ fontSize: '28rpx', color: '#94a3b8', textAlign: 'center', padding: '40rpx' }}>
            暂无评论，快来发表第一条评论吧！
          </Text>
        </View>
        
        <View style={{ height: '200rpx' }} />
      </View>
      
      <View className={styles.bottomBar}>
        <Button className={`${styles.btn} ${styles.secondary}`} onClick={() => Taro.showToast({ title: '分享功能开发中', icon: 'none' })}>
          分享
        </Button>
        <Button 
          className={`${styles.btn} ${styles.primary} ${event.isParticipated ? styles.disabled : ''}`} 
          onClick={handleParticipate}
          disabled={event.isParticipated}
        >
          {event.isParticipated ? '已参与' : '立即参与'}
        </Button>
      </View>
    </ScrollView>
  )
}