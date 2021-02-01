import { login } from './../api/users'
import { ref, Ref, provide, inject } from 'vue'
import { setToken } from '@/utils/cookies'
import { ElMessage } from 'element-plus'
import { removeToken } from '../utils/cookies'

export interface UserState {
  token: string
  name: string
  refresh_token: string
  permissions: any[]
  balance: number
  expire_time: string
}

type userContext = {
  userInfo: UserState
  setName: (name: string) => void
  setTokenSelf: (token: string) => void
  setBalance: (balance: number) => void
  setPermissions: (permissions: any[]) => void
  setRefreshToken: (resfreshToken: string) => void
  setExpireTime: (expireTime: string) => void
  login: (userInfo: { account_name: string; password: string }) => void
  logout: () => Promise<any>
}

const UserSymbol = Symbol()

export const useUserProvide = () => {
  const userInfo = ref<UserState>({
    token: '',
    name: '',
    refresh_token: '',
    permissions: [],
    balance: 0,
    expire_time: ''
  })
  const setName = (name: string) => {
    userInfo.value.name == name
  }

  const setTokenSelf = (token: string) => {
    userInfo.value.token = token
    setToken(token)
  }

  const setBalance = (balance: number) => {
    userInfo.value.balance = balance
  }

  const setPermissions = (permissions: any[]) => {
    userInfo.value.permissions = permissions
  }

  const setRefreshToken = (resfreshToken: string) => {
    userInfo.value.refresh_token = resfreshToken
    window.localStorage.setItem('refresh_token', resfreshToken)
  }

  const setExpireTime = (expireTime: string) => {
    userInfo.value.expire_time = expireTime
  }

  const login = async (userInfo: {
    account_name: string
    password: string
  }) => {
    let { account_name, password } = userInfo
    account_name = account_name.trim()
    const resData: any = await login({ account_name, password })

    if (resData.message === '登陆成功') {
      const data = resData.data
      setTokenSelf(data.token)
      setRefreshToken(data.token)
    } else {
      ElMessage.error(resData.message)
    }
  }

  const logout = () => {
    return new Promise(resolve => {
      setTokenSelf('')
      removeToken()
      setRefreshToken('')
      setName('')
      setPermissions([])
      resolve(true)
    })
  }

  provide(UserSymbol, {
    userInfo: userInfo.value,
    setName,
    setTokenSelf,
    setBalance,
    setExpireTime,
    setPermissions,
    setRefreshToken,
    login,
    logout
  })
}

export const useUserInject = () => {
  const userContenxt = inject<userContext>(UserSymbol)
  if (!userContenxt) {
    throw new Error(`useUserContenxt must be used after useUserProvide`)
  }
  return userContenxt
}
