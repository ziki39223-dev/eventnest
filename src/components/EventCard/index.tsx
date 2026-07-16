import React, { memo } from 'react'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import Taro from '@tarojs/taro'
import type { Event } from '@/types/event'
import { formatDate, getRelativeTime } from '@/utils'
import styles from './index.module.scss'

interface EventCardProps {
  event: Event
}

function EventCard({ event }: EventCardProps) {
  const handleClick = () => {
    Taro.navigateTo({ url: `/pages/detail/index?id=${event._id}` })
  }
  
  return (
    <View className={styles.card} onClick={handleClick}>
      <View className={styles.imageContainer}>
        {event.images.length > 1 ? (
          <Swiper className={styles.swiper} circular indicatorDots autoplay>
            {event.images.map((img, index) => (
              <SwiperItem key={index}>
                <Image src={img} mode="aspectFill" className={styles.image} lazyLoad />
              </SwiperItem>
            ))}
          </Swiper>
        ) : (
          <Image src={event.images[0]} mode="aspectFill" className={styles.image} lazyLoad />
        )}
        <View className={styles.badge}>{event.participants.length}人参与</View>
      </View>
      
      <View className={styles.content}>
        <Text className={styles.title}>{event.title}</Text>
        <Text className={styles.description}>{event.description}</Text>
        
        <View className={styles.footer}>
          <View className={styles.location}>
            <Text className={styles.icon}>📍</Text>
            <Text className={styles.locationText}>{event.location}</Text>
          </View>
          <Text className={styles.time}>{formatDate(event.startTime)}</Text>
        </View>
        
        <View className={styles.meta}>
          <Text className={styles.createTime}>{getRelativeTime(event.createTime)}发布</Text>
          <View className={styles.status}>{event.status === 'active' ? '进行中' : '已结束'}</View>
        </View>
      </View>
    </View>
  )
}

export default memo(EventCard)