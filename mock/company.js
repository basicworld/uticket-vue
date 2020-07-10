const Mock = require('mockjs')
const mockData = Mock.mock({
  'companyItems|20': [{
    'id|+1': 1,
    'name': '@cword(5,10)',
    'domains': '@url',
    'updatedAt': '@datetime',
    'createdAt': '@datetime',
    'address': '@province',
    'description': '@cparagraph(1,2)',
    'token': '123456s7hgfd'
  }],
  'companySuggestItems|6': [{
    'id|+1': 1,
    'name': '@cword(5,10)'
  }]
})

module.exports = [

  // update机构
  {
    url: '/company/update',
    type: 'post',
    response: config => {
      return {
        'code': 20000,
        'message': 'success'
      }
    }
  },
  // 新增机构
  {
    url: '/company/create',
    type: 'post',
    response: config => {
      return {
        'code': 20000,
        'message': 'success'
      }
    }
  },
  // 机构建议列表
  {
    url: '/company/suggest',
    type: 'post',
    response: config => {
      const list = mockData.companySuggestItems
      return {
        'code': 20000,
        'message': 'success',
        'data': list
      }
    }
  },
  // 机构列表
  {
    url: '/company/list',
    type: 'post',
    response: config => {
      const list = mockData.companyItems
      return {
        'code': 20000,
        'message': 'success',
        'data': list
      }
    }
  },
  // 机构详情
  {
    url: '/company/detail',
    type: 'post',
    response: config => {
      const item = mockData.companyItems[0]
      return {
        'code': 20000,
        'message': 'success',
        'data': item
      }
    }
  }

]
