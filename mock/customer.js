const Mock = require('mockjs')
const mockData = Mock.mock({
  'customerItems|20': [{
    'id': '@id',
    'nickName': '@cname',
    'level': 'normal',
    'description': null,
    'ownerId': 1,
    'ownerGroupId': 1,
    'customFields': {
      'SelectField_1': ['0'],
      'SelectField_2': ['0']
    },
    'openApiToken': null,
    'companyId': '@id',
    'companyName': '@name',
    'isBlocked': false,
    'webToken': 'dcc79435-e9e2-436a-9cdf-c9f13f728923',
    'sdkToken': 'b0bf5c37-ebdd-4539-a961-7941aca02e4c',
    'tags': '有钱,任性',
    'richTags': [
      {
        'id': 1,
        'name': '富文本标签1',
        'color': '#70BE72',
        'company_id': 1
      }
    ],
    'firstContactAt': null,
    'lastContactAt': '@datetime',
    'email': '@email',
    'cellphone': '12344445555',
    'otherEmails': [],
    'cellphones': [
      {
        'id': 1,
        'content': '13000000001'
      }
    ],
    'platform': '手工录入',
    'sourceChannel': '手动创建',
    'weixins': [
      {
        'appid': 'wxf54489a1azz51885',
        'openid': 'og8dL0nfmm7wVjIVzk1deqt9Vkdk',
        'unionid': ''
      }
    ],
    'weixinMinis': [
      {
        'appid': 'wxc7279f8eefd70a4a',
        'openid': 'oa3cT0mano9wVhIpkp3drqy9yDuw',
        'unionid': ''
      }
    ]
  }]
})

module.exports = [

  // 新增客户
  {
    url: '/customer/create',
    type: 'post',
    response: config => {
      return {
        'code': 20000,
        'message': 'success'
      }
    }
  },
  // 客户列表
  {
    url: '/customer/list',
    type: 'post',
    response: config => {
      const list = mockData.customerItems
      return {
        'code': 20000,
        'message': 'success',
        'data': list
      }
    }
  },
  // 客户详情
  {
    url: '/customer/detail',
    type: 'post',
    response: config => {
      const item = mockData.customerItems[0]
      return {
        'code': 20000,
        'message': 'success',
        'data': item
      }
    }
  }

]
