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
  name: 'NewCompany',
  props: {
    // 类型：new--新增公司  edit--更新公司
    showType: {
      type: String,
      required: true,
      default() {
        return 'new'
      }
    },
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
      form: {
        name: '',
        description: '',
        domains: '',
        address: ''

      },
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
              this.$message(res.message)
              this.$emit('handleHideNewTkDialog')
              this.onCancel(formName)
            } else {
              this.$message.warning(res.message)
            }
          }).catch(() => {
            console.log('new-cus.vue onSubmit companyCreateApi error!')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onCancel(formName) {
      this.$refs[formName].resetFields()
    }

  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

