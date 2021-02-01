import request from '@/utils/request'

export function getAccountList(index: number, size: number){
    return request({
        url: `/manager/view_account?page_index=${index}&page_size=${size}`,
        method: 'get'
      })
}


// export function addUser(data: any){
//     return request({
//         url: '/manager/add_account',
//         method: 'post',
//         data
//     })
// }



export const addAccount = (data:any) =>
    request({
        url: '/manager/add_account',
        method: 'post',
        data
    })

export const updateAccount = (data:any) =>
    request({
        url: '/manager/update_account',
        method: 'post',
        data
    })

export const changePassword = (account_name:string,password:string) =>
    request({
        url: '/manager/change_password',
        method: 'post',
        data:{
            account_name:account_name,
            password:password
        }
    })