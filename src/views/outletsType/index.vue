<template>
  <div id="app">
    <div class="btn">
      <el-button type="primary" size="small" round @click="add">新建</el-button>
    </div>
    <div class="tablee">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" type="index" label="序号" width="50" />
        <el-table-column align="center" prop="name" label="网点类型" />
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              type="primary"
              round
              @click="getEditData(scope.row)"
            >修改</el-button>
            <el-button
              size="mini"
              icon="el-icon-delete"
              type="danger"
              round
              @click="delData(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- dialog弹出框 -->
    <div class="dialog">
      <el-dialog :title="title1" :visible.sync="dialogFormVisible" width="33%">
        <el-form :model="form">
          <el-form-item label="网点类型" :label-width="formLabelWidth">
            <el-input v-model="form.name" placeholder="请输入网点类型" style="width:400px" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  branchesTypeList,
  branchesTypeAdd,
  branchesTypeUpdate,
  branchesTypeDelete
} from '@/api/api'
export default {
  name: 'OutletsType',
  data() {
    return {
      dialogFormVisible: false,
      title1: '',
      formLabelWidth: '100px',
      tableData: [], // 表格数据
      form: {
        id: '',
        name: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取网点类型数据
    getList() {
      branchesTypeList()
        .then((response) => {
          this.tableData = response.data.data
        })
        .catch(() => {
          this.tableData = []
        })
    },
    // 新增
    add() {
      this.dialogFormVisible = true
      this.title1 = '新建网点'
      this.form.id = ''
      this.form.name = ''
    },
    // 编辑
    getEditData(data) {
      this.dialogFormVisible = true
      this.title1 = '编辑网点'
      this.form.id = data.id
      this.form.name = data.name
    },
    // 删除
    delData(row) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {
            id: row.id
          }
          branchesTypeDelete(params)
            .then((response) => {
              this.$notify.success({
                title: '成功',
                message: '记录删除成功'
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
    },
    // 编辑新增确定事件
    addSubmit() {
      console.log('编辑新增确定')
      if (this.form.id) {
        branchesTypeUpdate(this.form)
          .then(() => {
            this.$notify.success({
              title: '成功',
              message: '记录修改成功'
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
        branchesTypeAdd(this.form)
          .then(() => {
            this.$notify.success({
              title: '成功',
              message: '记录添加成功'
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
    }
  }
}
</script>

<style lang="less">
@rem: 1920/100rem;
//表格样式--------------------------------------
.inputR .el-input__inner {
  border-radius: 30 / @rem;
}
.selectR .el-input__inner {
  border-radius: 30 / @rem;
}
.el-table .tableRowClassName {
  background: #1d2027;
}
// 表头
.el-table .el-table__header-wrapper tr th {
  background-color: #17181c !important;
  color: rgb(255, 255, 255);
}
// 每行
.el-table .el-table__row {
  background-color: #17181c;
  color: rgb(255, 255, 255);
}
// 鼠标hover每行的样式：
.el-table .el-table__body tr.current-row > td {
  background-color: #0d1f34 !important;
}
.el-table .el-table__body tr:hover > td {
  background-color: #0d1f34 !important;
}
// 边框颜色
.el-table {
  // border-collapse: collapse;
  // margin:-1px -1px -1px -1px ;
  border: 1px solid #ffffff;
  // border: 0;
  border-radius: 20 / @rem;
}
// 修改表格每行边框的样式：
.el-table td {
  border-bottom: 1px solid #ffffff;
  border-right: 1px solid #ffffff;
}
.el-table th.is-leaf {
  border-bottom: 1px solid #ffffff;
  border-right: 1px solid #ffffff;
}

// dialog弹框样式----------------------------------------------
.dialog {
  .el-dialog__header {
    background: #17171b;
    .el-dialog__title {
      color: #ffffff;
    }
  }
  .el-dialog__body {
    background: #17171b;
  }
  .el-dialog__footer {
    background-color: #17171b !important;
  }
  .el-form-item__label {
    color: #ffffff;
  }
  .el-input__inner {
    background-color: #17171b;
  }
}

</style>

<style lang="less" scoped>
@rem: 1920/100rem;
#app {
  // background-color: #304156;
  background-color: #1d2027;
  height: 100vh;
  box-sizing: border-box;
  padding-left: 30 / @rem;
  padding-top: 30 / @rem;
  padding-right: 30 / @rem;
  .tablee {
    margin-top: 20 / @rem;
  }
}
</style>
