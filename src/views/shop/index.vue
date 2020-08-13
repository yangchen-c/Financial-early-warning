<template>
  <div id="app">
    <div class="btn">
      <el-button type="primary" @click="addShop">新建</el-button>
      <el-input
        v-model="name"
        placeholder="请输入门店名称"
        clearable
        style="width:180px;margin-left:200px"
      />
      <el-button type="primary" @click="getList()">搜索</el-button>
    </div>
    <div class="tablee">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" prop="id" label="ID" width="50" />
        <el-table-column align="center" prop="name" label="名称" />
        <el-table-column align="center" prop="phone" label="门店联系电话" />
        <el-table-column align="center" prop="address" label="门店地址" />
        <el-table-column align="center" prop="photo" label="门店图片" width="200">
          <template slot-scope="scope">
            <img :src="scope.row.photo" alt style="width:50px;height:50px">
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
        <el-form-item label="门店名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入门店名称" style="width:400px" />
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="form.phone" placeholder="请输入联系方式" style="width:400px" />
        </el-form-item>
        <el-form-item label="门店地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" placeholder="请输入门店地址" style="width:400px" />
        </el-form-item>
        <el-form-item label="门店坐标" :label-width="formLabelWidth">
          <el-input v-model="form.longitude" placeholder="请输入门店经度坐标" style="width:198px" />
          <el-input v-model="form.latitude" placeholder="请输入门店纬度坐标" style="width:198px" />
        </el-form-item>
        <el-form-item label="门头图片" :label-width="formLabelWidth">
          <el-upload
            :headers="headers"
            :action="uploadPath"
            :show-file-list="false"
            :on-success="uploadUrl"
            :before-upload="checkFileSize"
            class="avatar-uploader"
            accept=".jpg, .jpeg, .png"
          >
            <img v-if="form.photo" :src="form.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1024kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="店长账户" :label-width="formLabelWidth">
          <el-input v-model="form.sort" placeholder="请输入店长账户" style="width:400px" />
        </el-form-item>
        <el-form-item label="前台账户" :label-width="formLabelWidth">
          <el-input v-model="form.state" placeholder="请输入前台账户" style="width:400px" />
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
  shopList,
  shopUpdate,
  shopAdd,
  shopDelete,
  uploadPath
} from '@/api/api'
import { getToken } from '@/utils/auth'

export default {
  name: 'Customer',
  data() {
    return {
      uploadPath,
      btnLoading: false,
      name: '', // 门店名称
      // 表格数据
      tableData: [],
      dialogFormVisible: false,
      form: {
        // delivery: false,
        name: '',
        phone: '',
        address: '',
        // type: [],
        // resource: '',
        // desc: '',
        id: '',
        longitude: '',
        latitude: '',
        sort: '',
        state: '',
        photo: ''
      },
      formLabelWidth: '220px',
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
      this.form.photo = response.data
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
      shopList({ name: this.name })
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
      this.form.name = ''
      this.form.id = ''
      this.form.phone = ''
      this.form.address = ''
      this.form.longitude = ''
      this.form.latitude = ''
      this.form.sort = ''
      this.form.state = ''
      this.form.photo = ''
      this.title1 = '新增门店'
    },
    // 编辑
    getEditData(data) {
      // console.log(this.form.id)
      this.dialogFormVisible = true
      this.form.name = data.name
      this.form.id = data.id
      this.form.phone = data.phone
      this.form.address = data.address
      this.form.longitude = data.longitude
      this.form.latitude = data.latitude
      this.form.sort = data.sort
      this.form.state = data.state
      this.form.photo = data.photo
      this.title1 = '编辑门店'
    },
    // 编辑新增确定事件
    addSubmit() {
      // this.btnLoading = true
      if (this.form.id) {
        shopUpdate(this.form)
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
        shopAdd(this.form)
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
          shopDelete(params)
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
          // this.$message({
          //   // type: 'info',
          //   // message: '已取消删除'
          // })
        })
    }
    // delData(row) {
    //   const params = {
    //     id: row.id
    //   }
    //   shopDelete(params)
    //     .then((response) => {
    //       this.$notify.success({
    //         title: '成功',
    //         message: '店铺删除成功'
    //       })
    //       this.getList()
    //     })
    //     .catch((response) => {
    //       this.$notify.error({
    //         title: '失败',
    //         message: response.data.message
    //       })
    //     })
    // }
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
