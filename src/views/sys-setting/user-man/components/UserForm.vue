<template>
  <el-form ref="form" :rules="rules" :model="form" label-width="120px" size="small">
    <el-form-item label="账号/邮箱" prop="email">
      <el-input v-model="form.email" placeholder="请输入邮箱（唯一）" />
    </el-form-item>
    <el-form-item label="姓名" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户姓名" />
    </el-form-item>
    <el-form-item label="手机" prop="cellphone">
      <el-input v-model="form.cellphone" placeholder="请输入11位手机号" />
    </el-form-item>
    <el-form-item label="用户组" prop="groupId">
      <el-select v-model="form.groupId" style="width: 100%;" placeholder="请选择用户组（单选）">
        <el-option
          v-for="item in groupList"
          :key="item.id"
          :label="item.groupName"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="角色" prop="roleIds">
      <el-select v-model="form.roleIds" style="width: 100%;" multiple placeholder="请选择角色（支持多选）">
        <el-option
          v-for="item in roleList"
          :key="item.id"
          :label="item.roleName"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password" placeholder="8-20位，同时包含大小写字母和数字" />
    </el-form-item>
    <el-form-item label="确认密码" prop="passwordConfirm">
      <el-input v-model="form.passwordConfirm" type="password" placeholder="8-20位，同时包含大小写字母和数字" />
    </el-form-item>
    <el-form-item label="备注" prop="description">
      <el-input v-model="form.description" placeholder="" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">保存</el-button>
      <el-button @click="onCancel('form')">清空</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { userCreateApi, userUpdateApi } from '@/api/user'
import { roleListQueryApi } from '@/api/role'
import { RESP_CODE } from '@/utils/response-code'
import { groupListQueryApi } from '@/api/group'
import { validCellphone } from '@/utils/validate'

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
          email: '',
          cellphone: '',
          password: '', // 密码 用于输入
          passwordConfirm: '', // 确认密码
          passwordHash: '', // md5密码 用于提交给服务器，做md5加密
          username: '',
          description: '',
          roleIds: [],
          groupId: ''
        }
      }
    }
  },

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
    // 密码校验
    const checkPassword = (rule, value, callback) => {
      if (value.trim() !== value) {
        callback(new Error('密码不允许空格'))
      }
      if (value.length < 8 || value.length > 20) {
        callback(new Error('密码长度限定为8-20位'))
      }
      var ls = 0
      if (value.match(/([a-z])+/)) { ls++ }
      if (value.match(/([0-9])+/)) { ls++ }
      if (value.match(/([A-Z])+/)) { ls++ }
      if (value.match(/[^a-zA-Z0-9]+/)) { ls++ }
      if (ls < 3) {
        callback(new Error('密码必须同时包含大写字母、小写字母、数字'))
      }
      callback()
    }
    const checkPasswordConfirm = (rule, value, callback) => {
      if (this.form.password !== this.form.passwordConfirm) {
        callback(new Error('两次输入密码不一致'))
      }
      callback()
    }
    return {
      roleList: [],
      groupList: [],
      // 表单数据
      form: {
        email: '',
        cellphone: '',
        password: '', // 密码 用于输入
        passwordConfirm: '', // 确认密码
        passwordHash: '', // md5密码 用于提交给服务器，做md5加密
        username: '',
        description: '',
        roleIds: [],
        groupId: ''
      },
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: '用户名称为必填项', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱为必填项', trigger: 'blur' },
          { type: 'email', message: '请输入正确格式的邮箱', trigger: 'blur' }
        ],
        cellphone: [
          { validator: checkPhone, message: '请输入正确格式的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码为必填项', trigger: 'blur' },
          { min: 8, max: 20, message: '密码长度在 8 到 20 个字符', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ],
        passwordConfirm: [
          { required: true, message: '密码为必填项', trigger: 'blur' },
          { min: 8, max: 20, message: '密码长度在 8 到 20 个字符', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' },
          { validator: checkPasswordConfirm, trigger: 'blur' }
        ],
        description: [
          { max: 100, message: '长度不超过 100 个字符', trigger: 'blur' }
        ],
        groupId: [
          { required: true, message: '用户组为必填项', trigger: 'change' }
        ],
        roleIds: [
          { required: true, message: '请至少选择一个角色', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    formDto: {
      deep: true,
      handler(val) {
        this.form = Object.assign({}, val)
        this.form.roleIds = []
        for (var i = 0; i < this.form.roles.length; i++) {
          this.form.roleIds.push(this.form.roles[i].id)
        }
        console.log(this.form)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.onCancel('form')
      this.form = Object.assign({}, this.formDto)
      this.doQueryRoles()
      this.doQueryGroups()
      // 编辑用户时，可以不输入密码
      if (this.showType === 'edit') {
        this.rules.password = undefined
        this.rules.passwordConfirm = undefined
      }
    })
  },
  methods: {
    // 用户组列表查询
    doQueryGroups() {
      groupListQueryApi({ all: 'true' }).then(res => {
        if (res.code === RESP_CODE.OK) {
          this.groupList = res.data
        }
      }).catch(() => {
        this.$message.error('查询异常，稍后再试')
      })
    },
    // 查询角色列表
    doQueryRoles() {
      console.log('获取角色列表')
      roleListQueryApi({ all: 'true' }).then(res => {
        if (res.code === RESP_CODE.OK) {
          this.roleList = res.data
        } else {
          this.$message.warning('请求异常：' + res.code)
        }
      }).catch(() => {
        this.$message.error('请求异常，稍后再试')
      })
    },
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
              this.$emit('handleHideUserForm')
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

