<template>
  <div>
    <el-row>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <el-card v-if="!ticketBasicInfoEditable" class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ ticketBasicInfo.subject }}</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="ticketBasicInfoEditable=true">编辑</el-button>
            </div>
            <div>
              {{ ticketBasicInfo.content }}
            </div>
          </el-card>

          <el-card v-if="ticketBasicInfoEditable" class="box-card">
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

          <el-tabs type="border-card" class="top-margin">
            <el-tab-pane label="分配">
              <el-form ref="actionFormDevide" :model="newActivity" label-width="68px" size="small">
                <el-form-item label="选择客服" prop="assigneeId">
                  <el-select
                    v-model="newActivity.assigneeId"
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
                  <el-input v-model="newActivity.content" type="textarea" />
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" type="primary" @click="onSubmitNewAction('devide')">确认分配</el-button>
                  <el-button size="mini" @click="onCancel">取消分配</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="解决">
              <el-form ref="actionFormSolve" :model="newActivity" label-width="68px" size="small">
                <el-form-item label="处理描述">
                  <el-input v-model="newActivity.content" type="textarea" />
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" type="primary" @click="onSubmitNewAction('solve')">标记为已解决</el-button>
                  <el-button size="mini" @click="onCancel">清空描述</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="关闭">
              <el-form ref="actionFormClose" :model="newActivity" label-width="68px" size="small">
                <el-form-item label="处理描述">
                  <el-input v-model="newActivity.content" type="textarea" />
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" type="primary" @click="onSubmitNewAction('close')">标记为已关闭</el-button>
                  <el-button size="mini" @click="onCancel">清空描述</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="删除">
              <el-form ref="actionFormDelete" :model="newActivity" label-width="68px" size="small">
                <el-form-item label="处理描述">
                  <el-input v-model="newActivity.content" type="textarea" />
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" type="primary" @click="onSubmitNewAction('delete')">删除</el-button>
                  <el-button size="mini" @click="onCancel">清空描述</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>

          <el-card class="box-card top-margin">
            <div slot="header" class="clearfix">
              <span>处理记录</span>
            </div>

            <div>
              <el-timeline>
                <el-timeline-item
                  v-for="(activity, index) in historyActivities"
                  :key="index"
                  :timestamp="activity.timestamp"
                >
                  {{ activity.content }}
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light" style="margin-left: 20px;">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>工单属性</span>
              <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
            </div>
            <div>
              <el-row>
                <el-col :span="6"><span class="attr-table-title">编号:</span></el-col>
                <el-col :span="18"><span>#123</span></el-col>
              </el-row>
              <el-row class="attr-row">
                <el-col :span="6"><span class="attr-table-title">状态:</span></el-col>
                <el-col :span="18"><span>解决中</span></el-col>
              </el-row>
              <el-row class="attr-row">
                <el-col :span="6"><span class="attr-table-title">优先级:</span></el-col>
                <el-col :span="18"><span>普通</span></el-col>
              </el-row>
              <el-row class="attr-row">
                <el-col :span="6"><span class="attr-table-title">渠道:</span></el-col>
                <el-col :span="18">
                  <span>邮件/jack@gmail.com</span>
                </el-col>
              </el-row>
              <el-row class="attr-row">
                <el-col :span="6"><span class="attr-table-title">来源:</span></el-col>
                <el-col :span="18">
                  <span>邮件</span>
                </el-col>
              </el-row>
              <el-row class="attr-row">
                <el-col :span="6"><span class="attr-table-title">标签:</span></el-col>
                <el-col :span="18">
                  <span>有钱，任性</span>
                </el-col>
              </el-row>
              <el-row class="attr-row">
                <el-col :span="6"><span class="attr-table-title">受理人:</span></el-col>
                <el-col :span="18">
                  <span>客服1</span>
                </el-col>
              </el-row>
              <el-row class="attr-row">
                <el-col :span="6"><span class="attr-table-title">创建人:</span></el-col>
                <el-col :span="18">
                  <span>张三</span>
                </el-col>
              </el-row>
              <el-row class="attr-row">
                <el-col :span="6"><span class="attr-table-title">关注人:</span></el-col>
                <el-col :span="18">
                  <span>李四，王五</span>
                </el-col>
              </el-row>
              <el-row class="attr-row">
                <el-col :span="6"><span class="attr-table-title">创建时间:</span></el-col>
                <el-col :span="18">
                  <span>2020-10-01 11:23</span>
                </el-col>
              </el-row>
            </div>
          </el-card>

          <el-card class="box-card top-margin">
            <div slot="header" class="clearfix">
              <span>客户信息</span>
              <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
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
import { ticketDetailQueryApi } from '@/api/ticket'
import { RESP_CODE } from '@/utils/response-code'
export default {
  name: 'TicketDetail',
  data() {
    return {
      userSearchLoading: false,
      userOptions: [],
      // 工单处理记录
      historyActivities: [{
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
        statusEn: '', // 状态 英文
        platform: '', // 来源
        tags: '', // 标签
        priority: '', // 优先级
        creatorId: '', // 创建人
        creatorName: '', // 创建人
        assigneeId: '', // 受理人
        assigneeName: '', // 受理人姓名
        followers: [], // 关注人
        createdAt: ''// 创建时间
        //
      },
      customerAttributesEditable: false,
      // 客户属性
      customerAttributes: {
        nickName: '', // 名称
        email: '', // 邮箱
        cellphone: '', // 手机号
        companyName: '' // 公司名称
      },
      // 新增处理记录
      newActivity: {
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
    }
  },
  created() {
    this.queryTicketById()
  },
  methods: {
    // 根据id查询工单详情
    queryTicketById(ticketId) {
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
      this.ticketId = this.ticketAllInfo.ticketId
      // 工单基本属性
      this.ticketBasicInfo.subject = this.ticketAllInfo.subject
      this.ticketBasicInfo.content = this.ticketAllInfo.content
      // 工单附加属性
      this.ticketAttributes.status = this.ticketAllInfo.status // 状态
      this.ticketAttributes.statusEn = this.ticketAllInfo.statusEn // 状态 英文
      this.ticketAttributes.platform = this.ticketAllInfo.platform // 来源
      this.ticketAttributes.tags = this.ticketAllInfo.tags // 标签
      this.ticketAttributes.priority = this.ticketAllInfo.priority // 优先级
      this.ticketAttributes.creatorId = this.ticketAllInfo.creatorId // 创建人
      this.ticketAttributes.creatorName = this.ticketAllInfo.creatorName // 创建人
      this.ticketAttributes.assigneeId = this.ticketAllInfo.assigneeId // 受理人
      this.ticketAttributes.assigneeName = this.ticketAllInfo.assigneeName // 受理人姓名
      this.ticketAttributes.followers = this.ticketAllInfo.follower // 关注人
      this.ticketAttributes.createdAt = this.ticketAllInfo.createdAt// 创建时间
      // 客户属性
      this.customerAttributes.nickName = this.ticketAllInfo.nickName // 名称
      this.customerAttributes.email = this.ticketAllInfo.email // 邮箱
      this.customerAttributes.cellphone = this.ticketAllInfo.cellphone // 手机号
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

