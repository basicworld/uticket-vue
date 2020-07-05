import request from '@/utils/request'
// API规范参照：http://www.udesk.cn/doc/apiv2/tickets/#_3
/**
 * 创建工单
 * @param {ticket:{}} data 工单对象
 */
export function ticketCreateApi(data) {
  return request({
    url: '/ticket/create',
    method: 'post',
    data
  })
}

/**
 * 获取工单详情
 * @param {id:'', num:''} data
 */
export function ticketDetailQueryApi(data) {
  return request({
    url: '/ticket/detail',
    method: 'post',
    data
  })
}

/**
 * 更新工单
 * @param {ticket:{id:'', }} data
 */
export function ticketUpdateApi(data) {
  return request({
    url: '/ticket/update',
    method: 'post',
    data
  })
}

/**
 * 删除工单
 * @param {id:'', num:''} data
 */
export function ticketDeleteApi(data) {
  return request({
    url: '/ticket/delete',
    method: 'post',
    data
  })
}

/**
 * 获取工单列表
 * @param {page:'', pageSize:''} data
 */
export function ticketListQueryApi(data) {
  return request({
    url: '/ticket/list',
    method: 'post',
    data
  })
}
