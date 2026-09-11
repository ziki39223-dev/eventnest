import { memo } from 'react'
import { View, Image, Text } from '@tarojs/components'
import styles from './index.module.scss'

interface UserAvatarProps {
  url: string
  size?: 'small' | 'medium' | 'large'
  nickname?: string
  showNickname?: boolean
}

const sizeMap = {
  small: 80,
  medium: 120,
  large: 160
}

function UserAvatar({ url, size = 'medium', nickname, showNickname = false }: UserAvatarProps) {
  const avatarSize = sizeMap[size]
  
  return (
    <View className={styles.avatarContainer}>
      <View className={styles.avatar} style={{ width: avatarSize, height: avatarSize }}>
        <Image src={url} mode="aspectFill" className={styles.avatarImage} lazyLoad />
      </View>
      {showNickname && nickname && (
        <Text className={styles.nickname}>{nickname}</Text>
      )}
    </View>
  )
}

export default memo(UserAvatar)