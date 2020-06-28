<template>
  <div>
    <el-row>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <el-button-group>
              <el-button size="small" icon="el-icon-edit" @click="innerVisible = true">分配</el-button>
              <el-button size="small" icon="el-icon-share">解决</el-button>
              <el-button size="small" icon="el-icon-delete">关闭</el-button>
              <el-button size="small" icon="el-icon-delete">删除</el-button>
              <el-button size="small" icon="el-icon-delete">拉黑</el-button>
            </el-button-group>
          </el-card>

          <el-card class="box-card top-margin">
            <div slot="header" class="clearfix">
              <span>主题：张三的重置密码请求</span>
              <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ '列表内容 ' + o }}
            </div>
          </el-card>

          <el-card class="box-card top-margin">
            <div slot="header" class="clearfix">
              <span>添加记录</span>
            </div>
            <div>
              <el-form ref="form" :model="form" label-width="120px" size="mini">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                  <el-tab-pane label="邮件" name="first">
                    <el-input v-model="form.desc" type="textarea" />
                  </el-tab-pane>
                  <el-tab-pane label="短信" name="second">
                    <el-input v-model="form.desc" type="textarea" />
                  </el-tab-pane>
                  <el-tab-pane label="内部备注" name="third">
                    <el-input v-model="form.desc" type="textarea" />
                  </el-tab-pane>
                </el-tabs>

                <div class="top-margin">
                  <el-button size="mini" type="primary" @click="onSubmit">保存</el-button>
                  <el-button size="mini" @click="onCancel">重置</el-button>

                </div>
              </el-form>
            </div>
          </el-card>

          <el-card class="box-card top-margin">
            <div slot="header" class="clearfix">
              <span>历史记录</span>
            </div>

            <div>
              <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="所有" name="first">所有</el-tab-pane>
                <el-tab-pane label="回复" name="second">回复</el-tab-pane>
                <el-tab-pane label="变更" name="third">变更</el-tab-pane>
              </el-tabs>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light" style="margin-left: 20px;">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>属性</span>
              <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ '列表内容 ' + o }}
            </div>
          </el-card>

          <el-card class="box-card top-margin">
            <div slot="header" class="clearfix">
              <span>客户信息</span>
              <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ '列表内容 ' + o }}
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
export default {
  name: 'TicketDetail',
  data() {
    return {
      innerVisible: false,
      activeName: 'first',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    onSubmit() {
      this.$message('submit!')
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
.top-margin{
  margin-top: 10px;
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

