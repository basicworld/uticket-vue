const Mock = require('mockjs')

const ticketDetailData = Mock.mock({
  'items|20': [{
    'id': 1,
    'fieldNum': '#1',
    'subject': '@csentence( 8, 20)',
    'content': '@cparagraph',
    'contentType': 'html',
    'userId': 47,
    'userName': '13000020520',
    'userEmail': '1234567890@qq.com',
    'userCellphone': '13000020520',
    'organizationId': null,
    'assigneeId': 12,
    'assigneeName': '@cname',
    'assigneeAvatar': 'https://xxxxxxxxxxxxxxxxx/Fk_5aUhOY0U90dHQU6V34N9WuqX9',
    'userGroupId': 1,
    'userGroupName': '默认组',
    'templateId': 1,
    'priority': '标准',
    'status': '开启',
    'statusEn': 'open',
    'platform': '手工录入',
    'imSubSessionId': 1257,
    'satisfaction': null,
    'tags': '标签１,标签２',
    'followers': [
      {
        'id': 2,
        'nickName': 'Tom'
      },
      {
        'id': 3,
        'nickName': 'Jerry'
      },
      {
        'id': 12,
        'nickName': 'Lucy'
      }
    ],
    'attachments': [
      {
        'name': '附件1',
        'url': 'https://qn-public.udesk.cn/%E7%94%A8%E4%BA%8E%E4%B8%8A%E4%BC%A0%E7%9A%84%E6%96%87%E4%BB%B6-1511169203.txt'
      }
    ],
    'creatorId': 1,
    'createdAt': '@datetime',
    'updatedAt': '2017-08-18 12:06:02',
    'solvingAt': null,
    'resolvedAt': null,
    'closedAt': null,
    'solvedDeadline': null,
    'repliedAt': '2017-08-16 20:41:03',
    'agentRepliedAt': '2017-08-16 20:41:03',
    'customerRepliedAt': '2017-08-08 20:47:42',
    'repliedBy': 'xxx'
  }
  ]
})

module.exports = [
  // 删除工单
  {
    url: '/ticket/delete',
    type: 'post',
    response: config => {
      return {
        'code': 20000,
        'message': 'success'
      }
    }
  },
  // 更新工单
  {
    url: '/ticket/update',
    type: 'post',
    response: config => {
      return {
        'code': 20000,
        'message': 'success'
      }
    }
  },
  // 创建工单
  {
    url: '/ticket/create',
    type: 'post',
    response: config => {
      return {
        'code': 20000,
        'message': '工单创建成功',
        'ticketId': 2
      }
    }
  },
  // 工单列表
  {
    url: '/ticket/list',
    type: 'post',
    response: config => {
      const list = ticketDetailData.items
      return {
        'code': 20000,
        'message': 'success',
        'data': list
      }
    }
  },
  // 获取工单详情
  {
    url: '/ticket/detail',
    type: 'post',
    response: config => {
      const detail = ticketDetailData[0]
      return {
        'code': 20000,
        'message': 'success',
        'data': detail
      }
    }
  }
]
