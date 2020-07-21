const Mock = require('mockjs')

const mockData = Mock.mock({
  'roleItems|10': [{
    'id|+1': 1, // id
    roleName: '@cword(5,10)', // 角色名称
    description: '@cword(10,20)', // 描述
    permissionIds: '1,4,5', // 对应的权限id，格式： id1,id2,id3
    createTime: '@datetime', // 创建时间
    updateTime: '@datetime' // 更新时间
  }]
})

module.exports = [
  {
    url: '/role/list',
    type: 'post',
    response: config => {
      const list = mockData.roleItems
      return {
        'code': 20000,
        'message': 'success',
        'data': list,
        'total': 9
      }
    }
  },
  {
    url: '/role/detail',
    type: 'post',
    response: config => {
      const item = mockData.roleItems[0]
      return {
        'code': 20000,
        'message': 'success',
        'data': item
      }
    }
  },
  {
    url: '/role/update',
    type: 'post',
    response: config => {
      return {
        'code': 20000,
        'message': 'success'
      }
    }
  },
  {
    url: '/role/delete',
    type: 'post',
    response: config => {
      return {
        'code': 20000,
        'message': 'success'
      }
    }
  },
  {
    url: '/role/create',
    type: 'post',
    response: config => {
      return {
        'code': 20000,
        'message': 'success'
      }
    }
  }

]
