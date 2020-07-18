import request from '@/utils/request'

/**
 * 获取权限列表
 * @param {*} data
 */
export function permissionListQueryApi(data) {
  return request({
    url: '/permission/list',
    method: 'post',
    data
  })
}
