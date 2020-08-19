<template>
  <div id="app">
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="实时监测" name="first">
          <div class="tablee">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column align="center" type="index" label="序号" width="50" />
              <el-table-column align="center" prop="name" label="网点名称" />
              <el-table-column align="center" prop="date" label="市断电时间" />
              <el-table-column align="center" prop="date" label="市电供电正常时间" />
            </el-table>
          </div>
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
        <el-tab-pane label="检测记录" name="second">
          <div class="btn">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
            <el-button type="warning" round>查询</el-button>
            <el-button type="danger" round style="margin-left:1050px">导出数据</el-button>
          </div>
          <div class="tablee">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column align="center" type="index" label="序号" width="50" />
              <el-table-column align="center" prop="name" label="网点名称" />
              <el-table-column align="center" prop="date" label="市断电时间" />
              <el-table-column align="center" prop="date" label="市电供电正常时间" />
            </el-table>
          </div>
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
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎'
        }
      ]
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
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
