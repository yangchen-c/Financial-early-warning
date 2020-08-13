<template>
  <div id="app">
    <div class="btn">
      <el-button type="primary" @click="addShop">新建</el-button>
      <el-input
        v-model="name"
        placeholder="请输入职位名称"
        clearable
        style="width:180px;margin-left:200px"
      />
      <el-button type="primary" @click="getList()">搜索</el-button>
    </div>
    <div class="tablee">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" prop="id" label="ID" width="50" />
        <el-table-column align="center" prop="name" label="职位名称" />
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
        <el-form-item label="职位名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入职位名称" style="width:400px" />
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
  positionList,
  positionAdd,
  positionUpdate,
  positionDelete
} from '@/api/api'

export default {
  name: 'Position',
  data() {
    return {
      btnLoading: false,
      name: '', // 门店名称
      title1: '',
      // 表格数据
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: '',
        id: ''
      },
      formLabelWidth: '100px'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取数据
    getList() {
      positionList({ name: this.name })
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
      this.title1 = '新增职位'
    },
    // 编辑
    getEditData(data) {
      this.dialogFormVisible = true
      this.form.name = data.name
      this.title1 = '编辑职位'
      this.form.id = data.id
    },
    // 编辑新增确定事件
    addSubmit() {
      // this.btnLoading = true
      if (this.form.id) {
        positionUpdate(this.form)
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
        positionAdd(this.form)
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
          positionDelete(params)
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
  // .avatar-uploader-icon {
  //   font-size: 28px;
  //   color: #8c939d;
  //   width: 120px;
  //   height: 120px;
  //   line-height: 120px;
  //   text-align: center;
  // }
  // .avatar {
  //   width: 145px;
  //   height: 145px;
  //   display: block;
  // }
}
</style>
