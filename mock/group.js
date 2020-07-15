const Mock = require('mockjs')

const mockData = Mock.mock({
  'groupItems|10': [{
    'id|+1': 1, // id
    groupName: '@cword(5,10)', // 组名
    description: '@cword(10,20)', // 描述
    createdAt: '@datetime', // 创建
    updatedAt: '@datetime',
    userCount: /(3|5|10)/ // 用户数
  }],
  'groupMemberItems|3': [{
    'id|+1': 10, // id
    'email': '@email', // email
    'cellphone': /(135|136|180|185|156|189)\d{8}/, // 手机号,
    'nickName': '@cname' // 姓名

  }]
})

module.exports = [
  {
    url: '/group/customer-list',
    type: 'post',
    response: config => {
      const list = mockData.groupMemberItems
      return {
        'code': 20000,
        'message': 'success',
        'data': list
      }
    }
  },
  {
    url: '/group/list',
    type: 'post',
    response: config => {
      const list = mockData.groupItems
      return {
        'code': 20000,
        'message': 'success',
        'total': 33,
        'data': list
      }
    }
  },
  {
    url: '/group/detail',
    type: 'post',
    response: config => {
      const item = mockData.groupItems[0]
      return {
        'code': 20000,
        'message': 'success',
        'data': item
      }
    }
  },
  {
    url: '/group/create',
    type: 'post',
    response: config => {
      return {
        'code': 20000,
        'message': 'success'
      }
    }
  },
  {
    url: '/group/update',
    type: 'post',
    response: config => {
      return {
        'code': 20000,
        'message': 'success'
      }
    }
  },
  {
    url: '/group/delete',
    type: 'post',
    response: config => {
      return {
        'code': 20000,
        'message': 'success'
      }
    }
  }
]
