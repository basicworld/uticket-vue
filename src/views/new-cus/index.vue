<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="60px" size="small">
      <el-form-item label="姓名" prop="nickName">
        <el-input v-model="form.nickName" />
      </el-form-item>
      <el-form-item label="手机" prop="cellphone">
        <el-input v-model="form.cellphone" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="公司" prop="companyName">
        <el-input v-model="form.companyName" />
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-input v-model="form.tags" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">保存</el-button>
        <el-button @click="onCancel('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { customerCreateApi } from '@/api/customer'
import { validCellphone } from '@/utils/validate'

export default {
  name: 'NewCustomer',
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        callback()
      } else {
        if (validCellphone(value)) {
          callback()
        } else {
          callback(new Error('手机号格式错误'))
        }
      }
    }
    var requirePhoneOrEmail = (rule, value, callback) => {
      if ((!this.form.cellphone) && (!this.form.email)) {
        callback(new Error('手机和邮箱至少填写一个'))
      } else {
        callback()
      }
    }
    return {
      form: {
        nickName: '',
        cellphone: '', // 手机号
        email: '', // 邮箱
        companyName: '',
        description: '',
        tags: ''
      },
      rules: {
        nickName: [
          { required: true, message: '姓名为必填项', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        companyName: [
          { max: 100, message: '长度不超过 100 个字符', trigger: 'blur' }
        ],
        tags: [
          { max: 100, message: '长度不超过 100 个字符', trigger: 'blur' }
        ],
        description: [
          { max: 100, message: '长度不超过 100 个字符', trigger: 'blur' }
        ],
        email: [
          { validator: requirePhoneOrEmail, trigger: 'blur' },
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ],
        cellphone: [
          { validator: requirePhoneOrEmail, trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.onCancel('form')
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          customerCreateApi(this.form).then(res => {
            if (res.code === 20000) {
              this.$message(res.message)
              this.$emit('handleHideNewTkDialog')
              this.onCancel(formName)
            } else {
              this.$message.warning(res.message)
            }
          }).catch(() => {
            console.log('new-cus.vue onSubmit customerCreateApi error!')
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

