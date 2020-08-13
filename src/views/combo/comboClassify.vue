<template>
  <div id="app">
    <div class="btn">
      <el-button type="primary" @click="addShop">新建</el-button>
    </div>
    <div class="tablee">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" prop="id" label="ID" width="50" />
        <el-table-column align="center" prop="name" label="分类名称" />
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-document-copy"
              type="primary"
              @click="getEditData(scope.row)"
            >编辑</el-button>
            <el-button size="mini" icon="el-icon-user" type="danger" @click="delData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- dialog弹出框 -->
    <el-dialog :title="title1" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输分类名称" style="width:400px" />
        </el-form-item>
        <el-form-item label="分类简述" :label-width="formLabelWidth">
          <el-input v-model="form.paper" placeholder="请输分类简述" style="width:400px" />
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            :headers="headers"
            :action="uploadPath"
            :show-file-list="false"
            :on-success="uploadUrl"
            :before-upload="checkFileSize"
            class="avatar-uploader"
            accept=".jpg, .jpeg, .png"
          >
            <img v-if="form.background" :src="form.background" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1024kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="addSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  comboClassifyList,
  comboClassifyAdd,
  comboClassifyUpdate,
  comboClassifyDelete,
  uploadPath
} from '@/api/api'
import { getToken } from '@/utils/auth'

export default {
  name: 'ComboClassify',
  data() {
    return {
      uploadPath,
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: '100px',
      btnLoading: false,
      title1: '',
      form: {
        name: '',
        id: '',
        background: '',
        paper: ''
      }
    }
  },
  computed: {
    headers() {
      return {
        token: getToken()
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 文件上传
    uploadUrl: function(response) {
      console.log(response)
      this.form.background = response.data
    },
    checkFileSize: function(file) {
      if (file.size > 1048576) {
        this.$message.error(
          `${file.name}文件大于1024KB，请选择小于1024KB大小的图片`
        )
        return false
      }
      return true
    },
    // 获取数据
    getList() {
      comboClassifyList()
        .then((response) => {
          this.tableData = response.data.data
        })
        .catch(() => {
          this.tableData = []
        })
    },
    // 新建
    addShop() {
      this.dialogFormVisible = true
      this.title1 = '新建分类'
      this.form.name = ''
      this.form.id = ''
      this.form.background = ''
      this.form.paper = ''
    },
    // 编辑
    getEditData(data) {
      // console.log(this.form.id)
      this.dialogFormVisible = true
      this.title1 = '编辑分类'
      this.form.name = data.name
      this.form.id = data.id
      this.form.background = data.background
      this.form.paper = data.paper
    },
    // 编辑新增确定事件
    addSubmit() {
      // this.btnLoading = true
      if (this.form.id) {
        comboClassifyUpdate(this.form)
          .then(() => {
            this.$notify.success({
              title: '成功',
              message: '店铺修改成功'
            })
            this.dialogFormVisible = false
            this.getList()
          })
          .catch((response) => {
            this.$notify.error({
              title: '失败',
              message: response.data.message
            })
          })
      } else {
        comboClassifyAdd(this.form)
          .then(() => {
            this.$notify.success({
              title: '成功',
              message: '店铺添加成功'
            })
            this.dialogFormVisible = false
            this.getList()
          })
          .catch((response) => {
            this.$notify.error({
              title: '失败',
              message: response.data.message
            })
          })
      }
    },
    // 删除
    delData(row) {
      this.$confirm('此操作将永久删除该店铺, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {
            id: row.id
          }
          comboClassifyDelete(params)
            .then((response) => {
              this.$notify.success({
                title: '成功',
                message: '店铺删除成功'
              })
              this.getList()
            })
            .catch((response) => {
              this.$notify.error({
                title: '失败',
                message: response.data.message
              })
            })
        })
        .catch(() => {
          this.$notify.error({
            title: '取消',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
@rem: 1920/100rem;
#app {
  box-sizing: border-box;
  padding-left: 30 / @rem;
  padding-top: 30 / @rem;
  .tablee {
    margin-top: 20 / @rem;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 145px;
    height: 145px;
    display: block;
  }
}
</style>
