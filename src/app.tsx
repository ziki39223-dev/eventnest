import { useEffect } from 'react'
import Taro from '@tarojs/taro'
import { useDidShow, useDidHide } from '@tarojs/taro'
import './app.scss'
import { UserProvider } from '@/store/user'

interface AppProps {
  children: React.ReactNode
}

function App({ children }: AppProps) {
  useEffect(() => {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init({ traceUser: true })
    }
  }, [])

  useDidShow(() => {})

  useDidHide(() => {})

  return (
    <UserProvider>
      {children}
    </UserProvider>
  )
}

export default App