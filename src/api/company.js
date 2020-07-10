import request from '@/utils/request'

/**
 * 获取公司列表
 * @param {*} data
 */
export function companyListQueryApi(data) {
  return request({
    url: '/company/list',
    method: 'post',
    data
  })
}
/**
 * 获取公司列表建议
 * @param {*} data
 */
export function companySuggestQueryApi(data) {
  return request({
    url: '/company/suggest',
    method: 'post',
    data
  })
}

/**
 * 公司详情
 * @param {*} data
 */
export function companyDetailQueryApi(data) {
  return request({
    url: '/company/detail',
    method: 'post',
    data
  })
}

/**
 * 公司客户列表
 * @param {*} data
 */
export function companyCustomerQueryApi(data) {
  return request({
    url: '/company/customer-list',
    method: 'post',
    data
  })
}

/**
 * 创建公司
 * @param {*} data
 */
export function companyCreateApi(data) {
  return request({
    url: '/company/create',
    method: 'post',
    data
  })
}

/**
 * 更新公司
 * @param {*} data
 */
export function companyUpdateApi(data) {
  return request({
    url: '/company/update',
    method: 'post',
    data
  })
}

/**
 * 删除公司
 * @param {*} data
 */
export function companyDeleteApi(data) {
  return request({
    url: '/company/delete',
    method: 'post',
    data
  })
}
