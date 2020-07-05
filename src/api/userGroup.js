import request from '@/utils/request'

/**
 * 获取用户组列表
 * @param {*} data
 */
export function groupListQueryApi(data) {
  return request({
    url: '/group/list',
    method: 'post',
    data
  })
}

/**
 * 用户组详情
 * @param {*} data
 */
export function groupDetailQueryApi(data) {
  return request({
    url: '/group/detail',
    method: 'post',
    data
  })
}

/**
 * 用户组客户列表
 * @param {*} data
 */
export function groupCustomerQueryApi(data) {
  return request({
    url: '/group/customer-list',
    method: 'post',
    data
  })
}

/**
 * 创建用户组
 * @param {*} data
 */
export function groupCreateApi(data) {
  return request({
    url: '/group/create',
    method: 'post',
    data
  })
}

/**
 * 更新用户组
 * @param {*} data
 */
export function groupUpdateApi(data) {
  return request({
    url: '/group/update',
    method: 'post',
    data
  })
}

/**
 * 删除用户组
 * @param {*} data
 */
export function groupDeleteApi(data) {
  return request({
    url: '/group/delete',
    method: 'post',
    data
  })
}
