import { useState } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import styles from './index.module.scss'

interface ImageUploaderProps {
  value: string[]
  onChange: (value: string[]) => void
  maxCount?: number
}

export default function ImageUploader({ value, onChange, maxCount = 9 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  
  const handleChooseImage = async () => {
    if (uploading) return
    if (value.length >= maxCount) {
      Taro.showToast({ title: '最多上传9张图片', icon: 'none' })
      return
    }
    
    try {
      setUploading(true)
      const res = await Taro.chooseImage({
        count: maxCount - value.length,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera']
      })
      
      const newImages = [...value, ...res.tempFilePaths]
      onChange(newImages)
    } catch (err) {
      console.error('[ImageUploader] chooseImage error:', err)
    } finally {
      setUploading(false)
    }
  }
  
  const handleDelete = (index: number) => {
    const newImages = value.filter((_, i) => i !== index)
    onChange(newImages)
  }
  
  return (
    <View className={styles.container}>
      {value.map((img, index) => (
        <View key={index} className={styles.imageItem}>
          <Image src={img} mode="aspectFill" className={styles.image} />
          <View className={styles.deleteBtn} onClick={() => handleDelete(index)}>
            <Text className={styles.deleteIcon}>✕</Text>
          </View>
        </View>
      ))}
      
      {value.length < maxCount && (
        <View className={styles.uploadBtn} onClick={handleChooseImage}>
          <Text className={styles.uploadIcon}>+</Text>
          <Text className={styles.uploadText}>上传图片</Text>
        </View>
      )}
    </View>
  )
}