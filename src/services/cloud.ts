import Taro from '@tarojs/taro'
import { startTimer, endTimer, trackError } from '@/utils/performance'

const isWeapp = process.env.TARO_ENV === 'weapp'

interface CloudFunctionResult<T> {
  code: number
  message: string
  data: T
}

interface CloudFunctionData {
  [key: string]: unknown
}

export async function callFunction<T = unknown>(
  name: string,
  data?: CloudFunctionData
): Promise<T> {
  const timerKey = `cloud.${name}`
  startTimer(timerKey)
  
  try {
    if (!isWeapp) {
      const mockModule = await import(`../data/${name}`)
      const result = mockModule.default(data) as T
      endTimer(timerKey, { dataSize: JSON.stringify(result).length })
      return result
    }
    const res = await Taro.cloud.callFunction({ name, data })
    const result = res.result as CloudFunctionResult<T>
    if (result.code !== 0) {
      endTimer(timerKey, { success: false })
      if (process.env.NODE_ENV !== 'production') {
        console.error(`[Cloud] ${name} failed:`, result.message)
      }
      throw new Error(result.message || '请求失败')
    }
    endTimer(timerKey, { success: true, dataSize: JSON.stringify(result.data).length })
    return result.data
  } catch (err) {
    endTimer(timerKey, { success: false })
    trackError(`cloud.${name}.error`, err as Error, { data })
    throw err
  }
}