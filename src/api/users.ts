import request from '@/utils/request'

export const getUsers = (params: any) =>
  request({
    url: '/users',
    method: 'get',
    params
  })

export const getUserInfo = () =>
  request({
    url: '/account/account_detail',
    method: 'get'
  })

export const getUserByName = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'get'
  })

export const updateUser = (username: string, data: any) =>
  request({
    url: `/users/${username}`,
    method: 'put',
    data
  })

export const deleteUser = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'delete'
  })

export const login = (data: any) =>
  request({
    url: '/account/login',
    method: 'post',
    data
  })

export const logout = () =>
  request({
    url: '/users/logout',
    method: 'post'
  })

//   token刷新接口
export const refreshToken = (data: any) =>
  request({
    url: '/account/refresh_token',
    method: 'post',
    data
  })

export const register = (data: any) =>
  request({
    url: '/users/register',
    method: 'post',
    data
  })

// 获取积分变更记录
export function getBalanceChangeLogs(index: number, size: number) {
  return request({
    url: `account/balance_change_logs?page_index=${index}&page_size=${size}`,
    method: 'get'
  })
}
