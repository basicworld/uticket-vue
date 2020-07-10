<template>
  <el-container style="height: 100vh; border: 1px solid #eee">

    <el-container>

      <el-main>
        <el-form :inline="true" :model="listQuery" class="demo-form-inline" size="small">
          <el-form-item label="姓名">
            <el-input v-model="listQuery.nickName" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="listQuery.email" />
          </el-form-item>
          <el-form-item label="手机">
            <el-input v-model="listQuery.cellphone" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="doQueryTableData">查询</el-button>
            <el-button @click="onCancel">重置</el-button>
            <el-button type="primary" @click="handlePopNewCustomerDialog">新增客户</el-button>
          </el-form-item>
        </el-form>

        <el-table
          :data="tableData"
          size="small"
        >
          <el-table-column type="selection" width="45" />
          <el-table-column prop="nickName" label="客户名称" />
          <el-table-column prop="level" label="等级" />
          <el-table-column prop="companyName" label="公司" show-overflow-tooltip />
          <el-table-column prop="email" label="邮箱" show-overflow-tooltip />
          <el-table-column prop="cellphone" label="电话" />
          <el-table-column prop="sourceChannel" label="客户来源" />
          <el-table-column prop="lastContactAt" label="最后联系时间" width="140" />
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="doEditCustomer(scope.row)">编辑</el-button>
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
        title="新增客户"
        top="10vh"
        :visible.sync="newCustomerDialogVisible"
        modal-append-to-body
      >
        <NewCustomer :show-type-dto="customerDialogShowType" @handleHideNewCustomerDialog="handleHideNewCustomerDialog" />
      </el-dialog>
      <el-dialog
        title="编辑客户"
        top="10vh"
        :visible.sync="editCustomerDialogVisible"
        modal-append-to-body
      >
        <NewCustomer :show-type-dto="customerDialogShowType" :form-dto="customerData" @handleHideNewCustomerDialog="handleHideEditCustomerDialog" />
      </el-dialog>

    </el-container>
  </el-container>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import NewCustomer from '@/views/new-cus'
import { customerListQueryApi } from '@/api/customer'

export default {
  components: { Pagination, NewCustomer },
  data() {
    return {
      // 新增客户的dialog可见性
      newCustomerDialogVisible: false,
      // 编辑客户的dialog可见性
      editCustomerDialogVisible: false,
      // shouType： new 或 edit
      customerDialogShowType: 'new',
      // table data list size
      total: 0,
      // loading
      listLoading: true,
      // 查询条件
      listQuery: {
        page: 1,
        limit: 10,
        nickName: '',
        email: '',
        cellphone: ''
      },
      // table data
      tableData: [],
      // 一个customer
      customerData: {}
    }
  },

  mounted() {
    // 查询customer初始化
    this.doQueryTableData()
  },
  methods: {
    // 查询customer
    doQueryTableData() {
      this.listLoading = true
      customerListQueryApi().then(resp => {
        this.tableData = resp.data
        this.total = resp.data.length
        this.listLoading = false
      })
    },
    // 弹出新增ticket的dialog
    handlePopNewCustomerDialog() {
      this.customerDialogShowType = 'new'
      this.newCustomerDialogVisible = true
    },
    handleHideNewCustomerDialog() {
      this.newCustomerDialogVisible = false
    },
    handleHideEditCustomerDialog() {
      this.editCustomerDialogVisible = false
    },

    doEditCustomer(subject) {
      this.customerDialogShowType = 'edit'
      this.customerData = Object.assign({}, subject)
      this.editCustomerDialogVisible = true
    },

    onCancel() {
      this.listQuery.nickName = ''
      this.listQuery.email = ''
      this.listQuery.cellphone = ''
    }
  }
}
</script>

<style scoped>

</style>

