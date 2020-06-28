<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="height: 100vh; background-color: rgb(238, 241, 246);">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @select="handleMenuSelect"
      >
        <el-menu-item index="1">
          <span slot="title">个人资料</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span slot="title">重置密码</span>
        </el-menu-item>
        <el-menu-item index="3">
          <span slot="title">消息设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>

      <el-main>
        <div v-show="activeMenuIndex==='1'">
          <PersonalInformation />
        </div>
        <div v-show="activeMenuIndex==='2'">
          <ChangePassword />
        </div>
        <div v-show="activeMenuIndex==='3'">
          <MessageSetting />
        </div>

      </el-main>

    </el-container>
  </el-container>
</template>

<script>
import ChangePassword from './components/ChangePassword'
import PersonalInformation from './components/PersonalInformation'
import MessageSetting from './components/MessageSetting'
export default {
  components: { ChangePassword, PersonalInformation, MessageSetting },
  data() {
    return {
      activeMenuIndex: '1',

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
    handleMenuSelect(index) {
      this.activeMenuIndex = index
    },
    doShowDetail() {
      this.$message('doShowDetail!')
      this.dialogFormVisible = true
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

</style>

