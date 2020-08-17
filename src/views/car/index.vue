<template>
  <div id="app">
    <div class="btn">
      <el-button type="primary" @click="addShop">新建</el-button>
      <el-select v-model="form.store.id" clearable placeholder="所属门店" @change="changeOrder($event)">
        <el-option v-for="item in optionsShop" :key="item.id" :label="item.name" :value="item.id" />
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
        <el-table-column align="center" prop="name" label="套餐名称" width="100" />
        <el-table-column align="center" prop="price" label="套餐价格" width="70" />
        <el-table-column align="center" prop="classify.paper" label="套餐小介绍" />
        <el-table-column align="center" prop="store.name" label="所属门店" />
        <el-table-column align="center" prop="classify.name" label="所属分类" />
        <el-table-column align="center" prop="cover" label="封面图" width="200">
          <template slot-scope="scope">
            <img :src="scope.row.cover" alt style="width:50px;height:50px">
          </template>
        </el-table-column>
        <el-table-column align="center" prop="banner" label="套餐轮播图" width="400">
          <template slot-scope="scope">
            <img
              v-for="item in scope.row.banner.split(',')"
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
          <el-input v-model="form.name" placeholder="请输入套餐名称" style="width:400px" />
        </el-form-item>
        <el-form-item label="套餐价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" placeholder="请输入套餐价格" style="width:400px" />
        </el-form-item>
        <el-form-item label="套餐小介绍" :label-width="formLabelWidth">
          <el-input v-model="form.classify.paper" placeholder="请输入套餐小介绍" style="width:400px" />
        </el-form-item>
        <el-form-item label="所属门店" :label-width="formLabelWidth">
          <el-select v-model="form.store.id" clearable placeholder="选择门店">
            <el-option
              v-for="item in optionsShop"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属分类" :label-width="formLabelWidth">
          <el-select v-model="form.classify.id" clearable placeholder="选择分类">
            <el-option
              v-for="item in optionsCombo"
              :key="item.id"
              :label="item.name"
              :value="item.id"
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
        <el-form-item label="轮播图片" :label-width="formLabelWidth">
          <el-upload
            :action="uploadPath"
            :headers="headers"
            :on-exceed="uploadOverrun1"
            :on-success="handleGalleryUrl1"
            :on-remove="handleRemove1"
            multiple
            accept=".jpg, .jpeg, .png, .gif"
            list-type="picture-card"
            :file-list="form.banner1"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <!-- <el-upload
            :headers="headers"
            :on-success="uploadUrls"
            :action="uploadPath"
            :before-upload="checkFileSize"
            list-type="picture-card"
            :auto-upload="false"
            accept=".jpg, .jpeg, .png"
          >-->
          <!-- <el-upload
            :headers="headers"
            :on-success="uploadUrls"
            :action="uploadPath"
            :before-upload="checkFileSize"
            :show-file-list="false"
            class="avatar-uploader"
            accept=".jpg, .jpeg, .png"
          >
            <img v-if="form.banner" class="avatar" :src="form.banner">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>-->
          <!-- <el-upload
            :headers="headers"
            :action="uploadPath"
            :show-file-list="false"
            :on-success="uploadUrls"
            :before-upload="checkFileSize"
            class="avatar-uploader"
            accept=".jpg, .jpeg, .png"
          >
            <img v-if="form.banner" :src="form.banner" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1024kb</div>
          </el-upload>-->
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
  shopList,
  comboList,
  comboAdd,
  comboUpdate,
  comboDelete,
  uploadPath
} from '@/api/api'
import { getToken } from '@/utils/auth'

export default {
  name: 'Combo',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
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
      optionsShop: [],
      optionsCombo: [],
      dialogFormVisible: false,
      form: {
        classify: {
          id: '',
          name: '',
          paper: ''
        },
        store: {
          id: '',
          name: ''
        },
        // id: '',
        price: '',
        cover: '',
        banner1: [],
        banner: '',
        name: ''
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
    this.getShopList()
    this.getComboList()
  },
  methods: {
    uploadOverrun1: function() {
      this.$message({
        type: 'error',
        message: '上传文件个数超出限制!最多上传5张图片!'
      })
    },
    handleGalleryUrl1(response, file, fileList) {
      if (response.code === 0) {
        this.form.banner1.push(response.data)
        this.form.banner = this.form.banner1.join(',')
      }
    },
    handleRemove1: function(file, fileList) {
      for (var i = 0; i < this.form.banner.length; i++) {
        // 这里存在两种情况
        // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.url
        //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
        // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
        var url
        if (file.response === undefined) {
          url = file.url
        } else {
          url = file.response.data.url
        }

        if (this.form.banner[i].url === url) {
          this.form.banner.splice(i, 1)
        }
      }
    },
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
    // select下拉门店
    changeOrder(val) {
      console.log(val)
      if (val !== '') {
        this.tableData = this.tableDataAll.filter((el) => el.store.id === val)
      } else if (val === '') {
        this.tableData = this.tableDataAll
      }
    },
    // 获取门店数据
    getShopList() {
      shopList()
        .then((response) => {
          this.optionsShop = response.data.data
        })
        .catch(() => {
          this.optionsShop = []
        })
    },
    // 获取分类数据
    getComboList() {
      comboClassifyList()
        .then((response) => {
          this.optionsCombo = response.data.data
        })
        .catch(() => {
          this.optionsCombo = []
        })
    },
    // 获取数据
    getList() {
      comboList({ name: this.name })
        .then((response) => {
          this.tableData = response.data.data
          this.tableDataAll = response.data.data
          // const goods = response.data.data
          // const banner = []
          // this.tableData.banner.split(',').forEach((item) => {
          //   const obj = {
          //     name: item,
          //     url: item
          //   }
          //   banner.push(obj)
          // })
          // console.log(banner)
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
      this.form.price = ''
      this.form.classify.paper = ''
      this.form.value = ''
      this.form.value3 = ''
      this.form.cover = ''
      this.form.classify.id = ''
      this.form.store.id = ''
      this.form.store.name = ''
      this.form.banner = ''
    },
    // 编辑
    getEditData(data) {
      this.dialogFormVisible = true
      this.title1 = '编辑分类'
      this.form.name = data.name
      this.form.price = data.price
      this.form.classify.paper = data.classify.paper
      this.form.classify.id = data.classify.id
      this.form.value = data.value
      this.form.value3 = data.value3
      this.form.cover = data.cover
      this.form.id = data.id
      this.form.store.id = data.store.id
      this.form.banner = data.banner
      console.log(this.form.banner)
    },
    // 编辑新增确定事件
    addSubmit() {
      // this.btnLoading = true
      if (this.form.id) {
        comboUpdate(this.form)
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
        comboAdd(this.form)
          // comboAdd(JSON.stringify(this.form))
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
          comboDelete(params)
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
