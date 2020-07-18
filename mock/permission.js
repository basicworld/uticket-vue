const Mock = require('mockjs')

const mockData = Mock.mock({
  'permissionItems|10': [{
    'id|+1': 1,
    'permissionName': '@cword(5,10)',
    'permissionKey': 'word(5,8)',
    'permissionGroupName': /(我的工单|工单中心|系统管理)/

  }]
})

module.exports = [
  {
    url: '/permission/list',
    type: 'post',
    response: config => {
      const list = mockData.permissionItems
      return {
        'code': 20000,
        'message': 'success',
        'data': list,
        'total': 14
      }
    }
  }
]
