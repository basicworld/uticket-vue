const Mock = require('mockjs')
const mockData = Mock.mock({
  'companyItems|10': [{
    'id|+1': 1, // id
    'name': '@cword(5,10)', // 公司名称
    'domains': '@url', // 域名
    'updatedAt': '@datetime', // 更新时间
    'createdAt': '@datetime', // 创建时间
    'address': '@province', // 公司地址
    'description': '@cparagraph(1,2)' // 描述
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
