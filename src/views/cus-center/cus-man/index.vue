<template>
  <el-container style="height: 100vh; border: 1px solid #eee">

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
            <el-button type="primary" @click="handlePopNewTkDialog">新增客户</el-button>
          </el-form-item>
        </el-form>

        <el-table
          :data="tableData"
          size="small"
        >
          <el-table-column type="selection" width="45" />
          <el-table-column prop="nickName" label="客户名称" width="100" />
          <el-table-column prop="level" label="等级" width="80" />
          <el-table-column prop="companyName" label="公司" width="140" show-overflow-tooltip />
          <el-table-column prop="email" label="邮箱" width="160" show-overflow-tooltip />
          <el-table-column prop="cellphone" label="电话" width="120" />
          <el-table-column prop="sourceChannel" label="客户来源" width="100" />
          <el-table-column prop="lastContactAt" label="最后联系时间" width="140" />
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="doShowDetail">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
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
      <el-dialog
        title="新增客户"
        top="10vh"
        :visible.sync="newCusDialogVisible"
        modal-append-to-body
      >
        <NewCustomer @handleHideNewTkDialog="handleHideNewTkDialog" />
      </el-dialog>

      </el-dialog></el-container>
  </el-container>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import TicketDetail from '@/views/tk-detail'
import NewCustomer from '@/views/new-cus'
import { customerListQueryApi } from '@/api/customer'

export default {
  components: { Pagination, TicketDetail, NewCustomer },
  data() {
    return {
      newCusDialogVisible: false,
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
  mounted() {
    this.doQueryTableData()
  },
  methods: {
    doQueryTableData() {
      this.listLoading = true
      customerListQueryApi().then(resp => {
        this.tableData = resp.data
        this.total = resp.data.length
        this.listLoading = false
      })
    },
    handlePopNewTkDialog() {
      this.newCusDialogVisible = true
    },
    handleHideNewTkDialog() {
      this.newCusDialogVisible = false
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

