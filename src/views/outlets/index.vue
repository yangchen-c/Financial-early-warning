<template>
  <div id="app">
    <div class="btn">
      <el-input
        v-model="valueName"
        prefix-icon="el-icon-search"
        placeholder="搜索网点名称"
        clearable
        style="width:230px;"
        class="inputR"
      />
      <el-select v-model="value" clearable placeholder="请选择网点类型" class="selectR">
        <el-option v-for="item in optionsType" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-button type="warning" round @click="getList()">查询</el-button>
      <el-button type="primary" size="small" round style="margin-left:850px" @click="add">新建</el-button>
      <el-button type="primary" size="small" round>导入数据</el-button>
      <el-button type="primary" size="small" round @click="handleDownload">导出数据</el-button>
    </div>
    <div class="tablee">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" type="index" label="序号" width="50" />
        <el-table-column align="center" prop="name" label="网点名称" />
        <el-table-column align="center" prop="director" label="主管单位" />
        <el-table-column align="center" prop="type.name" label="网点类型" />
        <el-table-column align="center" prop="createTime" label="添加时间" />
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
          <el-form-item label="网点名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" placeholder="请输入网点名称" style="width:400px" />
          </el-form-item>
          <el-form-item label="主管单位" :label-width="formLabelWidth">
            <el-input v-model="form.director" placeholder="请输入主管单位" style="width:400px" />
          </el-form-item>
          <!-- <el-form-item label="所属上级" :label-width="formLabelWidth">
            <el-select v-model="form.store.id" clearable placeholder="选择所属上级" style="width:400px">
              <el-option
                v-for="item in optionsShop"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>-->
          <el-form-item label="网点类型" :label-width="formLabelWidth">
            <el-select v-model="form.type.id" clearable placeholder="选择网点类型" style="width:400px">
              <el-option
                v-for="item in optionsType"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="page">
      <!-- 分页 -->
      <el-pagination
        :current-page="currentPage4"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <!-- <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />-->
    </div>
  </div>
</template>

<script>
import {
  branchesTypeList,
  branchesList,
  branchesAdd,
  branchesUpdate,
  branchesDelete
} from '@/api/api'

export default {
  name: 'Branches',

  // components: { Pagination },
  data() {
    return {
      // 分页
      currentPage4: 1,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      dialogFormVisible: false,
      formLabelWidth: '100px',
      title1: '',
      // 表单数据
      // optionsShop: [],
      optionsType: [], // 网点类型
      form: {
        id: '',
        name: '',
        director: '',
        type: {
          id: '',
          name: ''
        }
      },
      value: '',
      valueName: '',
      input: '',
      tableData: [] // 表格数据
    }
  },
  created() {
    this.getList()
    this.getTypeList()
  },
  methods: {
    // 获取数据
    getList() {
      const params = {
        page: this.listQuery.page,
        size: this.listQuery.limit
      }
      const params1 = {
        // name: this.name !== '' ? this.name : undefined
        name: this.valueName !== '' ? this.valueName : undefined
      }
      branchesList(params, params1)
        .then((response) => {
          this.tableData = response.data.data.currentList
          this.total = response.data.data.totalRecords
        })
        .catch(() => {
          this.tableData = []
        })
    },
    // 获取网点类型数据
    getTypeList() {
      branchesTypeList()
        .then((response) => {
          this.optionsType = response.data.data
        })
        .catch(() => {
          this.optionsType = []
        })
    },
    // 新增
    add() {
      this.dialogFormVisible = true
      this.title1 = '新建网点类型'
      this.form.id = ''
      this.form.name = ''
      this.form.director = ''
      this.form.type.id = ''
      this.form.type.name = ''
    },
    // 编辑
    getEditData(data) {
      this.dialogFormVisible = true
      this.title1 = '编辑网点类型'
      this.form.id = data.id
      this.form.name = data.name
      this.form.director = data.director
      this.form.type.id = data.type.id
      this.form.type.name = data.type.name
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
          branchesDelete(params)
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
        branchesUpdate(this.form)
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
        branchesAdd(this.form)
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
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    // 导出表格
    handleDownload() {
      //   this.downloadLoading = true
      import('@/vendor/Export2Excel').then((excel) => {
        const tHeader = [
          'ID',
          '网点名称',
          '网点类型',
          '添加时间'
        ]
        const filterVal = [
          'id',
          'name',
          'type.name',
          'createTime'
        ]
        excel.export_json_to_excel2(
          tHeader,
          this.tableData,
          filterVal,
          '网点信息'
        )
        this.downloadLoading = false
      })
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

// 分页样式----------------------------------------------
.page {
  .el-pagination__total {
    color: #ffffff;
  }
  .el-input__inner {
    background-color: #fff;
  }
  .el-pagination__jump {
    color: #ffffff;
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
    // margin-right: 20 / @rem;
  }
  .page {
    display: flex;
    .el-pagination {
      margin-left: auto;
      margin-top: 30 / @rem;
    }
  }
}
</style>
