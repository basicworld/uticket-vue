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
            <el-button type="primary" @click="handlePopNewTkDialog">新增公司</el-button>
          </el-form-item>
        </el-form>

        <el-table
          :data="tableData"
          size="small"
        >
          <el-table-column type="selection" width="45" />
          <el-table-column prop="date" label="公司名称" width="200" />
          <el-table-column prop="" label="描述" width="200" />
          <el-table-column prop="" label="公司地址" width="200" />
          <el-table-column prop="date" label="公司域名" width="140" />
          <el-table-column prop="date" label="创建时间" width="140" />
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
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
        fullscreen
        modal-append-to-body
      >
        <TicketDetail />
      </el-dialog>
      <el-dialog
        title="新增公司"
        top="10vh"
        :visible.sync="newCompanyDialogVisible"
        modal-append-to-body
      >
        <NewCompany />

      </el-dialog>
      <el-dialog
        title="编辑公司"
        top="10vh"
        :visible.sync="editCompanyDialogVisible"
        modal-append-to-body
      >
        <NewCompany />

      </el-dialog>

    </el-container>
  </el-container>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import TicketDetail from '@/views/tk-detail'
import NewCompany from '@/views/new-cmp'
import { companyListQueryApi } from '@/api/company'

export default {
  components: { Pagination, TicketDetail, NewCompany },
  data() {
    return {
      newCompanyDialogVisible: false,
      editCompanyDialogVisible: false,
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
  methods: {
    handlePopNewTkDialog() {
      this.newCompanyDialogVisible = true
    },
    doShowDetail() {
      this.$message('doShowDetail!')
      this.dialogFormVisible = true
    },
    getData() {
      this.listLoading = true
      companyListQueryApi().then(resp => {
        this.tableData = resp.data
        this.total = resp.data.length
        this.listLoading = false
      })
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

