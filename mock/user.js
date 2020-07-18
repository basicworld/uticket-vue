const Mock = require('mockjs')
const mockData = Mock.mock({
  'userItems|10': [{
    'id|+1': 1, // id
    'email': '@email', // email
    'cellphone': /(135|136|180|185|156|189)\d{8}/, // 手机号,
    'username': '@cname', // 姓名
    'profile': 'im', // 员工类型
    'roleNames': '普通客服，组长', // 角色
    'duty': null, // 员工职务
    'groupId': 1, // 所属客服组列表
    'groupName': '金融部',
    'imAbilityValue': 10, // 对话技能值
    'workId': '123', // 工号
    'disableStatus': 'enable', // 启用或禁用
    'availability': true, // 能否接受自动工单分配，暂不使用
    'avatar': null, // 头像，暂不使用
    'roles': [ // 所属角色信息
      {
        'id': 2,
        'roleName': '客服'
      }
    ],
    'departments': [ // 所属部门信息
      {
        'id': 1,
        'name': '客服组1'
      }
    ]
  }],
  'userSuggestItems|5': [{
    'id|+1': 10, // id
    'email': '@email', // email
    'cellphone': /(135|136|180|185|156|189)\d{8}/, // 手机号,
    'username': '@cname' // 姓名

  }]

})

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // user列表
  {
    url: '/user/list',
    type: 'post',
    response: config => {
      const list = mockData.userItems
      return {
        'code': 20000,
        'message': 'success',
        'data': list,
        'total': 23
      }
    }
  },
  // user suggest列表
  {
    url: '/user/suggest',
    type: 'post',
    response: config => {
      const list = mockData.userSuggestItems
      return {
        'code': 20000,
        'message': 'success',
        'data': list,
        'total': 5
      }
    }
  },
  // user delete
  {
    url: '/user/delete',
    type: 'post',
    response: config => {
      return {
        'code': 20000,
        'message': 'success'
      }
    }
  },
  // user create
  {
    url: '/user/create',
    type: 'post',
    response: config => {
      return {
        'code': 20000,
        'message': 'success'
      }
    }
  },
  // user update
  {
    url: '/user/update',
    type: 'post',
    response: config => {
      return {
        'code': 20000,
        'message': 'success'
      }
    }
  }
]
