import request from '@/utils/request'

/**
 * 获取角色列表
 * @param {*} data
 */
export function roleListQueryApi(data) {
  return request({
    url: '/role/list',
    method: 'post',
    data
  })
}
/**
 * 获取角色详情
 * @param {*} data
 */
export function roleDetailQueryApi(data) {
  return request({
    url: '/role/detail',
    method: 'post',
    data
  })
}
/**
 * 新增角色
 * @param {*} data
 */
export function roleCreateApi(data) {
  return request({
    url: '/role/create',
    method: 'post',
    data
  })
}
/**
 * 更新角色
 * @param {*} data
 */
export function roleUpdateApi(data) {
  return request({
    url: '/role/update',
    method: 'post',
    data
  })
}
/**
 * 更新角色
 * @param {*} data
 */
export function roleDeleteApi(data) {
  return request({
    url: '/role/delete',
    method: 'post',
    data
  })
}
