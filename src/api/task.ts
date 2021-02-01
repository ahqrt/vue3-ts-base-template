import request from '@/utils/request'

/**
 *
 * @param target_account 目标账户
 * @param target_type 目标账户类型 phone email uname
 */
export const addTask = (target_account: string, target_type: string) =>
  request({
    url: '/task/add_task',
    method: 'post',
    data: { target_account, target_type }
  })

export const getResult = (search_id: string) =>
  request({
    url: `/task/get_result?search_uid=${search_id}`,
    method: 'get'
  })

export function getTask(page_index: number, page_size: number) {
  return request({
    url: `/task/get_task?page_index=${page_index}&page_size=${page_size}`,
    method: 'get'
  })
}

// 获取所有历史搜索任务
export function getAllHistorySearchResult(index: number, size: number) {
  return request({
    url: `/manager/view_task?page_index=${index}&page_size=${size}`,
    method: 'get'
  })
}

// 获取自己的历史搜索任务
export function getMyHistorySearchResult(index: number, size: number) {
  return request({
    url: `/task/view_my_task?page_index=${index}&page_size=${size}`,
    method: 'get'
  })
}

