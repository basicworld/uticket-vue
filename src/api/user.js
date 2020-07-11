import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

/**
 * 获取用户列表
 * @param {*} data
 */
export function userListQueryApi(data) {
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}
/**
 * 获取用户suggest列表
 * @param {*} data
 */
export function userSuggestQueryApi(data) {
  return request({
    url: '/user/suggest',
    method: 'post',
    data
  })
}

/**
 * 获取用户详情
 * @param {*} data
 */
export function userDetailQueryApi(data) {
  return request({
    url: '/user/detail',
    method: 'post',
    data
  })
}

/**
 * 创建用户
 * @param {*} data
 */
export function userCreateApi(data) {
  return request({
    url: '/user/create',
    method: 'post',
    data
  })
}

/**
 * 更新用户
 * @param {*} data
 */
export function userUpdateApi(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

/**
 * 删除用户
 * @param {*} data
 */
export function userDeleteApi(data) {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  })
}

/**
 * 获取用户的角色列表
 * @param {*} data
 */
export function userRoleListQueryApi(data) {
  return request({
    url: '/user/role-list',
    method: 'post',
    data
  })
}
