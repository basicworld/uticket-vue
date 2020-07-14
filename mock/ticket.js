const Mock = require('mockjs')

const mockData = Mock.mock({
  'ticketItems|20': [{
    'id': 1, // id
    'fieldNum': '#1', // 编号
    'subject': '@csentence( 8, 20)', // 主题
    'content': '@cparagraph', // 内容
    'contentType': 'txt', // 内容类型

    'customerId': 47, // 客户id
    'customerName': '@cname', // 客户姓名
    'customerEmail': '@email', // 客户email
    'customerCellphone': /(135|136|180|185|156|189)\d{8}/, // 客户手机
    'companyId': 1111, // 客户所属公司id
    'companyName': '人民日报', // 客户所属公司id

    'assigneeId': 12, // 受理客服id
    'assigneeName': '@cname', // 受理客服姓名
    'assigneeAvatar': 'https://xxxxxxxxxxxxxxxxx/Fk_5aUhOY0U90dHQU6V34N9WuqX9', // 受理客服头像
    'assignGroupId': 1, // 受理客服组id
    'assignGroupName': '默认组', // 受理客服名称

    'priority': 'normal', // 优先级
    'priorityCn': '标准', // 优先级
    'status': 'open', // 状态
    'statusCn': '开启', // 状态
    'platform': 'hands', // 来源
    'platformCn': '手工录入', // 来源
    'actionSessionId': 1257, // 工单对话id 处理记录id
    'satisfaction': null, // 满意度调查结果 暂不使用
    'tags': '标签１,标签２', // 标签
    'followers': [ // 关注者(客服)
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
        'name': '附件1.doc',
        'url': 'https://qn-public.udesk.cn/1111.txt'
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
    'assigneeRepliedAt': '2017-08-16 20:41:03', // 客服最后回复日期
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
