<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" size="small">

      <el-form-item label="【邮件通知】" />
      <el-form-item label="工单受理人通知">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="工单分配通知" name="type" />
          <el-checkbox label="客户回复工单" name="type" />
          <el-checkbox label="其他员工回复工单" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="工单关注人通知">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="客户回复通知" name="type" />
          <el-checkbox label="其他员工回复通知" name="type" />
          <el-checkbox label="工单其他更新通知" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-divider />
      <el-form-item label="【短信通知】" />
      <el-form-item label="工单受理人通知">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="工单分配通知" name="type" />
          <el-checkbox label="客户回复工单" name="type" />
          <el-checkbox label="其他员工回复工单" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="工单关注人通知">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="客户回复通知" name="type" />
          <el-checkbox label="其他员工回复通知" name="type" />
          <el-checkbox label="工单其他更新通知" name="type" />
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
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

