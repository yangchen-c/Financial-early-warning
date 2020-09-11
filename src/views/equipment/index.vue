<template>
  <div id="app">
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="自动巡检" name="first">
          <div class="btn">
            <el-select v-model="value" clearable placeholder="请选择网点" class="selectR">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="value" clearable placeholder="请选择设备" class="selectR">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <!-- <el-button type="warning" round>查询</el-button> -->
            <el-button type="warning" round @click="add">新增</el-button>
            <el-button type="primary" round style="margin-left:800px">打印</el-button>
            <el-button type="danger" round>导出Excel</el-button>
            <el-button type="danger" round>导出HTML</el-button>
          </div>
          <div class="tablee">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column align="center" type="index" label="序号" width="50" />
              <el-table-column align="center" prop="branches.name" label="网点名称" />
              <el-table-column align="center" prop="name" label="设备名称" />
              <el-table-column align="center" prop="number" label="设备IP" />
              <el-table-column align="center" prop="parts" label="安装部位" />
              <el-table-column align="center" prop="state" label="主机状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.state == '0'" style="color:#67C23A">正常</span>
                  <span v-if="scope.row.state == '1'" style="color:#4B0082">异常</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="createTime" label="更新时间" />
              <el-table-column align="center" prop="state" label="在线状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.state == '0'" style="color:#67C23A">在线</span>
                  <span v-if="scope.row.state == '1'" style="color:#4B0082">不在线</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="state" label="检查">
                <template slot-scope="scope">
                  <span v-if="scope.row.state == '0'" style="color:#67C23A">检查</span>
                  <span v-if="scope.row.state == '1'" style="color:#4B0082">故障</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="200">
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
                  <el-select
                    v-model="form.branches.id"
                    clearable
                    placeholder="选择网点"
                    style="width:400px"
                  >
                    <el-option
                      v-for="item in optionsType"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="设备名称" :label-width="formLabelWidth">
                  <el-input v-model="form.name" placeholder="请输入网点名称" style="width:400px" />
                </el-form-item>
                <el-form-item label="设备IP" :label-width="formLabelWidth">
                  <el-input v-model="form.director" placeholder="请输入主管单位" style="width:400px" />
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addSubmit">确 定</el-button>
              </div>
            </el-dialog>
          </div>
          <!-- 分页 -->
          <div class="page">
            <el-pagination
              :current-page="currentPage4"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="二维码巡检" name="second">
          <div class="btn">
            <el-select v-model="value" clearable placeholder="请选择网点" class="selectR">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="value" clearable placeholder="请选择设备" class="selectR">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-button type="warning" round>查询</el-button>
            <el-button type="primary" round style="margin-left:800px">打印</el-button>
            <el-button type="danger" round>导出Excel</el-button>
            <el-button type="danger" round>导出HTML</el-button>
          </div>
          <div class="tablee">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column align="center" type="index" label="序号" width="50" />
              <el-table-column align="center" prop="name" label="网点名称" />
              <el-table-column align="center" prop="name" label="设备名称" />
              <el-table-column align="center" prop="name" label="巡检人" />
              <el-table-column align="center" prop="address" label="电话" />
              <el-table-column align="center" prop="num" label="设备状态" />
              <el-table-column align="center" prop="num" label="巡检时间" />
              <el-table-column align="center" prop="num" label="上传照片" />
              <el-table-column align="center" prop="num" label="设备二维码" />
            </el-table>
          </div>
          <div class="page">
            <el-pagination
              :current-page="currentPage4"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  deviceList,
  branchesList1,
  deviceAdd,
  deviceUpdate,
  deviceDelete
} from '@/api/api'
export default {
  data() {
    return {
      form: {
        id: '',
        name: '',
        director: '',
        branches: {
          id: '',
          name: ''
        }
      },
      // 分页
      currentPage4: 1,
      total: 0,
      title1: '',
      listQuery: {
        page: 1,
        limit: 10
      },
      dialogFormVisible: false,
      formLabelWidth: '100px',
      activeName: 'first',
      optionsType: [], // 网点
      options: [
        {
          value: '选项1',
          label: 'ATM机'
        },
        {
          value: '选项2',
          label: '前台'
        }
      ],
      value: '',
      tableData: []
    }
  },
  created() {
    this.getList()
    this.getBranchesList()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
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
      deviceList(params, params1)
        .then((response) => {
          this.tableData = response.data.data.currentList
          this.total = response.data.data.totalRecords
        })
        .catch(() => {
          this.tableData = []
        })
    },
    // 获取网点数据
    getBranchesList() {
      branchesList1()
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
      this.title1 = '新建设备'
      this.form.id = ''
      this.form.name = ''
      this.form.director = ''
      this.form.branches.id = ''
      this.form.branches.name = ''
    },
    // 编辑
    getEditData(data) {
      this.dialogFormVisible = true
      this.title1 = '编辑设备'
      this.form.id = data.id
      this.form.name = data.name
      this.form.director = data.director
      this.form.branches.id = data.branches.id
      this.form.branches.name = data.branches.name
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
          deviceDelete(params)
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
        deviceUpdate(this.form)
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
        deviceAdd(this.form)
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
  border: 1px solid #ffffff;
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
//tabs样式-----------------------------
.tabs {
  .el-tabs__nav .is-top {
    color: #fff;
  }
  .el-tabs__nav-wrap::after {
    background-color: #1d2027;
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
  background-color: #1d2027;
  // height: 100vh;
  box-sizing: border-box;
  padding-left: 50 / @rem;
  padding-top: 30 / @rem;
  padding-right: 30 / @rem;
  .tabs {
    color: #fff;
  }
  .tablee {
    margin-top: 20 / @rem;
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
