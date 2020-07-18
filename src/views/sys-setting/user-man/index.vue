<template>
  <el-container style="height: 100vh; border: 1px solid #eee">

    <el-main>
      <el-form :inline="true" :model="listQuery" class="demo-form-inline" size="small">
        <el-form-item label="姓名">
          <el-input v-model="listQuery.user" placeholder="搜索姓名" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doQuery">查询</el-button>
          <el-button @click="onCancel">重置</el-button>
          <el-button type="primary" @click="handleNewUser">新增客户</el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="listLoading" :data="tableData" size="small">
        <el-table-column type="selection" width="45" />
        <el-table-column prop="username" label="姓名" />
        <el-table-column prop="cellphone" label="电话" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="groupName" label="用户组" />
        <el-table-column prop="roleNames" label="角色" />
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEditUser(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="doRemove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total >= 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="doQuery"
      />
    </el-main>

    <!-- 新增用户对话框 -->
    <el-dialog
      title="新增用户"
      top="10vh"
      :visible.sync="newUserDialogVisible"
    >
      <UserForm :show-type="userDialogShowType" @handleHideUserForm="newUserDialogVisible=false" />
    </el-dialog>
    <!-- 编辑用户对话框 -->
    <el-dialog
      title="编辑用户"
      top="10vh"
      :visible.sync="editUserDialogVisible"
    >
      <UserForm :show-type="userDialogShowType" :form-dto="formDto" @handleHideUserForm="editUserDialogVisible=false" />
    </el-dialog>

  </el-container>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { userListQueryApi, userDeleteApi } from '@/api/user'
import { RESP_CODE } from '@/utils/response-code'
import UserForm from './components/UserForm'

export default {
  components: { Pagination, UserForm },
  data() {
    return {
      // 用户form 类型 new--新增  edit--编辑
      userDialogShowType: 'new',
      // 新增用户对话框可见性
      newUserDialogVisible: false,
      // 编辑用户对话框可见性
      editUserDialogVisible: false,
      listLoading: true, // 列表查询动画
      total: 0, // 总用户数，用于分页展示
      // 查询条件
      listQuery: {
        page: 1,
        limit: 10,
        username: '' // 用户名
      },
      // 列表数据
      tableData: [],
      // 对话框传输对象
      formDto: {}

    }
  },
  mounted() {
    this.doQuery()
  },
  methods: {
    // 显示新增用户对话框
    handleNewUser() {
      this.userDialogShowType = 'new'
      this.newUserDialogVisible = true
    },
    // 显示编辑用户对话框
    handleEditUser(userObj) {
      this.formDto = Object.assign({}, userObj)
      this.userDialogShowType = 'edit'
      this.editUserDialogVisible = true
    },
    // 查询用户列表
    doQuery() {
      userListQueryApi(this.listQuery).then(res => {
        this.listLoading = true
        if (res.code === RESP_CODE.OK) {
          this.tableData = res.data
          this.total = res.total
        } else {
          this.$message.warning('查询异常：' + res.code)
        }
        this.listLoading = false
      }).catch(() => {
        this.$message.error('查询失败，稍后再试')
        this.listLoading = false
      })
    },
    // 清空查询条件
    onCancel() {
      this.listQuery.username = ''
    },
    // 删除用户
    doRemove(userObj) {
      this.$confirm(`确定移除 ${userObj.username}?`).then(() => {
        userDeleteApi({ id: userObj.id }).then(res => {
          if (res.code === RESP_CODE.OK) {
            this.$message.success('删除成功')
          } else {
            this.$message.warning('删除异常：' + res.code)
          }
        }).catch(() => {
          this.$message.error('删除异常，稍后再试')
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>

</style>

