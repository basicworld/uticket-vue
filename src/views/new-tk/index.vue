<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" size="small">
      <el-form-item label="主题">
        <el-input v-model="form.subject" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.content" type="textarea" />
      </el-form-item>
      <el-form-item label="上传附件">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="客户">
              <el-select v-model="form.region" placeholder="please select your zone">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
              <el-button type="text" icon="el-icon-plus" circle />
            </el-form-item>

          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">

            <el-form-item label="状态">
              <el-select v-model="form.region" placeholder="please select your zone">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">

            <el-form-item label="受理人">
              <el-select v-model="form.region" placeholder="please select your zone">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">

            <el-form-item label="优先级">
              <el-select v-model="form.region" placeholder="please select your zone">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="关注人">
              <el-select v-model="form.region" placeholder="please select your zone">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>

          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-form-item label="标签">
              <el-input v-model="form.name" />

            </el-form-item>

          </div>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交工单</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'NewTicket',
  data() {
    return {
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      form: {
        subject: '', // subject	字符串	是	标题	最大长度255个字符
        content: '', // content	字符串	是	内容
        type: '', // type	字符串	否	查找客户时使用的类型
        typeContent: '', // type_content	字符串	否	与类型type对应的值	最大长度255个字符
        priority: '', // priority	字符串	否	优先级中文名称， 默认为标准
        assigneeEmail: '', // assignee_email	字符串	否	受理客服邮箱	最大长度255个字符
        agentGroupName: '', // agent_group_name	字符串	否	受理客服组名称	最大长度255个字符
        templateId: undefined, // template_id	整型	否	工单模板id,无传入值或传入错误值则使用默认模板
        followerIds: '', // follower_ids	数组	否	工单关注人,如[1,2,3],数组内是客服id
        tags: '', // tags	字符串	否	工单标签,如"标签1,标签2",字符串内是标签名字,用逗号隔开
        status: '', // status	字符串	否	状态中文名称，默认为开启
        ticketField: undefined, // ticket_field	对象	否	自定义字段，详见下文
        creatorEmail: ''// creator_email	字符串	否	工单创建人邮箱	最大长度255个字符
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

