import request from '@/utils/request'

/**
 * 获取客户列表
 * @param {filter_id:'', query:'', page:'', pageSize:''} data
 */
export function customerListQueryApi(data) {
  return request({
    url: '/customer/list',
    method: 'post',
    data
  })
}
/**
 * 获取建议客户列表
 *
 */
export function customerSuggestQueryApi(data) {
  return request({
    url: '/customer/suggest',
    method: 'post',
    data
  })
}

/**
 * 获取客户详情
 * @param {type:'', content:''} data
 */
export function customerDetailQueryApi(data) {
  return request({
    url: '/customer/detail',
    method: 'post',
    data
  })
}

/**
 * 创建客户
 * @param {customer:'', other_emails:'', tags:''} data
 */
export function customerCreateApi(data) {
  return request({
    url: '/customer/create',
    method: 'post',
    data
  })
}

/**
 * 更新客户
 * @param {*} data
 */
export function customerUpdateApi(data) {
  return request({
    url: '/customer/update',
    method: 'post',
    data
  })
}

/**
 * 删除客户
 * @param {type:'', content:''} data
 */
export function customerDeleteApi(data) {
  return request({
    url: '/customer/delete',
    method: 'post',
    data
  })
}

