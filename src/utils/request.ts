import { refreshToken } from '@/api/users'
import { GlobalProps } from '@/store'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getToken } from './cookies'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    if (getToken()) {
      // config.headers['Authorization'] = 'Bearer ' + UserModule.token
      config.headers['Authorization'] =
        'Bearer ' + window.sessionStorage.getItem('token')
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  response => {
    // Some example codes here:
    // code == 20000: success
    // code == 50001: invalid access token
    // code == 50002: already login in other place
    // code == 50003: access token expired
    // code == 50004: invalid user (user not exist)
    // code == 50005: username or password is incorrect
    // You can change this part for your own usage.
    console.log('成功响应对象', response)
    return response.data
  },
  error => {
    console.log('错误对象', error.response)
    if (error.response.status === 401) {
      const { config } = error
      console.log('401错误', config)
      if (config.url === '/account/refresh_token') {
        ElMessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          // UserModule.ResetToken()
          store.dispatch('user/logout')
          location.reload() // To prevent bugs from vue-router
        })
      } else {
        return refreshToken({
          refresh_token: window.localStorage.getItem('refresh_token')
        }).then(res => {
          const resData = res
          console.log('刷新的响应', resData)
          if ((resData.status as any) === 'success') {
            store.commit('user/SET_TOKEN', res.data.token)
            store.commit('user/SET_REFRESH_TOKEN', res.data.refresh_token)
            // setTokenSelf(res.data.token)
            // setRefreshToken(res.data.refresh_token)
            return service(config)
          }
        })
      }
    } else {
      if (error.response.status === 403) {
        ElMessage({
          message: '暂无权限使用此功能',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(
        new Error((error.response as any).message || 'Error')
      )
    }
  }
)

export default service
