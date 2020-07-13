<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" size="small">
      <el-form-item label="公司名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="公司描述" prop="description">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
      <el-form-item label="公司地址" prop="address">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="公司域名" prop="domains">
        <el-input v-model="form.domains" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">保存</el-button>
        <el-button @click="onCancel('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { companyCreateApi, companyUpdateApi } from '@/api/company'

export default {
  name: 'CompanyForm',
  props: {
    // 类型：new--新增公司  edit--更新公司
    showType: {
      type: String,
      required: true,
      default() {
        return 'new'
      }
    },
    // 父组建传入的表单数据
    formDto: {
      type: Object,
      required: false,
      default() {
        return {
          name: '',
          description: '',
          domains: '',
          address: ''
        }
      }
    }
  },
  data() {
    return {
      // 表单数据
      form: {
        name: '',
        description: '',
        domains: '',
        address: ''

      },
      // 表单校验规则
      rules: {
        name: [
          { required: true, message: '公司名称为必填项', trigger: 'blur' },
          { min: 2, max: 50, message: '公司名称长度限制为 2 到 50 个字符', trigger: 'blur' }
        ],
        description: [
          { max: 100, message: '长度不超过 100 个字符', trigger: 'blur' }

        ],
        domains: [
          { max: 100, message: '长度不超过 100 个字符', trigger: 'blur' }

        ],
        address: [
          { max: 100, message: '长度不超过 100 个字符', trigger: 'blur' }

        ]
      }
    }
  },
  watch: {
    // 父组建传入的表单数据
    formDto: {
      deep: true,
      handler(val) {
        this.form = Object.assign({}, val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.onCancel('form')
      this.form = Object.assign({}, this.formDto)
    })
  },
  methods: {
    // 保存
    onSubmit(formName) {
      // 根据showType选择不同的提交方法
      var choosedApi = () => {}
      if (this.showType === 'edit') { // edit
        choosedApi = companyUpdateApi
      } else { // new
        choosedApi = companyCreateApi
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          choosedApi(this.form).then(res => {
            if (res.code === 20000) {
              this.$message.success(res.message)
              this.onCancel(formName)
              this.$emit('handleHideCompanyForm')
            } else {
              this.$message.warning(res.message)
            }
          }).catch(() => {
            this.$message.error('公司信息保存失败')
          })
        } else {
          console.log('公司表单校验失败，不能保存')
          return false
        }
      })
    },
    // 重置表单
    onCancel(formName) {
      // 如果是edit，则重置为编辑前的状态
      if (this.showType === 'edit') {
        this.form = Object.assign({}, this.formDto)
      } else { // 如果是new，则重置为全空白
        this.$refs[formName].resetFields()
      }
    }

  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

