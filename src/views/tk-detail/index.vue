<template>
  <div>
    <el-row>
      <el-col :span="16" style="padding-right: 10px;">
        <div class="grid-content bg-purple">
          <!--  工单基本信息展示框 -->

          <el-card v-if="!ticketBasicInfoEditable" class="">
            <div slot="header" class="clearfix">
              <span>{{ ticketBasicInfo.subject }}</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="ticketBasicInfoEditable=true">编辑</el-button>
            </div>
            <div>
              {{ ticketBasicInfo.content }}
            </div>
          </el-card>
          <!--  工单基本信息编辑框 -->

          <el-card v-if="ticketBasicInfoEditable" class="">
            <el-form ref="ticketBasicInfoEditForm" label-width="40px" size="small" :model="ticketBasicInfo">
              <el-form-item label="标题">
                <el-input v-model="ticketBasicInfo.subject" />
              </el-form-item>
              <el-form-item label="内容">
                <el-input v-model="ticketBasicInfo.content" type="textarea" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary">保存</el-button>
                <el-button @click="ticketBasicInfoEditable=false">取消编辑</el-button>
              </el-form-item>
            </el-form>
          </el-card>
          <!--  工单处理框 -->

          <el-tabs type="border-card" class="top-margin">
            <el-tab-pane label="回复">
              <el-form ref="actionFormReply" :model="newAction" label-width="70px" size="small">
                <el-form-item label="回复内容">
                  <el-input v-model="newAction.content" type="textarea" />
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" type="primary" @click="onSubmitNewAction('replay')">回复</el-button>
                  <el-button size="mini" @click="onCancel">清空内容</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="分配">
              <el-form ref="actionFormDevide" :model="newAction" label-width="70px" size="small">
                <el-form-item label="选择客服" prop="assigneeId">
                  <el-select
                    v-model="newAction.assigneeId"
                    filterable
                    remote
                    placeholder="输入客服姓名搜索"
                    :remote-method="userRemoteSearch"
                    :loading="userSearchLoading"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="item in userOptions"
                      :key="item.id"
                      :label="item.nickName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="处理描述">
                  <el-input v-model="newAction.content" type="textarea" />
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" type="primary" @click="onSubmitNewAction('devide')">确认分配</el-button>
                  <el-button size="mini" @click="onCancel">取消分配</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="解决">
              <el-form ref="actionFormSolve" :model="newAction" label-width="70px" size="small">
                <el-form-item label="处理描述">
                  <el-input v-model="newAction.content" type="textarea" />
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" type="primary" @click="onSubmitNewAction('solve')">标记为已解决</el-button>
                  <el-button size="mini" @click="onCancel">清空描述</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="关闭">
              <el-form ref="actionFormClose" :model="newAction" label-width="70px" size="small">
                <el-form-item label="处理描述">
                  <el-input v-model="newAction.content" type="textarea" />
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" type="primary" @click="onSubmitNewAction('close')">标记为已关闭</el-button>
                  <el-button size="mini" @click="onCancel">清空描述</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="删除">
              <el-form ref="actionFormDelete" :model="newAction" label-width="70px" size="small">
                <el-form-item label="处理描述">
                  <el-input v-model="newAction.content" type="textarea" />
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" type="primary" @click="onSubmitNewAction('delete')">删除</el-button>
                  <el-button size="mini" @click="onCancel">清空描述</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <!--  工单历史处理记录框 -->

          <el-card class="top-margin">
            <div slot="header" class="clearfix">
              <span>处理记录</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="queryActions">刷新</el-button>
            </div>
            <div>
              <el-timeline>
                <el-timeline-item
                  v-for="(action, index) in historyActions"
                  :key="index"
                  :timestamp="action.timestamp"
                >
                  {{ action.content }}
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">

          <!--  工单属性展示框 -->
          <el-card v-if="!ticketAttributesEditable" class="">
            <div slot="header" class="clearfix">
              <span>工单属性</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="ticketAttributesEditable=true">编辑</el-button>
            </div>
            <div>
              <el-row>
                <el-col :span="6"><span class="attr-table-title">编号:</span></el-col>
                <el-col :span="18"><span>#{{ ticketId }}</span></el-col>
              </el-row>
              <el-row class="attr-row">
                <el-col :span="6"><span class="attr-table-title">状态:</span></el-col>
                <el-col :span="18"><span>{{ ticketAttributes.statusCn }}</span></el-col>
              </el-row>
              <el-row class="attr-row">
                <el-col :span="6"><span class="attr-table-title">优先级:</span></el-col>
                <el-col :span="18"><span>{{ ticketAttributes.priorityCn }}</span></el-col>
              </el-row>
              <el-row class="attr-row">
                <el-col :span="6"><span class="attr-table-title">来源:</span></el-col>
                <el-col :span="18">
                  <span>{{ ticketAttributes.platformCn }}</span>
                </el-col>
              </el-row>
              <el-row class="attr-row">
                <el-col :span="6"><span class="attr-table-title">标签:</span></el-col>
                <el-col :span="18">
                  <span>{{ ticketAttributes.tags }}</span>
                </el-col>
              </el-row>
              <el-row class="attr-row">
                <el-col :span="6"><span class="attr-table-title">受理人:</span></el-col>
                <el-col :span="18">
                  <span>{{ ticketAttributes.assigneeName }}</span>
                </el-col>
              </el-row>
              <el-row class="attr-row">
                <el-col :span="6"><span class="attr-table-title">关注人:</span></el-col>
                <el-col :span="18">
                  <span>{{ ticketAttributes.followerNames }}</span>
                </el-col>
              </el-row>
              <el-row class="attr-row">
                <el-col :span="6"><span class="attr-table-title">创建人:</span></el-col>
                <el-col :span="18">
                  <span>{{ ticketAttributes.creatorName }}</span>
                </el-col>
              </el-row>
              <el-row class="attr-row">
                <el-col :span="6"><span class="attr-table-title">创建时间:</span></el-col>
                <el-col :span="18">
                  <span>{{ ticketAttributes.createdAt }}</span>
                </el-col>
              </el-row>
            </div>
          </el-card>
          <!--  工单属性编辑框 -->
          <el-card v-if="ticketAttributesEditable">
            <div slot="header" class="clearfix">
              <span>工单属性编辑</span>
            </div>
            <div>
              <el-form size="small" label-width="70px" label-position="left">
                <el-form-item label="编号" prop="id">
                  <el-input v-model="ticketId" disabled />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                  <el-select v-model="ticketAttributes.status" style="width: 100%;">
                    <el-option key="open" value="open" label="开启" />
                    <el-option key="solving" value="solving" label="解决中" />
                    <el-option key="resolved" value="resolved" label="已解决" />
                    <el-option key="closed" value="closed" label="已关闭" />
                  </el-select>
                </el-form-item>
                <el-form-item label="优先级" prop="priority">
                  <el-select v-model="ticketAttributes.priority" style="width: 100%;">
                    <el-option key="low" value="low" label="低" />
                    <el-option key="medium" value="medium" label="标准" />
                    <el-option key="high" value="high" label="高" />
                    <el-option key="urgency" value="urgency" label="紧急" />
                  </el-select>
                </el-form-item>
                <el-form-item label="来源" prop="platformCn">
                  <el-input v-model="ticketAttributes.platformCn" />
                </el-form-item>
                <el-form-item label="标签" prop="tags">
                  <el-input v-model="ticketAttributes.tags" />
                </el-form-item>
                <el-form-item label="受理人">
                  <el-select
                    v-model="ticketAttributes.assigneeId"
                    filterable
                    remote
                    placeholder="输入客服姓名搜索"
                    :remote-method="userRemoteSearch"
                    :loading="userSearchLoading"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="item in userOptions"
                      :key="item.id"
                      :label="item.nickName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="关注人">
                  <el-select
                    v-model="ticketAttributes.followerIds"
                    filterable
                    remote
                    multiple
                    placeholder="输入客服姓名搜索，可多选"
                    :remote-method="userRemoteSearch"
                    :loading="userSearchLoading"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="item in userOptions"
                      :key="item.id"
                      :label="item.nickName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="创建人" prop="creatorName">
                  <el-input v-model="ticketAttributes.creatorName" disabled />
                </el-form-item>
                <el-form-item label="创建时间" prop="createdAt">
                  <el-input v-model="ticketAttributes.createdAt" disabled />
                </el-form-item>

                <el-form-item>
                  <el-button size="mini" type="primary">保存</el-button>
                  <el-button size="mini" @click="ticketAttributesEditable=false">取消编辑</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>

          <!--  客户信息展示框 -->
          <el-card v-if="!customerAttributesEditable" class="top-margin">
            <div slot="header" class="clearfix">
              <span>客户信息</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="customerAttributesEditable=true">编辑</el-button>
            </div>
            <div>
              <el-row>
                <el-col :span="6"><span class="attr-table-title">姓名:</span></el-col>
                <el-col :span="18">
                  <span>{{ customerAttributes.nickName }}</span>
                </el-col>
              </el-row>
              <el-row class="attr-row">
                <el-col :span="6"><span class="attr-table-title">公司:</span></el-col>
                <el-col :span="18">
                  <span>{{ customerAttributes.companyName }}</span>
                </el-col>
              </el-row>
              <el-row class="attr-row">
                <el-col :span="6"><span class="attr-table-title">电话:</span></el-col>
                <el-col :span="18">
                  <span>{{ customerAttributes.cellphone }}</span>
                </el-col>
              </el-row>
              <el-row class="attr-row">
                <el-col :span="6"><span class="attr-table-title">邮箱:</span></el-col>
                <el-col :span="18">
                  <span>{{ customerAttributes.email }}</span>
                </el-col>
              </el-row>

            </div>
          </el-card>

          <!--  客户信息编辑框 -->
          <el-card v-if="customerAttributesEditable" class="top-margin">
            <div slot="header" class="clearfix">
              <span>客户信息编辑</span>
            </div>
            <div>
              <el-form size="small" label-width="70px" label-position="left">
                <el-form-item label="姓名" prop="nickName">
                  <el-input v-model="customerAttributes.nickName" />
                </el-form-item>
                <el-form-item label="公司" prop="companyName">
                  <el-input v-model="customerAttributes.companyName" />
                </el-form-item>
                <el-form-item label="手机" prop="cellphone">
                  <el-input v-model="customerAttributes.cellphone" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="customerAttributes.email" />
                </el-form-item>

                <el-form-item>
                  <el-button size="mini" type="primary">保存</el-button>
                  <el-button size="mini" @click="customerAttributesEditable=false">取消编辑</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>

        </div>
      </el-col>
    </el-row>

    <el-dialog
      width="30%"
      title="内层 Dialog"
      :visible.sync="innerVisible"
      append-to-body
    />

  </div>
</template>

<script>
import { userSuggestQueryApi } from '@/api/user'
import { ticketDetailQueryApi, ticketActionListQueryApi } from '@/api/ticket'
import { RESP_CODE } from '@/utils/response-code'
export default {
  name: 'TicketDetail',
  data() {
    return {
      userSearchLoading: false,
      userOptions: [],
      // 工单处理action的id
      activityId: undefined,
      historyActionLoading: false,
      // 工单处理记录
      historyActions: [{
        content: '活动按期开始', // 处理内容
        timestamp: '[客服]张三 2018-04-15' // 处理人类型、处理人、处理时间
      }, {
        content: '通过审核',
        timestamp: '[客服]张三 2018-04-13'
      }, {
        content: '创建成功',
        timestamp: '[客户]李四 2018-04-11'
      }],
      // dialog visible
      innerVisible: false,
      ticketId: '', // 工单id
      ticketBasicInfoEditable: false,
      // 工单详细数据
      ticketAllInfo: {},
      // 工单基础数据
      ticketBasicInfo: {
        subject: 'default subject', // 标题
        content: 'default content' // 内容
      },
      ticketAttributesEditable: false,
      // 工单附加属性
      ticketAttributes: {
        status: '', // 状态
        statusCn: '', // 状态
        platform: '', // 来源
        platformCn: '', // 来源
        tags: '', // 标签
        activityId: '', // 工单action list 的id
        priority: '', // 优先级
        priorityCn: '', // 优先级
        creatorId: '', // 创建人
        creatorName: '', // 创建人
        assigneeId: '', // 受理人
        assigneeName: '', // 受理人姓名
        followers: [], // 关注人
        followerNames: '',
        createdAt: ''// 创建时间
        //
      },
      customerAttributesEditable: false,
      // 客户属性
      customerAttributes: {
        customerId: '',
        nickName: '', // 名称
        email: '', // 邮箱
        cellphone: '', // 手机号
        companyId: '',
        companyName: '' // 公司名称
      },
      // 新增处理记录
      newAction: {
        action: '', // 动作： devide--分配 solve--解决  close--关闭 delete--删除
        content: '', // 描述
        assigneeId: '' // 分配的客服id
      }

    }
  },
  watch: {
    // 监控api返回的工单属性详情
    ticketAllInfo: {
      deep: true,
      handler(val) {
        this.copyTicketAllInfo()
      }
    },
    // 如果activity id不为空，则查询action list
    activityId: {
      deep: true,
      handler(val) {
        this.queryActions()
      }
    }
  },
  created() {
    this.queryTicketDetails()
    this.userRemoteSearch()
  },
  methods: {
    // 根据action id 查询action列表
    queryActions() {
      if (!this.activityId) {
        this.historyActions = []
        return
      }
      ticketActionListQueryApi({ id: this.activityId }).then(res => {
        if (res.code === RESP_CODE.OK) {
          this.historyActions = res.data
        } else {
          this.$message.warning('获取活动列表异常：' + res.code)
        }
      }).catch(() => {
        this.$message.error('获取活动列表失败，稍后再试')
      })
    },
    // 根据id查询工单详情
    queryTicketDetails(ticketId) {
      ticketDetailQueryApi({ id: ticketId }).then(res => {
        if (res.code === RESP_CODE.OK) {
          this.ticketAllInfo = res.data
        } else {
          this.$message.warning('查询工单详情异常：' + res.code)
        }
      }).catch(() => {
        this.$message.error('查询工单详情失败，稍后再试')
      })
    },
    // 把ticketAllInfo复制给其他变量
    copyTicketAllInfo() {
      console.log('copyTicketAllInfo', this.ticketAllInfo)
      // id
      this.ticketId = this.ticketAllInfo.id
      this.activityId = this.ticketAllInfo.activityId
      // 工单基本属性
      this.ticketBasicInfo.subject = this.ticketAllInfo.subject
      this.ticketBasicInfo.content = this.ticketAllInfo.content
      // 工单附加属性
      this.ticketAttributes.status = this.ticketAllInfo.status // 状态
      this.ticketAttributes.statusCn = this.ticketAllInfo.statusCn // 状态 英文
      this.ticketAttributes.platform = this.ticketAllInfo.platform // 来源
      this.ticketAttributes.platformCn = this.ticketAllInfo.platformCn // 来源
      this.ticketAttributes.tags = this.ticketAllInfo.tags // 标签
      this.ticketAttributes.priority = this.ticketAllInfo.priority // 优先级
      this.ticketAttributes.priorityCn = this.ticketAllInfo.priorityCn // 优先级
      this.ticketAttributes.creatorId = this.ticketAllInfo.creatorId // 创建人
      this.ticketAttributes.creatorName = this.ticketAllInfo.creatorName // 创建人
      this.ticketAttributes.assigneeId = this.ticketAllInfo.assigneeId // 受理人
      this.ticketAttributes.assigneeName = this.ticketAllInfo.assigneeName // 受理人姓名
      var followers = this.ticketAllInfo.followers // 关注人
      if (this.ticketAttributes.followers) {
        this.ticketAttributes.followers = followers
        var names = []
        for (var i = 0; i < followers.length; i++) {
          names.push(followers[i].nickName)
        }
        this.ticketAttributes.followerNames = names.join()
      }
      this.ticketAttributes.createdAt = this.ticketAllInfo.createdAt// 创建时间
      // 客户属性
      this.customerAttributes.customerId = this.ticketAllInfo.customerId // 客户id
      this.customerAttributes.nickName = this.ticketAllInfo.customerName // 名称
      this.customerAttributes.email = this.ticketAllInfo.customerEmail // 邮箱
      this.customerAttributes.cellphone = this.ticketAllInfo.customerCellphone // 手机号
      this.customerAttributes.companyId = this.ticketAllInfo.companyId // 公司id
      this.customerAttributes.companyName = this.ticketAllInfo.companyName // 公司名称
    },
    // 远程搜索user
    userRemoteSearch(query) {
      if (query !== '') {
        this.userSearchLoading = true
        setTimeout(() => {
          userSuggestQueryApi().then(res => {
            if (res.code === 20000) {
              this.userOptions = res.data
            }
            this.userSearchLoading = false
          }).catch(() => {
            this.$message.error('远程搜索用户错误')
          })
        }, 200)
      } else {
        this.userOptions = []
      }
    },
    // 处理动作
    onSubmitNewAction(actionName) {
      // 判断action是否合法
      var allowedAction = ['devide', 'solve', 'close', 'delete']
      if (allowedAction.indexOf(actionName) < 0) {
        this.$message.warning('不允许的操作动作：' + actionName)
        return false
      }
      // 更新工单状态
    },
    // 取消
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.el-card /deep/ .el-card__header {
  padding: 10px 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 16px;
}
.top-margin{
  margin-top: 10px;
}
.attr-row{
  margin-top: 10px;
}
.attr-table-title{
   font-weight: bold;
}
.line{
  text-align: center;
}
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>

