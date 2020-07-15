<template>
  <el-form ref="form" :model="form" label-width="50px" size="small">
    <el-form-item label="用户">
      <el-select v-model="form.memberIds" multiple value-key="id" placeholder="请选择" style="width: 100%;">
        <el-option
          v-for="item in memberOptions"
          :key="item.id"
          :label="item.nickName"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">保存</el-button>
      <el-button @click="onCancel('form')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { groupUpdateApi, groupCustomerQueryApi } from '@/api/group'
import { RESP_CODE } from '@/utils/response-code'
import { userSuggestQueryApi } from '@/api/user'
export default {
  name: 'GroupMemberManage',
  props: {
    groupId: {
      type: Number,
      required: false,
      default() {
        return undefined
      }
    }

  },
  data() {
    return {
      groupMembers: [],
      // 候选成员列表
      memberOptions: [],
      // 表单数据
      form: {
        memberIds: [] // 用户id，格式示例 [1,2,3]
      }

    }
  },
  watch: {
    groupId: {
      deep: true,
      handler(val) {
        this.doQueryMemberOptions()
        this.doQueryMembers()
      }
    },
    groupMembers: {
      deep: true,
      handler(val) {
        this.form.memberIds = []
        // groupMembers 变化的时候，把成员的id复制到this.form.memberIds
        for (var i = 0; i < this.groupMembers.length; i++) {
          this.form.memberIds.push(this.groupMembers[i].id)
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.onCancel('form')
      this.doQueryMemberOptions()
      this.doQueryMembers()
    })
  },
  methods: {
    // 查询当前组中成员列表
    doQueryMembers() {
      this.groupMembers = []
      groupCustomerQueryApi({ groupId: this.groupId }).then(res => {
        if (res.code === RESP_CODE.OK) {
          this.groupMembers = res.data
        } else {
          this.$message.warning('查询当前用户列表异常：' + res.code)
        }
      }).catch(() => {})
    },
    // 查询候选用户列表
    doQueryMemberOptions() {
      userSuggestQueryApi().then(res => {
        if (res.code === RESP_CODE.OK) {
          this.memberOptions = res.data
        } else {
          this.$message.warning('查询候选用户列表异常：' + res.code)
        }
      }).catch(() => {})
    },
    // 保存group
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          groupUpdateApi(this.form).then(res => {
            if (res.code === 20000) {
              this.$message.success(res.message)
              this.$emit('handleHideGroupMemberForm')
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
      this.doQueryMembers()
    }
  }
}
</script>

