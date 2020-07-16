<template>
  <el-container style="height: 100vh; border: 1px solid #eee">

    <el-container>

      <el-main>
        <el-form :inline="true" :model="listQuery" class="demo-form-inline" size="small">
          <el-form-item label="姓名">
            <el-input v-model="listQuery.user" placeholder="搜索姓名或昵称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doQuery">查询</el-button>
            <el-button @click="onCancel">重置</el-button>
            <el-button type="primary" @click="handleNewUser">新增客户</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="tableData" size="small">
          <el-table-column type="selection" width="45" />
          <el-table-column prop="nickName" label="姓名" />
          <el-table-column prop="aliase" label="昵称" />
          <el-table-column prop="cellphone" label="电话" />
          <el-table-column prop="email" label="邮箱" />
          <el-table-column prop="groupNames" label="员工组" />
          <el-table-column prop="roleNames" label="角色" />
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEditUser(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="editRoleOfUser(scope.row)">角色配置</el-button>
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
      userDialogShowType: 'new',
      newUserDialogVisible: false,
      editUserDialogVisible: false,
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        nickName: ''
      },
      tableData: [],
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
    doQuery() {
      console.log('doQuery')
      userListQueryApi(this.listQuery).then(res => {
        if (res.code === RESP_CODE.OK) {
          this.tableData = res.data
          this.total = res.total
        } else {
          this.$message.warning('查询异常：' + res.code)
        }
      }).catch(() => {
        this.$message.error('查询失败，稍后再试')
      })
    },
    editRoleOfUser(userObj) {
      console.log('editRoleOfUser')
    },
    handlePopNewTkDialog() {
      this.newCusDialogVisible = true
    },

    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    // 删除用户
    doRemove(userObj) {
      this.$confirm(`确定移除 ${userObj.nickName}?`).then(() => {
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

