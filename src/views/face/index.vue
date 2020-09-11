<template>
  <div id="app">
    <div class="btn">
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
      <el-button type="warning" round>查询</el-button>
    </div>
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="预警" name="first">
          <div class="btnOne">
            <div class="btnTwo">
              <el-button type="primary" size="small" round>添加</el-button>
              <el-button type="danger" size="small" round>导出数据</el-button>
            </div>
          </div>
          <div class="tablee">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column align="center" type="index" label="序号" width="50" />
              <el-table-column align="center" prop="faceName" label="姓名" width="100" />
              <el-table-column align="center" prop="faceGender" label="性别" width="50" />
              <el-table-column align="center" prop="faceIdNumber" label="身份证号" />
              <el-table-column align="center" prop="faceHometown" label="籍贯" />
              <el-table-column align="center" prop="address" label="网点名称" />
              <el-table-column align="center" prop="date" label="抓拍时间" />
              <el-table-column align="center" prop="faceImage" label="抓拍照片" width="200">
                <template slot-scope="scope">
                  <img :src="scope.row.faceImage" alt style="width:50px;height:50px">
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    icon="el-icon-s-order"
                    type="primary"
                    round
                    @click="getEditData(scope.row)"
                  >详情</el-button>
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
          <!-- 分页----------------------------------------------- -->
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
        <el-tab-pane label="重点人员" name="second">
          <div class="btnOne">
            <div class="btnTwo">
              <el-button type="primary" size="small" round @click="add1">添加</el-button>
              <el-button type="danger" size="small" round>导出数据</el-button>
            </div>
          </div>
          <div class="tablee">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column align="center" type="index" label="序号" width="50" />
              <el-table-column align="center" prop="name" label="姓名" width="100" />
              <el-table-column align="center" prop="sex" label="性别" width="50" />
              <el-table-column align="center" prop="idCard" label="身份证号" />
              <el-table-column align="center" prop="address" label="籍贯" />
              <el-table-column align="center" prop="date" label="录入时间" />
              <el-table-column align="center" prop="photo" label="对比照片" />
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    icon="el-icon-s-order"
                    type="primary"
                    round
                    @click="getEditData1(scope.row)"
                  >修改</el-button>
                  <el-button
                    size="mini"
                    icon="el-icon-delete"
                    type="danger"
                    round
                    @click="delData1(scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 分页----------------------------------------------- -->
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
          <!-- dialog弹出框 -->
          <div class="dialog">
            <el-dialog :title="title1" :visible.sync="dialogFormVisible1" width="25%">
              <el-form :model="form">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                  <el-input v-model="form.name" placeholder="请输入姓名" style="width:300px" />
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                  <el-select v-model="value" clearable placeholder="选择性别" style="width:300px">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="身份证" :label-width="formLabelWidth">
                  <el-input v-model="form.name" placeholder="请输入身份证" style="width:300px" />
                </el-form-item>
                <el-form-item label="籍贯" :label-width="formLabelWidth">
                  <el-input v-model="form.name" placeholder="请输入籍贯" style="width:300px" />
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="addSubmit1">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  warningList,
  warningAdd,
  warningUpdate,
  warningDelete
} from '@/api/api'
export default {
  name: 'Customer',
  data() {
    return {
      // 分页
      currentPage4: 1,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      dialogFormVisible1: false,
      formLabelWidth: '70px',
      title1: '',
      value1: '',
      value: '',
      activeName: 'first',
      // 表格数据
      optionsShop: [],
      optionsCombo: [],
      form: {
        name: '',
        classify: {
          id: '',
          name: '',
          paper: ''
        },
        store: {
          id: '',
          name: ''
        }
      },
      options: [
        {
          value: '选项1',
          label: '男'
        },
        {
          value: '选项2',
          label: '女'
        }
      ],
      tableData: []
    }
  },
  computed: {},
  created() {
    this.getList()
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
      warningList(params, params1)
        .then((response) => {
          this.tableData = response.data.data.currentList
          this.total = response.data.data.totalRecords
        })
        .catch(() => {
          this.tableData = []
        })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // 新增
    add1() {
      console.log('新增')
      this.dialogFormVisible1 = true
      this.title1 = '新增重点人员'
    },
    // 预警详情
    getEditData(data) {
      console.log('预警详情')
      this.dialogFormVisible = true
      this.title1 = '预警人员信息'
    },
    // 删除预警
    delData(row) {
      console.log('删除预警')
    },
    // 编辑
    getEditData1(data) {
      console.log('编辑')
      this.dialogFormVisible1 = true
      this.title1 = '修改重点人员信息'
    },
    // 删除
    delData1(row) {
      console.log('删除')
    },
    // 编辑新增确定事件
    addSubmit1() {
      console.log('编辑新增确定')
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
  background-color: #1d2027;
  height: 100vh;
  box-sizing: border-box;
  padding-left: 30 / @rem;
  padding-top: 30 / @rem;
  padding-right: 30 / @rem;
  .tabs {
    margin-top: 20 / @rem;
    color: #fff;
  }
  .btnOne {
    display: flex;
    .btnTwo {
      margin-left: auto;
    }
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
