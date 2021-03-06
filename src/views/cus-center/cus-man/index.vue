<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-main>
      <el-form :inline="true" :model="listQuery" class="demo-form-inline" size="small">
        <el-form-item label="姓名">
          <el-input v-model="listQuery.username" placeholder="按姓名查询" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="listQuery.email" placeholder="按邮箱查询" />
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="listQuery.cellphone" placeholder="按手机号查询" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="doQuery">查询</el-button>
          <el-button @click="onCancel">重置</el-button>
          <el-button type="primary" @click="handlePopNewCustomerDialog">新增客户</el-button>
        </el-form-item>
      </el-form>

      <el-table
        :data="tableData"
        size="small"
      >
        <el-table-column type="selection" width="45" />
        <el-table-column prop="username" label="客户名称" />
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
        @pagination="doQuery"
      />
    </el-main>

    <el-dialog
      title="新增客户"
      top="10vh"
      :visible.sync="newCustomerDialogVisible"
    >
      <CustomerForm :show-type-dto="customerDialogShowType" @handleHideCustomerForm="newCustomerDialogVisible=false" />
    </el-dialog>
    <el-dialog
      title="编辑客户"
      top="10vh"
      :visible.sync="editCustomerDialogVisible"
    >
      <CustomerForm :show-type-dto="customerDialogShowType" :form-dto="customerData" @handleHideCustomerForm="editCustomerDialogVisible=false" />
    </el-dialog>

  </el-container>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import CustomerForm from './components/CustomerForm'
import { customerListQueryApi } from '@/api/customer'

export default {
  components: { Pagination, CustomerForm },
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
        username: '',
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
    this.doQuery()
  },
  methods: {
    // 查询customer list data
    doQuery() {
      this.listLoading = true
      customerListQueryApi().then(resp => {
        this.tableData = resp.data
        this.total = resp.data.length
        this.listLoading = false
      })
    },
    // 弹出新增customer的dialog
    handlePopNewCustomerDialog() {
      this.customerDialogShowType = 'new'
      this.newCustomerDialogVisible = true
    },
    // 弹出编辑customer的dialog
    doEditCustomer(subject) {
      this.customerDialogShowType = 'edit'
      this.customerData = Object.assign({}, subject)
      this.editCustomerDialogVisible = true
    },
    // 取消筛选条件
    onCancel() {
      this.listQuery.username = ''
      this.listQuery.email = ''
      this.listQuery.cellphone = ''
    }
  }
}
</script>

<style scoped>

</style>

