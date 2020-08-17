<template>
  <div id="app">
    <div class="btn">
      <el-button type="primary" @click="addShop">新建</el-button>
      <el-select v-model="value" clearable placeholder="所属门店">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-date-picker v-model="value1" type="date" placeholder="选择日期" />
      <el-select v-model="value2" clearable placeholder="选择状态">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary">查询</el-button>
      <el-input
        v-model="name"
        placeholder="请输入门店名称"
        clearable
        style="width:180px;margin-left:50px"
      />
      <el-button type="primary" @click="getList()">搜索</el-button>
    </div>
    <div class="tablee">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" prop="id" label="ID" width="50" />
        <el-table-column align="center" prop="name" label="案例名称" width="100" />
        <el-table-column align="center" prop="createTime" label="时间" width="70" />
        <el-table-column align="center" prop="name" label="所属门店" />
        <el-table-column align="center" prop="name" label="所属分类" />
        <el-table-column align="center" prop="name" label="所属套餐" />
        <el-table-column align="center" prop="cover" label="封面图" width="200">
          <template slot-scope="scope">
            <img :src="scope.row.cover" alt style="width:50px;height:50px">
          </template>
        </el-table-column>
        <el-table-column align="center" prop="infoPhoto" label="套餐轮播图" width="400">
          <template slot-scope="scope">
            <img
              v-for="item in scope.row.infoPhoto.split(',')"
              :key="item.id"
              :src="item"
              alt
              style="width:50px;height:50px"
            >
          </template>
        </el-table-column>
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
        <el-form-item label="套餐名称" :label-width="formLabelWidth">
          <el-input v-model="form.classify.name" placeholder="请输入套餐名称" style="width:400px" />
        </el-form-item>
        <el-form-item label="套餐价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" placeholder="请输入套餐价格" style="width:400px" />
        </el-form-item>
        <el-form-item label="套餐小介绍" :label-width="formLabelWidth">
          <el-input v-model="form.classify.paper" placeholder="请输入套餐小介绍" style="width:400px" />
        </el-form-item>
        <el-form-item label="所属门店" :label-width="formLabelWidth">
          <el-select v-model="value" clearable placeholder="选择门店">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属分类" :label-width="formLabelWidth">
          <el-select v-model="value3" clearable placeholder="选择分类">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="封面图片" :label-width="formLabelWidth">
          <el-upload
            :headers="headers"
            :action="uploadPath"
            :show-file-list="false"
            :on-success="uploadUrl"
            :before-upload="checkFileSize"
            class="avatar-uploader"
            accept=".jpg, .jpeg, .png"
          >
            <img v-if="form.cover" :src="form.cover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1024kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="轮播图" :label-width="formLabelWidth">
          <el-upload
            :headers="headers"
            :action="uploadPath"
            :show-file-list="false"
            :on-success="uploadUrl"
            :before-upload="checkFileSize"
            class="avatar-uploader"
            accept=".jpg, .jpeg, .png"
          >
            <img v-if="form.banner" :src="form.banner" class="avatar">
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
  caseList,
  caseAdd,
  caseUpdate,
  caseDelete,
  uploadPath
} from '@/api/api'
import { getToken } from '@/utils/auth'

export default {
  name: 'Case',
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '门店1'
        },
        {
          value: '选项2',
          label: '门店2'
        }
      ],
      options2: [
        {
          value: '选项1',
          label: '状态1'
        },
        {
          value: '选项2',
          label: '状态2'
        }
      ],
      options3: [
        {
          value: '选项1',
          label: '分类1'
        },
        {
          value: '选项2',
          label: '分类2'
        }
      ],
      uploadPath,
      value: '',
      value1: '',
      value2: '',
      value3: '',
      // uploadPath,
      btnLoading: false,
      name: '', // 门店名称
      // 表格数据
      tableData: [],
      dialogFormVisible: false,
      form: {
        classify: {
          id: '',
          name: '',
          paper: ''
        },
        store: {
          name: ''
        },
        // id: '',
        price: '',
        cover: '',
        banner: ''
      },
      formLabelWidth: '120px',
      title1: ''
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
      this.form.cover = response.data
    },
    // uploadUrls: function(response) {
    //   console.log(response)
    //   this.form.banner = response.data
    // },
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
      caseList({ name: this.name })
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
      this.form.classify.name = ''
      this.form.price = ''
      this.form.classify.paper = ''
      this.form.value = ''
      this.form.value3 = ''
      this.form.cover = ''
    },
    // 编辑
    getEditData(data) {
      this.dialogFormVisible = true
      this.title1 = '编辑分类'
      this.form.classify.name = data.classify.name
      this.form.price = data.price
      this.form.classify.paper = data.classify.paper
      this.form.value = data.value
      this.form.value3 = data.value3
      this.form.cover = data.cover
      this.form.id = data.id
    },
    // 编辑新增确定事件
    addSubmit() {
      // this.btnLoading = true
      if (this.form.id) {
        caseUpdate(this.form)
          // comboUpdate(JSON.stringify(this.form))
          .then(() => {
            this.$notify.success({
              title: '成功',
              message: '套餐修改成功'
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
        caseAdd(this.form)
          .then(() => {
            this.$notify.success({
              title: '成功',
              message: '套餐添加成功'
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
      this.$confirm('此操作将永久删除该套餐, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {
            id: row.id
          }
          caseDelete(params)
            .then((response) => {
              this.$notify.success({
                title: '成功',
                message: '套餐删除成功'
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
