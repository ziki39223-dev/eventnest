import React, { memo } from 'react'
import { View, Text, Image } from '@tarojs/components'
import type { Message } from '@/types/message'
import { getRelativeTime } from '@/utils'
import styles from './index.module.scss'

interface MessageItemProps {
  message: Message
  onClick: () => void
}

function MessageItem({ message, onClick }: MessageItemProps) {
  return (
    <View className={styles.item} onClick={onClick}>
      <View className={styles.avatar}>
        <Image src={`https://picsum.photos/id/${parseInt(message.fromOpenid.slice(-3)) % 10}/100/100`} mode="aspectFill" className={styles.avatarImage} lazyLoad />
        {!message.isRead && <View className={styles.unreadDot} />}
      </View>
      
      <View className={styles.content}>
        <View className={styles.header}>
          <Text className={styles.nickname}>用户{message.fromOpenid.slice(-3)}</Text>
          <Text className={styles.time}>{getRelativeTime(message.createTime)}</Text>
        </View>
        <Text className={styles.text}>{message.content}</Text>
      </View>
    </View>
  )
}

export default memo(MessageItem)