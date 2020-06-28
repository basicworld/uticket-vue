<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" size="small">
      <el-form-item label="原密码">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.name" />
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

