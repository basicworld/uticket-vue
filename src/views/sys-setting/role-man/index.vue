<template>
  <el-container style="height: 100vh; border: 1px solid #eee">

    <el-main>
      <el-form :inline="true" :model="listQuery" size="small">
        <el-form-item label="名称">
          <el-input v-model="listQuery.roleName" placeholder="搜索角色名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doQuery">查询</el-button>
          <el-button @click="onCancel">重置</el-button>
          <el-button type="primary" @click="handlePopNewRoleDialog">新增角色</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" size="small">
        <el-table-column type="selection" width="45" />
        <el-table-column prop="roleName" label="名称" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="createdAt" label="创建时间" />
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEditRole(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDeleteRole(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total >= 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getData"
      />
    </el-main>

    <el-dialog
      title="工单详情"
      :visible.sync="dialogFormVisible"
      fullscreen="true"
      modal-append-to-body="true"
    >
      <TicketDetail />
    </el-dialog>
    <el-dialog
      title="新增角色"
      top="10vh"
      :visible.sync="roleEditDialogVisible"
      modal-append-to-body="true"
      width="70%"
    >
      <RoleEdit />
    </el-dialog>

  </el-container>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import TicketDetail from '@/views/tk-detail'
import RoleEdit from './components/RoleEdit'
import { roleListQueryApi, roleDeleteApi } from '@/api/role'
import { RESP_CODE } from '@/utils/response-code'

export default {
  components: { Pagination, TicketDetail, RoleEdit },
  data() {
    return {
      roleEditDialogVisible: false,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        roleName: ''
      },
      tableData: [],
      dialogFormVisible: false
    }
  },
  mounted() {
    this.doQuery()
  },
  methods: {
    // 编辑角色
    handleEditRole(roleObj) {

    },
    // 删除角色
    handleDeleteRole(roleObj) {
      this.$confirm(`确定移除 ${roleObj.roleName}?`).then(() => {
        roleDeleteApi({ id: roleObj.id }).then(res => {
          if (res.code === RESP_CODE.OK) {
            this.$message.success('删除成功')
          } else {
            this.$message.warning('删除异常：' + res.code)
          }
        }).catch(() => {
          this.$message.error('删除异常，稍后再试')
        })
      }).catch(() => {})
    },
    // 查询角色列表
    doQuery() {
      console.log('获取角色列表')
      roleListQueryApi(this.listQuery).then(res => {
        if (res.code === RESP_CODE.OK) {
          this.tableData = res.data
          this.total = res.total
        } else {
          this.$message.warning('请求异常：' + res.code)
        }
      }).catch(() => {
        this.$message.error('请求异常，稍后再试')
      })
    },
    handlePopNewRoleDialog() {
      this.roleEditDialogVisible = true
    },
    onCancel() {
      this.listQuery.roleName = ''
    }
  }
}
</script>

<style scoped>

</style>

