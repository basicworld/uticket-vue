<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="100px" size="small">
      <el-form-item label="账号/邮箱" prop="email">
        <el-input v-model="form.email" placeholder="邮箱不允许更改" disabled />
      </el-form-item>
      <el-form-item label="姓名" prop="username">
        <el-input v-model="form.username" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="cellphone">
        <el-input v-model="form.cellphone" placeholder="11位手机号" />
      </el-form-item>
      <el-form-item label="备注" prop="description">
        <el-input v-model="form.description" placeholder="备注" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validCellphone } from '@/utils/validate'

export default {

  data() {
    // 表单校验：手机号校验
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
    return {
      form: {
        username: '',
        email: '',
        cellphone: '',
        description: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名为必填项', trigger: 'blur' },
          { min: 2, max: 20, message: '用户名长度限度为 2 到 20 字', trigger: 'blur' }
        ],
        companyName: [
          { min: 2, max: 20, message: '长度限度为 2 到 20 字', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱为必填项', trigger: 'blur' },
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ],
        cellphone: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        description: [
          { max: 100, message: '最大长度限度为 100 字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log('onSubmit')
        } else {
          console.log('表单校验失败')
        }
      })
    },
    onCancel() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

