import { useState } from 'react'
import { View, Text, Input, Textarea, Button, Picker } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { createEvent } from '@/services/event'
import ImageUploader from '@/components/ImageUploader'
import styles from './index.module.scss'

export default function PublishPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [submitting, setSubmitting] = useState(false)
  
  const handleSubmit = async () => {
    if (!title.trim()) {
      Taro.showToast({ title: '请输入活动标题', icon: 'none' })
      return
    }
    if (!description.trim()) {
      Taro.showToast({ title: '请输入活动描述', icon: 'none' })
      return
    }
    if (!location.trim()) {
      Taro.showToast({ title: '请输入活动地点', icon: 'none' })
      return
    }
    if (images.length === 0) {
      Taro.showToast({ title: '请上传活动图片', icon: 'none' })
      return
    }
    
    try {
      setSubmitting(true)
      await createEvent({
        title: title.trim(),
        description: description.trim(),
        images,
        location: location.trim(),
        startTime: Date.now() + 86400000,
        endTime: Date.now() + 86400000 * 2
      })
      
      Taro.showToast({ title: '发布成功', icon: 'success' })
      setTimeout(() => {
        Taro.switchTab({ url: '/pages/home/index' })
      }, 1500)
    } catch (err) {
      console.error('[PublishPage] createEvent error:', err)
      Taro.showToast({ title: '发布失败', icon: 'none' })
    } finally {
      setSubmitting(false)
    }
  }
  
  const handleBack = () => {
    Taro.navigateBack()
  }
  
  return (
    <View className={styles.page}>
      <View className={styles.navBar}>
        <Text className={styles.navLeft} onClick={handleBack}>←</Text>
        <Text className={styles.navTitle}>发布活动</Text>
        <Text className={styles.navRight} onClick={handleSubmit}>发布</Text>
      </View>
      
      <View className={styles.form}>
        <View className={styles.formItem}>
          <Text className={styles.label}>活动标题</Text>
          <Input 
            className={styles.input}
            placeholder="请输入活动标题"
            value={title}
            onChange={e => setTitle(e.detail.value)}
          />
        </View>
        
        <View className={styles.formItem}>
          <Text className={styles.label}>活动描述</Text>
          <Textarea 
            className={styles.textarea}
            placeholder="请详细描述活动内容..."
            value={description}
            onChange={e => setDescription(e.detail.value)}
          />
        </View>
        
        <View className={styles.formItem}>
          <Text className={styles.label}>活动图片</Text>
          <ImageUploader value={images} onChange={setImages} />
        </View>
        
        <View className={styles.formItem}>
          <Text className={styles.label}>活动地点</Text>
          <Input 
            className={styles.input}
            placeholder="请输入活动地点"
            value={location}
            onChange={e => setLocation(e.detail.value)}
          />
        </View>
        
        <View className={styles.formItem}>
          <Text className={styles.label}>开始时间</Text>
          <Picker mode="date" onChange={e => setStartTime(e.detail.value)}>
            <View className={styles.picker}>
              <Text>{startTime || '请选择日期'}</Text>
              <Text className={styles.arrow}>→</Text>
            </View>
          </Picker>
        </View>
        
        <View className={styles.formItem}>
          <Text className={styles.label}>结束时间</Text>
          <Picker mode="date" onChange={e => setEndTime(e.detail.value)}>
            <View className={styles.picker}>
              <Text>{endTime || '请选择日期'}</Text>
              <Text className={styles.arrow}>→</Text>
            </View>
          </Picker>
        </View>
        
        <View className={styles.submitBtn}>
          <Button className={styles.btn} loading={submitting} onClick={handleSubmit}>
            发布活动
          </Button>
        </View>
      </View>
    </View>
  )
}