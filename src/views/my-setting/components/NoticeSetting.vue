<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px" size="small">

      <el-form-item label="选择开通" prop="noticeSettingIdList">
        <el-checkbox-group v-model="form.noticeSettingIdList">

          <div v-for="groupName in noticeSettingGroupNames" :key="groupName">
            <el-divider>{{ groupName }}</el-divider>
            <el-checkbox v-for="noticeSt in noticeSettings[groupName]" :key="noticeSt.id" :label="noticeSt.id">
              {{ noticeSt.noticeSettingName }}
            </el-checkbox>
          </div>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userNoticeQueryApi, userNoticeUpdateApi } from '@/api/user'
import { RESP_CODE } from '@/utils/response-code'
export default {
  name: 'NoticeSetting',

  data() {
    return {
      form: {
        noticeSettingIdList: [], // 已选择通知权限id列表
        noticeSettingIds: '' // 已选择通知权限id 格式： id1,id2,id3
      },
      noticeSettings: {}, // 所有的通知权限，格式： 组1:[{}], 组2:[{}]
      noticeSettingGroupNames: [] // 所有通知权限的组的名字
    }
  },
  mounted() {
    this.doQueryNoticeSetting()
  },
  methods: {
    // 查询用户的通知权限配置，包括可选的、已选的
    doQueryNoticeSetting() {
      this.form.noticeSettingIdList = []
      this.form.noticeSettingIds = ''
      this.noticeSettings = {}
      this.noticeSettingGroupNames = [] //

      userNoticeQueryApi().then(res => {
        if (res.code === RESP_CODE.OK) {
          var list = res.data // 列表
          // 把列表分组保存到 noticeSettings 中
          for (var i = 0; i < list.length; i++) {
            var item = list[i] // 对象
            var groupName = item.noticeSettingGroupName // 分组
            if (this.noticeSettings[groupName] === undefined) {
              this.noticeSettings[groupName] = []
            }
            this.noticeSettings[groupName].push(item)
            // 组名保存
            if (this.noticeSettingGroupNames.indexOf(groupName) < 0) {
              this.noticeSettingGroupNames.push(groupName)
            }
            // id 保存到已选择列表
            if (parseInt(item.selected) === 1) {
              this.form.noticeSettingIdList.push(parseInt(item.id))
            }
          }
        } else {
          this.$message.warning('查询异常：' + res.code)
        }
      }).catch(() => {
        this.$message.error('服务器异常，稍后再试')
      })
    },
    onSubmit() {
      this.form.noticeSettingIds = this.form.noticeSettingIdList.join()
      userNoticeUpdateApi(this.form).then(res => {
        if (res.code === RESP_CODE.OK) {
          this.$message.success('保存成功')
        } else {
          this.$message.warning('保存异常：' + res.code)
        }
      }).catch(() => {
        this.$message.error('服务器异常，稍后再试')
      })
    },
    onCancel() {
      this.$refs.form.resetFields()
      this.doQueryNoticeSetting()
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

