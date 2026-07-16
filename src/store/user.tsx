import { createContext, useContext, useState, ReactNode } from 'react'
import type { User } from '@/types/user'

interface UserContextType {
  user: User | null
  openid: string
  setUser: (user: User | null) => void
  setOpenid: (openid: string) => void
}

const UserContext = createContext<UserContextType | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [openid, setOpenid] = useState('')

  return (
    <UserContext.Provider value={{ user, openid, setUser, setOpenid }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}