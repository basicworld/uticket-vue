<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" size="small">
      <el-form-item label="名称" prop="roleName">
        <el-input v-model="form.roleName" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
      <el-form-item label="选择权限" prop="permissionIdList">
        <el-checkbox-group v-model="form.permissionIdList">

          <div v-for="groupName in groupNameList" :key="groupName">
            <el-divider>{{ groupName }}</el-divider>
            <el-checkbox v-for="perm in permissions[groupName]" :key="perm.id" :label="perm.id">
              {{ perm.permissionName }}
            </el-checkbox>
          </div>

        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">保存</el-button>
        <el-button @click="onCancel('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { permissionListQueryApi } from '@/api/permission'
import { RESP_CODE } from '@/utils/response-code'
import { roleCreateApi, roleUpdateApi } from '@/api/role'
export default {
  name: 'RoleForm',
  props: {
    // 类型：new--新增用户组  edit--更新用户组
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
          roleName: '', // 角色名称
          permissionIdList: [], // 已选择的权限id的列表
          permissionIds: '', // 权限id 格式：id1,id2,id3
          description: '' // 角色描述
        }
      }
    }
  },
  data() {
    return {
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      form: {
        roleName: '', // 角色名称
        permissionIdList: [], // 已选择的权限id的列表
        permissionIds: '', // 权限id 格式：id1,id2,id3
        description: '' // 角色描述
      },
      permissions: {}, // 所有的权限，格式： 权限组1:[{}], 权限组2:[{}]
      groupNameList: [], //  权限组名称的列表
      rules: {
        roleName: [
          { required: true, message: '角色名称为必填项', trigger: 'blur' },
          { min: 2, max: 20, message: '长度限制为 2 到 20 字符', trigger: 'blur' }
        ],
        description: [
          { min: 2, max: 20, message: '长度限制为 2 到 20 字符', trigger: 'blur' }

        ],
        permissionIdList: [
          { required: true, message: '至少为角色配置一个权限', trigger: 'change' }

        ]
      }
    }
  },
  watch: {
    formDto: {
      deep: true,
      handler(val) {
        this.form = Object.assign({}, val)
        this.renderForm()
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.onCancel('form')
      this.form = Object.assign({}, this.formDto)
      this.renderForm()
      this.doQueryPermission()
    })
  },
  methods: {
    // 渲染permissionIdList
    renderForm() {
      if (this.form.permissionIdList !== undefined) {
        return true
      }
      this.form.permissionIdList = []
      if (this.form.permissionIds) {
        var ids = this.form.permissionIds.split(',')
        for (var i = 0; i < ids.length; i++) {
          this.form.permissionIdList.push(parseInt(ids[i]))
        }
      } else {
        this.form.permissionIds = ''
      }
    },
    // 查询权限列表
    doQueryPermission() {
      this.permissions = {}
      this.groupNameList = []
      permissionListQueryApi().then(res => {
        if (res.code === RESP_CODE.OK) {
          var list = res.data // 权限列表
          // 把权限列表分组保存到permissions中
          for (var i = 0; i < list.length; i++) {
            var item = list[i] // 权限对象
            var groupName = item.permissionGroupName // 权限分组
            if (this.permissions[groupName] === undefined) {
              this.permissions[groupName] = []
            }
            this.permissions[groupName].push(item)

            if (this.groupNameList.indexOf(groupName) < 0) {
              this.groupNameList.push(groupName)
            }
          }
        } else {
          this.$message.warning('查询异常：' + res.code)
        }
      }).catch(() => {
        this.$message.error('服务器异常，稍后再试')
      })
    },
    // 保存group
    onSubmit(formName) {
      // 根据showType选择不同的提交方法
      var choosedApi = () => {}
      if (this.showType === 'edit') { // edit
        choosedApi = roleUpdateApi
      } else { // new
        choosedApi = roleCreateApi
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.permissionIds = this.form.permissionIdList.join()
          choosedApi(this.form).then(res => {
            if (res.code === RESP_CODE.OK) {
              this.$message.success(res.message)
              this.$emit('handleHideRoleForm')
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

