<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-main>
      <el-form :inline="true" :model="listQuery" class="demo-form-inline" size="small">
        <el-form-item label="编号">
          <el-input v-model="listQuery.id" placeholder="编号" />
        </el-form-item>
        <el-form-item label="优先级" prop="priority">
          <el-select v-model="listQuery.priority">
            <el-option key="low" value="low" label="低" />
            <el-option key="medium" value="medium" label="标准" />
            <el-option key="high" value="high" label="高" />
            <el-option key="urgency" value="urgency" label="紧急" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doQueryTableData">查询</el-button>
          <el-button @click="onCancel">重置</el-button>
          <el-button type="primary" @click="handlePopNewTkDialog">新增工单</el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="listLoading" :data="tableData" size="small">
        <el-table-column type="selection" width="45" />
        <el-table-column prop="id" label="编号" />
        <el-table-column prop="subject" label="标题" width="200" show-overflow-tooltip />
        <el-table-column prop="statusCn" label="状态" />
        <el-table-column prop="priorityCn" label="优先级" />
        <el-table-column prop="assigneeName" label="受理客服" />
        <el-table-column prop="createdAt" label="创建时间" />
        <el-table-column prop="content" label="内容" min-width="300" show-overflow-tooltip />
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="doShowDetail(scope.row)">详情</el-button>
            <el-button type="text" size="small" @click="deleteTicket(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total >= 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="doQueryTableData"
      />
    </el-main>

    <el-dialog
      title="新增工单"
      top="10vh"
      :visible.sync="newTicketDialogVisible"
    >
      <NewTicket />
    </el-dialog>
    <el-dialog
      title="工单详情"
      :visible.sync="editTicketDialogVisible"
      fullscreen
    >
      <TicketDetail :ticket-id-prop="ticketId" view-type="customer" />
    </el-dialog>

  </el-container>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import TicketDetail from '@/views/tk-detail'
import { ticketListQueryApi, ticketDeleteApi } from '@/api/ticket'
import { RESP_CODE } from '@/utils/response-code'
import NewTicket from './components/NewTicket'
export default {
  components: { Pagination, TicketDetail, NewTicket },
  data() {
    return {
      // 总工单个数
      total: 0,
      listLoading: false, // 加载动画
      // 查询条件
      listQuery: {
        page: 1,
        limit: 10,
        status: '', // 工单状态
        id: '',
        priority: '',
        scope: 'customer' // 查询范围 customer--个人工单 staff-全部工单
      },
      // 表格数据
      tableData: [],
      // 工单对话框可见性
      editTicketDialogVisible: false,
      newTicketDialogVisible: false,
      ticketId: -1
    }
  },
  mounted() {
    this.doQueryTableData()
  },
  methods: {
    handlePopNewTkDialog() {
      this.newTicketDialogVisible = true
    },
    // 清空查询条件和结果
    clearResult() {
      this.total = 0
      this.listQuery.status = ''
      this.listQuery.id = ''
      this.listQuery.priority = ''
      // this.tableData = []
      this.listLoading = false
      this.editTicketDialogVisible = false
    },

    // 查询工单列表
    doQueryTableData() {
      this.listLoading = true
      ticketListQueryApi().then(resp => {
        if (resp.code === RESP_CODE.OK) {
          this.tableData = resp.data
          this.total = resp.total
        } else {
          this.tableData = []
          this.$message.warning('查询异常：' + resp.code)
        }
        this.listLoading = false
      }).catch(() => {
        this.$message.error('服务器错误，稍后再试')
      })
    },
    // 显示工单详情
    doShowDetail(ticketObj) {
      this.ticketId = ticketObj.id
      this.editTicketDialogVisible = true
    },
    // 重置查询条件
    onCancel() {
      this.listQuery.priority = ''
      this.listQuery.id = ''
    },
    deleteTicket(ticketObj) {
      this.$confirm(`确定删除编号 #${ticketObj.id} 工单?`).then(() => {
        ticketDeleteApi({ id: ticketObj.id }).then(res => {
          if (res.code === RESP_CODE.OK) {
            this.$message.success('删除成功')
          } else {
            this.$message.warning('删除异常：' + res.code)
          }
        }).catch(() => {})
      }).catch(() => {})
    }
  }
}
</script>

