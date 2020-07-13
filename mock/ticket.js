const Mock = require('mockjs')

const mockData = Mock.mock({
  'ticketItems|20': [{
    'id': 1, // id
    'fieldNum': '#1', // 编号
    'subject': '@csentence( 8, 20)', // 主题
    'content': '@cparagraph', // 内容
    'contentType': 'html', // 内容类型
    'userId': 47, // 客户id
    'userName': '13000020520', // 客户姓名
    'userEmail': '1234567890@qq.com', // 客户email
    'userCellphone': '13000020520', // 客户手机
    'companyId': null, // 客户所属公司id
    'assigneeId': 12, // 受理客服id
    'assigneeName': '@cname', // 受理客服姓名
    'assigneeAvatar': 'https://xxxxxxxxxxxxxxxxx/Fk_5aUhOY0U90dHQU6V34N9WuqX9', // 受理客服头像
    'userGroupId': 1, // 受理客服组id
    'userGroupName': '默认组', // 受理客服名称
    'priority': '标准', // 优先级
    'status': '开启', // 状态
    'statusEn': 'open', // 状态英文
    'platform': '手工录入', // 来源
    'imSubSessionId': 1257, // 工单回话id
    'satisfaction': null, // 满意度调查结果
    'tags': '标签１,标签２', // 变迁
    'followers': [ // 关注者
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
    'attachments': [ // 附件
      {
        'name': '附件1',
        'url': 'https://qn-public.udesk.cn/%E7%94%A8%E4%BA%8E%E4%B8%8A%E4%BC%A0%E7%9A%84%E6%96%87%E4%BB%B6-1511169203.txt'
      }
    ],
    'creatorId': 1, // 创建人id
    'createdAt': '@datetime', // 创建时间
    'updatedAt': '2017-08-18 12:06:02', // 更新时间
    'solvingAt': null, // 开始解决时间
    'resolvedAt': null, // 解决时间
    'closedAt': null, // 关闭时间
    'solvedDeadline': null, // 解决截止日期
    'repliedAt': '2017-08-16 20:41:03', // 最后回复日期
    'agentRepliedAt': '2017-08-16 20:41:03', // 客服最后回复日期
    'customerRepliedAt': '2017-08-08 20:47:42', // 客户最后回复日期
    'repliedBy': 'xxx' // 最后回复人
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
      const list = mockData.ticketItems
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
      const detail = mockData.ticketItems[0]
      return {
        'code': 20000,
        'message': 'success',
        'data': detail
      }
    }
  },
  // 上传附件
  {
    url: '/ticket/file/upload',
    type: 'post',
    response: config => {
      return {
        'code': 20000,
        'message': 'success'
      }
    }
  }
]
