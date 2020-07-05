<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px" size="small">
      <el-form-item label="名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item label="我的工单">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="我的工单" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="工单中心">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="查看全部工单" name="type" />
          <el-checkbox label="查看组内工单" name="type" />
          <el-checkbox label="创建工单" name="type" />
          <el-checkbox label="新增客户" name="type" />
          <el-checkbox label="新增公司" name="type" />
          <el-checkbox label="删除工单" name="type" />
          <el-checkbox label="编辑全部工单" name="type" />
          <el-checkbox label="编辑组内工单" name="type" />
          <el-checkbox label="编辑所属工单" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="客户中心">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="客户管理" name="type" />
          <el-checkbox label="公司管理" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="系统管理">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="用户管理" name="type" />
          <el-checkbox label="用户组管理" name="type" />
          <el-checkbox label="角色管理" name="type" />
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'RoleEdit',
  data() {
    return {
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
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
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

