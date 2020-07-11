<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" size="small">
      <el-form-item label="标题" prop="subject">
        <el-input v-model="form.subject" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="form.content" type="textarea" />
      </el-form-item>

      <el-form-item label="优先级" prop="priority">
        <el-radio-group v-model="form.priority">
          <el-radio label="low">低</el-radio>
          <el-radio label="medium">标准</el-radio>
          <el-radio label="high">高</el-radio>
          <el-radio label="urgency">紧急</el-radio>
        </el-radio-group>
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
      <el-form-item label="客户">
        <el-select
          v-model="form.customerId"
          filterable
          remote
          placeholder="输入客户姓名搜索"
          :remote-method="customerRemoteSearch"
          :loading="customerSearchLoading"
          style="width: 100%;"
        >
          <el-option
            v-for="item in customerOptions"
            :key="item.id"
            :label="item.nickName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="受理人">
        <el-select
          v-model="form.assigneeId"
          filterable
          remote
          placeholder="输入客服姓名搜索"
          :remote-method="userRemoteSearch"
          :loading="userSearchLoading"
          style="width: 100%;"
        >
          <el-option
            v-for="item in userOptions"
            :key="item.id"
            :label="item.nickName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="关注人">
        <el-select
          v-model="form.followerIds"
          filterable
          remote
          multiple
          placeholder="输入客服姓名搜索，可多选"
          :remote-method="userRemoteSearch"
          :loading="userSearchLoading"
          style="width: 100%;"
        >
          <el-option
            v-for="item in userOptions"
            :key="item.id"
            :label="item.nickName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="标签">
        <el-input v-model="form.tags" />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status" disabled>
          <el-radio label="open">开启</el-radio>
          <el-radio label="solving">解决中</el-radio>
          <el-radio label="resolved">已解决</el-radio>
          <el-radio label="closed">已关闭</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交工单</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { customerSuggestQueryApi } from '@/api/customer'
import { userSuggestQueryApi } from '@/api/user'
export default {
  name: 'TicketForm',
  data() {
    return {
      customerSearchLoading: false,
      customerOptions: [],
      userSearchLoading: false,
      userOptions: [],
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      form: {
        subject: '', // subject	字符串	是	标题	最大长度255个字符
        content: '', // content	字符串	是	内容
        priority: 'medium', // priority	字符串	否	优先级中文名称， 默认为标准
        customerId: '',
        assigneeId: '',
        followerIds: '',
        tags: '', // tags	字符串	否	工单标签,如"标签1,标签2",字符串内是标签名字,用逗号隔开
        status: 'open' // status	字符串	否	状态中文名称，默认为开启

      },
      rules: {
        subject: [
          { required: true, message: '工单标题为必填项', trigger: 'blur' },
          { min: 2, max: 50, message: '工单标题长度限制为 2 到 50 个字符', trigger: 'blur' }

        ],
        content: [
          { required: true, message: '工单内容为必填项', trigger: 'blur' },
          { max: 500, message: '工单内容最大长度限制为 500 个字符', trigger: 'blur' }

        ],
        priority: [
          { required: true, message: '工单优先级为必选项', trigger: 'blur' }

        ],
        status: [
          { required: true, message: '工单状态为必选项', trigger: 'blur' }

        ]
      }
    }
  },
  methods: {
    // 远程搜索机构
    customerRemoteSearch(query) {
      if (query !== '') {
        this.customerSearchLoading = true
        setTimeout(() => {
          customerSuggestQueryApi().then(res => {
            if (res.code === 20000) {
              this.customerOptions = res.data
            }
            this.customerSearchLoading = false
          }).catch(() => {
            this.$message.error('远程搜索客户错误')
          })
        }, 200)
      } else {
        this.customerOptions = []
      }
    },
    // 远程搜索user
    userRemoteSearch(query) {
      if (query !== '') {
        this.userSearchLoading = true
        setTimeout(() => {
          userSuggestQueryApi().then(res => {
            if (res.code === 20000) {
              this.userOptions = res.data
            }
            this.userSearchLoading = false
          }).catch(() => {
            this.$message.error('远程搜索用户错误')
          })
        }, 200)
      } else {
        this.userOptions = []
      }
    },
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
.fullwidth {
  width: 100%;
}
</style>

