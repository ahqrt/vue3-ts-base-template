import { getUserInfo, login } from '@/api/users'
import { removeToken, setToken } from '@/utils/cookies'
import { Module } from 'vuex'
import { GlobalProps } from '../index'
import { ElMessage } from 'element-plus'

export interface UserState {
  token: string
  name: string
  refresh_token: string
  permissions: any[]
  balance: number
  expire_time: string
}
const state: UserState = {
  token: '',
  name: '',
  refresh_token: '',
  permissions: [],
  balance: 0,
  expire_time: ''
}

const user: Module<UserState, GlobalProps> = {
  namespaced: true,
  state,
  mutations: {
    SET_TOKEN(state, token: string) {
      state.token = token
      window.sessionStorage.setItem('token', token)
    },
    SET_NAME(state, name: string) {
      state.name = name
    },
    SET_BALANCE(state, balance: number) {
      state.balance = balance
    },
    SET_REFRESH_TOKEN(state, refresh_token: string) {
      state.refresh_token = refresh_token
      window.localStorage.setItem('refresh_token', refresh_token)
    },
    SET_PERMISSIONS(state, permissions: any[]) {
      state.permissions = permissions
    },
    SET_EXPIRE_TIME(state, expireTime: string) {
      state.expire_time = expireTime
    }
  },
  actions: {
    async Login(
      { commit },
      userInfo: { account_name: string; password: string }
    ) {
      let { account_name, password } = userInfo
      account_name = account_name.trim()
      const resData: any = await login({ account_name, password })

      if (resData.message === '登录成功') {
        const data = resData.data
        setToken(data.token)
        commit('SET_TOKEN', data.token)
        commit('SET_REFRESH_TOKEN', data.refresh_token)
      } else {
        ElMessage.error(resData.message)
      }
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_REFRESH_TOKEN', '')
        commit('SET_NAME', '')
        commit('SET_PERMISSIONS', [])
        removeToken()
        resolve(true)
      })
    },
    ResetToken({ commit }) {
      removeToken()
      commit('SET_TOKEN', '')
      commit('SET_REFRESH_TOKEN', '')
    },
    async GetUserInfo({ state, commit }) {
      if (state.token === '') {
        throw Error('GetUserInfo: token is undefined!')
      }
      const { data } = await getUserInfo()
      if (!data) {
        throw Error('Verification failed, please Login again.')
      }
      const { account_name, permissions_list, expire_time, balance } = data
      console.log('account_name', account_name)
      console.log('permissions_list', permissions_list)
      console.log('balance', balance)
      commit('SET_EXPIRE_TIME', expire_time)
      commit('SET_NAME', account_name)
      commit('SET_PERMISSIONS', permissions_list)
      commit('SET_BALANCE', balance)

      // roles must be a non-empty array
    }
  }
}

export default user
