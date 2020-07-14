<template>
  <el-container style="height: 100vh; border: 1px solid #eee">

    <el-main>
      <el-form :inline="true" :model="listQuery" class="demo-form-inline" size="small">
        <el-form-item label="用户组名称">
          <el-input v-model="listQuery.groupName" placeholder="搜索用户组名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doQuery">查询</el-button>
          <el-button @click="onCancel">重置</el-button>
          <el-button type="primary" @click="handleNewGroup">新增用户组</el-button>
        </el-form-item>
      </el-form>

      <el-table
        :data="tableData"
        size="small"
      >
        <el-table-column type="selection" width="45" />
        <el-table-column prop="groupName" label="名称" width="200" />
        <el-table-column prop="description" label="描述" width="200" />
        <el-table-column prop="userCount" label="用户数" width="200" />
        <el-table-column prop="createdAt" label="创建时间" width="140" />
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEditGroup(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleEditGroupMember(scope.row)">成员管理</el-button>
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

    <el-dialog
      title="新增用户组"
      top="10vh"
      :visible.sync="newGroupDialogVisible"
    >
      <GroupForm :show-type="groupDialogShowType" @handleHideGroupForm="newGroupDialogVisible=false" />
    </el-dialog>
    <el-dialog
      title="编辑用户组"
      top="10vh"
      :visible.sync="editGroupDialogVisible"
    >
      <GroupForm :show-type="groupDialogShowType" :form-dto="formDto" @handleHideGroupForm="editGroupDialogVisible=false" />
    </el-dialog>
    <el-dialog
      title="成员管理"
      top="10vh"
      :visible.sync="editGroupMemberDialogVisible"
    >
      <GroupMemberManage :group-id="formDto.id" @handleHideGroupMemberForm="editGroupMemberDialogVisible=false" />
    </el-dialog>

  </el-container>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import GroupForm from './components/GroupForm'
import GroupMemberManage from './components/GroupMemberManage'
import { groupListQueryApi, groupDeleteApi } from '@/api/group'
import { RESP_CODE } from '@/utils/response-code'
export default {
  components: { Pagination, GroupForm, GroupMemberManage },
  data() {
    return {
      groupDialogShowType: 'new', // new 或者 edit
      newGroupDialogVisible: false,
      editGroupDialogVisible: false,
      editGroupMemberDialogVisible: false,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        groupName: ''
      },
      tableData: [],
      dialogFormVisible: false,
      formDto: {}
    }
  },
  mounted() {
    this.doQuery()
  },
  methods: {
    handleNewGroup() {
      this.groupDialogShowType = 'new'
      this.newGroupDialogVisible = true
    },
    handleEditGroup(groupObj) {
      this.formDto = Object.assign({}, groupObj)
      this.groupDialogShowType = 'edit'
      this.editGroupDialogVisible = true
    },
    handleEditGroupMember(groupObj) {
      this.formDto = Object.assign({}, groupObj)
      this.editGroupMemberDialogVisible = true
    },
    doShowDetail() {
      this.$message('doShowDetail!')
      this.dialogFormVisible = true
    },
    doQuery() {
      groupListQueryApi().then(res => {
        if (res.code === RESP_CODE.OK) {
          this.tableData = res.data
        }
      }).catch(() => {
        this.$message.error('查询异常，稍后再试')
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    doRemove(groupObj) {
      this.$confirm(`确定移除 ${groupObj.groupName}?`).then(() => {
        groupDeleteApi({ id: groupObj.id }).then(res => {
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

