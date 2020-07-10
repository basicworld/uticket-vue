<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="50px" size="small">
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
        <el-select
          v-model="form.companyName"
          filterable
          remote
          placeholder="输入名称搜索"
          :remote-method="companyRemoteSearch"
          :loading="companySearchLoading"
          style="width: 100%;"
        >
          <el-option
            v-for="item in companyOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
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
import { customerCreateApi, customerUpdateApi } from '@/api/customer'
import { companySuggestQueryApi } from '@/api/company'
import { validCellphone } from '@/utils/validate'

export default {
  name: 'NewCustomer',
  props: {
    // 类型：new--新增客户  edit--更新客户
    showTypeDto: {
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
          nickName: '',
          cellphone: '', // 手机号
          email: '', // 邮箱
          companyName: '',
          description: '',
          tags: ''
        }
      }
    }
  },

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
      companySearchLoading: false,
      companyOptions: [],
      // 表单数据
      form: {
        nickName: '',
        cellphone: '', // 手机号
        email: '', // 邮箱
        companyName: '',
        description: '',
        tags: ''
      },
      // 表单验证规则
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
    // 远程搜索机构
    companyRemoteSearch(query) {
      if (query !== '') {
        this.companySearchLoading = true
        setTimeout(() => {
          companySuggestQueryApi().then(res => {
            if (res.code === 20000) {
              this.companyOptions = res.data
            }
            this.companySearchLoading = false
          }).catch(() => {
            this.$message.error('远程搜索机构错误')
          })
        }, 200)
      } else {
        this.companyOptions = []
      }
    },
    // 保存
    onSubmit(formName) {
      // 根据showType选择不同的提交方法
      var choosedApi = () => {}
      if (this.showTypeDto === 'edit') { // edit
        choosedApi = customerUpdateApi
      } else { // new
        choosedApi = customerCreateApi
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
            this.$message.error('保存出错')
          })
        } else {
          console.log('表单校验出错，不能保存')
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

