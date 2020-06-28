<template>
  <el-container style=" border: 1px solid #eee">

    <el-container>

      <el-main>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
          <el-form-item label="编号">
            <el-input v-model="formInline.user" placeholder="编号" />
          </el-form-item>
          <el-form-item label="紧急程度">
            <el-select v-model="formInline.region" placeholder="紧急程度">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="onSubmit">重置</el-button>
            <el-button type="primary" @click="handlePopNewTkDialog">新增工单</el-button>
          </el-form-item>
        </el-form>

        <el-table
          :data="tableData"
          size="small"
          @row-click="doShowDetail"
        >
          <el-table-column type="selection" width="45" />
          <el-table-column prop="date" label="主题" width="200" />
          <el-table-column prop="" label="状态" width="80" />
          <el-table-column prop="" label="优先级" width="80" />
          <el-table-column prop="date" label="受理客服" width="140" />
          <el-table-column prop="date" label="客户" width="120" />
          <el-table-column prop="date" label="创建时间" width="140" />
          <el-table-column prop="date" label="描述" width="200" />
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
        title="新增工单"
        width="70%"
        top="10vh"
        :visible.sync="newTkDialogVisible"
        modal-append-to-body="true"
      >
        <NewTicket />
      </el-dialog>

      </el-dialog></el-container>
  </el-container>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import TicketDetail from '@/views/tk-detail'
import NewTicket from '@/views/new-tk'
export default {
  components: { Pagination, TicketDetail, NewTicket },
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      newTkDialogVisible: false,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      formInline: {
        user: '',
        region: ''
      },
      tableData: Array(10).fill(item),
      dialogFormVisible: false,
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
    handlePopNewTkDialog() {
      this.newTkDialogVisible = true
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

