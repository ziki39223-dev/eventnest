import { useState, useEffect, useCallback, useMemo } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getMessages } from '@/services/message'
import type { Message } from '@/types/message'
import MessageItem from '@/components/MessageItem'
import styles from './index.module.scss'

export default function MessagePage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    fetchMessages()
  }, [])
  
  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getMessages()
      setMessages(data)
    } catch (err) {
      console.error('[MessagePage] fetchMessages error:', err)
      Taro.showToast({ title: '获取消息失败', icon: 'none' })
    } finally {
      setLoading(false)
      Taro.stopPullDownRefresh()
    }
  }, [])
  
  const handleRefresh = useCallback(() => {
    fetchMessages()
  }, [fetchMessages])
  
  const handleMessageClick = useCallback((message: Message) => {
    Taro.navigateTo({ url: `/pages/detail/index?id=${message.fromOpenid}` })
  }, [])
  
  const unreadCount = useMemo(() => {
    return messages.filter(m => !m.isRead).length
  }, [messages])
  
  return (
    <ScrollView 
      className={styles.page} 
      scrollY 
      onPullDownRefresh={handleRefresh}
    >
      <View className={styles.header}>
        <Text className={styles.title}>消息通知</Text>
        {unreadCount > 0 && (
          <Text className={styles.unreadCount}>您有 {unreadCount} 条未读消息</Text>
        )}
      </View>
      
      {loading ? (
        <Text style={{ textAlign: 'center', padding: '40rpx' }}>加载中...</Text>
      ) : messages.length > 0 ? (
        <View className={styles.messageList}>
          {messages.map(message => (
            <MessageItem 
              key={message._id} 
              message={message} 
              onClick={() => handleMessageClick(message)} 
            />
          ))}
        </View>
      ) : (
        <View className={styles.emptyState}>
          <Text className={styles.icon}>💬</Text>
          <Text className={styles.text}>暂无消息</Text>
        </View>
      )}
    </ScrollView>
  )
}