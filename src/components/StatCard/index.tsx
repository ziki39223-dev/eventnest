import React, { memo } from 'react'
import { View, Text } from '@tarojs/components'
import styles from './index.module.scss'

interface StatCardProps {
  title: string
  value: string | number
  icon: string
  color?: string
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <View className={styles.card}>
      <View className={styles.icon} style={{ backgroundColor: color || '#e0e7ff' }}>
        <Text className={styles.iconText}>{icon}</Text>
      </View>
      <View className={styles.info}>
        <Text className={styles.value}>{value}</Text>
        <Text className={styles.title}>{title}</Text>
      </View>
    </View>
  )
}

export default memo(StatCard)