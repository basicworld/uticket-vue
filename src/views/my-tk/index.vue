<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-main>
      <el-form :inline="true" :model="listQuery" class="demo-form-inline" size="small">
        <el-form-item label="编号">
          <el-input v-model="listQuery.id" placeholder="编号" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doQuery">查询</el-button>
          <el-button @click="onCancel">重置</el-button>
          <el-button type="primary" @click="handlePopNewTkDialog">新增工单</el-button>
        </el-form-item>
      </el-form>

      <el-table
        :data="tableData"
        size="small"
      >
        <el-table-column type="selection" width="45" />
        <el-table-column prop="date" label="主题" width="200" />
        <el-table-column prop="" label="状态" width="80" />
        <el-table-column prop="" label="优先级" width="80" />
        <el-table-column prop="date" label="受理客服" width="140" />
        <el-table-column prop="date" label="客户" width="120" />
        <el-table-column prop="date" label="创建时间" width="140" />
        <el-table-column prop="date" label="描述" width="200" />
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="doEditDetail(scope.row)">编辑</el-button>
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
      title="工单详情"
      :visible.sync="dialogFormVisible"
      fullscreen
    >
      <TicketDetail />
    </el-dialog>
    <el-dialog
      title="新增工单"
      top="10vh"
      :visible.sync="newTkDialogVisible"
    >
      <TicketForm />
    </el-dialog>

  </el-container>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import TicketDetail from '@/views/tk-detail'
import TicketForm from './components/TicketForm'
export default {
  components: { Pagination, TicketForm, TicketDetail },
  data() {
    return {
      newTkDialogVisible: false,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        id: ''
      },
      tableData: [],
      dialogFormVisible: false
    }
  },
  mounted() {
    this.doQuery()
  },
  methods: {
    // 查询个人工单列表
    doQuery() {

    },
    handlePopNewTkDialog() {
      this.newTkDialogVisible = true
    },
    doEditDetail(ticketObj) {
      this.$message('doEditDetail!')
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

