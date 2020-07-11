const Mock = require('mockjs')
const mockData = Mock.mock({
  'customerItems|10': [{
    'id': '@id', // id
    'nickName': '@cname', // 姓名
    'level': /(normal|vip)/, // 级别 normal vip
    'description': null, // 描述
    'ownerId': 1, // 所属客服id，暂不启用
    'ownerGroupId': 1, // 所属客服组id，暂不启用
    'companyId': '@id', // 所属公司id
    'companyName': '@name', // 所属公司名称
    'isBlocked': false, // 是否黑名单
    'tags': '有钱,任性', // 标签
    'firstContactAt': null, // 首次联系日期
    'lastContactAt': '@datetime', // 最后联系日期
    'email': '@email', // 邮箱
    'cellphone': /(135|136|180|185|156|189)\d{8}/, // 手机号
    'otherEmails': [], // 其他邮箱，暂不启用
    'otherCellphones': [], // 其他手机号，暂不启用
    'sourceChannel': '手动创建' // 客户来源中文名称
  }],
  'customerSuggestItems|5': [{
    'id': '@id', // id
    'nickName': '@cname', // 姓名
    'email': '@email', // 邮箱
    'cellphone': /(135|136|180|185|156|189)\d{8}/ // 手机号
  }]
})

module.exports = [

  // delete客户
  {
    url: '/customer/delete',
    type: 'post',
    response: config => {
      return {
        'code': 20000,
        'message': 'success'
      }
    }
  },
  // update客户
  {
    url: '/customer/update',
    type: 'post',
    response: config => {
      return {
        'code': 20000,
        'message': 'success'
      }
    }
  },
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
  // 客户suggest列表
  {
    url: '/customer/suggest',
    type: 'post',
    response: config => {
      const list = mockData.customerSuggestItems
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
