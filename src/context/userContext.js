import { createContext, useState, useContext } from 'react'

export const UserContext = createContext({})

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isSigninOpen, setIsSigninOpen] = useState(false)

  return (
    <UserContext.Provider
      value={{ user, setUser, isSigninOpen, setIsSigninOpen }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const { user, setUser, isSigninOpen, setIsSigninOpen } = useContext(
    UserContext,
  )
  return { user, setUser, isSigninOpen, setIsSigninOpen }
}
