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
              <el-table-column align="center" prop="name" label="设备IP" />
              <el-table-column align="center" prop="address" label="安装部位" />
              <el-table-column align="center" prop="num" label="主机状态" />
              <el-table-column align="center" prop="num" label="更新时间" />
              <el-table-column align="center" prop="num" label="在线状态" />
              <el-table-column align="center" prop="num" label="检查" />
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
      tableData: [
        {
          num: '20',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          data: '2020-08-19'
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
