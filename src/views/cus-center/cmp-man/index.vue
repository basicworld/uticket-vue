<template>
  <el-container style="height: 100vh; border: 1px solid #eee">

    <el-container>

      <el-main>
        <el-form ref="searchForm" :inline="true" :model="listQuery" class="demo-form-inline" size="small">
          <el-form-item label="公司名称">
            <el-input v-model="listQuery.name" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="doQuery">查询</el-button>
            <el-button @click="onCancel">重置</el-button>
            <el-button type="primary" @click="handlePopNewCompanyDialog">新增公司</el-button>
          </el-form-item>
        </el-form>

        <el-table
          :data="tableData"
          size="small"
        >
          <el-table-column type="selection" width="45" />
          <el-table-column prop="name" label="公司名称" />
          <el-table-column prop="description" label="描述" />
          <el-table-column prop="address" label="公司地址" />
          <el-table-column prop="domains" label="公司域名" />
          <el-table-column prop="updatedAt" label="更新时间" />
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleShowEditDialog(scope.row)">编辑</el-button>
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
        title="新增公司"
        top="10vh"
        :visible.sync="newCompanyDialogVisible"
        modal-append-to-body
      >
        <NewCompany :show-type="companyDialogShowType" />

      </el-dialog>
      <el-dialog
        title="编辑公司"
        top="10vh"
        :visible.sync="editCompanyDialogVisible"
        modal-append-to-body
      >
        <NewCompany :show-type="companyDialogShowType" :form-dto="formDto" />

      </el-dialog>

    </el-container>
  </el-container>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import NewCompany from '@/views/new-cmp'
import { companyListQueryApi } from '@/api/company'

export default {
  components: { Pagination, NewCompany },
  data() {
    return {
      companyDialogShowType: 'new',
      newCompanyDialogVisible: false,
      editCompanyDialogVisible: false,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        name: ''
      },

      tableData: [],
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
      formDto: {},
      formLabelWidth: '120px'
    }
  },
  mounted() {
    this.doQuery()
  },
  methods: {
    handleShowEditDialog(compnayObj) {
      this.companyDialogShowType = 'edit'
      this.formDto = Object.assign({}, compnayObj)
      this.editCompanyDialogVisible = true
    },
    handlePopNewCompanyDialog() {
      this.companyDialogShowType = 'new'
      this.newCompanyDialogVisible = true
    },

    doQuery() {
      this.listLoading = true
      companyListQueryApi().then(resp => {
        this.tableData = resp.data
        this.total = resp.data.length
        this.listLoading = false
      })
    },

    onCancel() {
      this.listQuery.name = ''
    }
  }
}
</script>

<style scoped>

</style>

