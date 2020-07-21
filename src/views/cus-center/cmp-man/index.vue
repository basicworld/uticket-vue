<template>
  <el-container style="height: 100vh; border: 1px solid #eee">

    <el-main>
      <el-form ref="searchForm" :inline="true" :model="listQuery" class="demo-form-inline" size="small">
        <el-form-item label="公司名称">
          <el-input v-model="listQuery.name" placeholder="按公司名称查询" />
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
        <el-table-column prop="updateTime" label="更新时间" />
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
    >
      <CompanyForm :show-type="companyDialogShowType" @handleHideCompanyForm="newCompanyDialogVisible=false" />
    </el-dialog>
    <el-dialog
      title="编辑公司"
      top="10vh"
      :visible.sync="editCompanyDialogVisible"
    >
      <CompanyForm :show-type="companyDialogShowType" :form-dto="formDto" @handleHideCompanyForm="editCompanyDialogVisible=false" />
    </el-dialog>

  </el-container>
</template>

<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import CompanyForm from './components/CompanyForm'
import { companyListQueryApi } from '@/api/company'

export default {
  components: { Pagination, CompanyForm },
  data() {
    return {
      companyDialogShowType: 'new',
      newCompanyDialogVisible: false,
      editCompanyDialogVisible: false,
      total: 0,
      listLoading: true,
      // 筛选公司
      listQuery: {
        page: 1,
        limit: 10,
        name: ''
      },
      // company table data list
      tableData: [],
      // 调用companyform子组件的prop
      formDto: {}
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
    // 查询公司列表
    doQuery() {
      this.listLoading = true
      companyListQueryApi().then(resp => {
        this.tableData = resp.data
        this.total = resp.data.length
        this.listLoading = false
      })
    },
    // 重置查询条件
    onCancel() {
      this.listQuery.name = ''
    }
  }
}
</script>

<style scoped>

</style>

