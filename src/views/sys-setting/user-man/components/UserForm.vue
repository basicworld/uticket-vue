<template>
  <el-form ref="form" :rules="rules" :model="form" label-width="60px" size="small">
    <el-form-item label="名称" prop="nickName">
      <el-input v-model="form.nickName" placeholder="用户名称，2到20字" />
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model="form.description" placeholder="用户描述，不超过100字" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">保存</el-button>
      <el-button @click="onCancel('form')">清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { userCreateApi, userUpdateApi } from '@/api/user'

export default {
  name: 'UserForm',
  props: {
    // 类型：new--新增用户  edit--更新用户
    showType: {
      type: String,
      required: true,
      default() {
        return 'new'
      }
    },
    // 表单数据，用于编辑group
    formDto: {
      type: Object,
      required: false,
      default() {
        return {
          id: '',
          nickName: '',
          description: ''
        }
      }
    }
  },

  data() {
    return {
      // group表单数据
      form: {
        id: '',
        userName: '',
        description: ''
      },
      // 表单验证规则
      rules: {
        userName: [
          { required: true, message: '用户名称为必填项', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        description: [
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
    // 保存user
    onSubmit(formName) {
      // 根据showType选择不同的提交方法
      var choosedApi = () => {}
      if (this.showType === 'edit') { // edit
        choosedApi = userUpdateApi
      } else { // new
        choosedApi = userCreateApi
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          choosedApi(this.form).then(res => {
            if (res.code === 20000) {
              this.$message.success(res.message)
              this.$emit('handleHideGroupForm')
              this.onCancel(formName)
            } else {
              this.$message.warning(res.message)
            }
          }).catch(() => {
            this.$message.error('保存出错')
          })
        } else {
          console.log('表单校验出错，不能保存')
          return false
        }
      })
    },
    // 重置表单数据
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

