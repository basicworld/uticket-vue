<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="180px" style="height: 100vh; background-color: rgb(238, 241, 246)">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1">
          <span slot="title">未分配</span>
        </el-menu-item>
        <el-menu-item index="2">
          <span slot="title">解决中</span>
        </el-menu-item>
        <el-menu-item index="3">
          <span slot="title">已解决</span>
        </el-menu-item>
        <el-menu-item index="4">
          <span slot="title">已关闭</span>
        </el-menu-item>
        <el-menu-item index="5">
          <span slot="title">所有工单</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

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
          </el-form-item>
        </el-form>

        <el-table
          :data="tableData"
          size="small"
        >
          <el-table-column type="selection" width="45" />
          <el-table-column prop="subject" label="标题" width="200" show-overflow-tooltip />
          <el-table-column prop="status" label="状态" width="60" />
          <el-table-column prop="priority" label="优先级" width="60" />
          <el-table-column prop="assigneeName" label="受理客服" width="100" />
          <el-table-column prop="userName" label="客户" width="100" />
          <el-table-column prop="createdAt" label="创建时间" width="140" />
          <el-table-column prop="content" label="内容" width="300" show-overflow-tooltip />
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="doShowDetail">详情</el-button>
              <el-button type="text" size="small">删除</el-button>
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
        title="工单详情"
        :visible.sync="dialogFormVisible"
        fullscreen
        modal-append-to-body
      >
        <TicketDetail />
      </el-dialog>

    </el-container>
  </el-container>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import TicketDetail from '@/views/tk-detail'
import { ticketListQueryApi } from '@/api/ticket'

export default {
  components: { Pagination, TicketDetail },
  data() {
    return {
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      formInline: {
        user: '',
        region: ''
      },
      tableData: [],
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
  created() {
    this.doQueryTableData()
  },
  methods: {
    doQueryTableData() {
      this.listLoading = true
      ticketListQueryApi().then(resp => {
        this.tableData = resp.data
        this.total = resp.data.length
        this.listLoading = false
      })
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
    },
    handleOpen() {},
    handleClose() {}
  }
}
</script>

<style scoped>

</style>

