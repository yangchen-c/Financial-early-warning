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
          <div class="tablee">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column align="center" type="index" label="序号" width="50" />
              <el-table-column align="center" prop="name" label="姓名" />
              <el-table-column align="center" prop="sex" label="性别" />
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
              :total="400"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="重点人员" name="second">配置管理</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Customer',
  data() {
    return {
      currentPage4: 1,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      title1: '',
      value1: '',
      activeName: 'first',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          sex: '男',
          idCard: '140821202008140089',
          photo: '1'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          sex: '男',
          idCard: '140821202008140089',
          photo: '1'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          sex: '男',
          idCard: '140821202008140089',
          photo: '1'
        }
      ]
    }
  },
  computed: {},
  created() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // 新增
    add() {
      console.log('新增')
      this.dialogFormVisible = true
      this.title1 = '新建网点'
    },
    // 编辑
    getEditData(data) {
      console.log('编辑')
      this.dialogFormVisible = true
      this.title1 = '编辑网点'
    },
    // 删除
    delData(row) {
      console.log('删除')
    },
    // 编辑新增确定事件
    addSubmit() {
      console.log('编辑新增确定')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
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
