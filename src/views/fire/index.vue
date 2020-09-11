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
      <el-select v-model="value" clearable placeholder="选择单位" class="selectR">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="value" clearable placeholder="选择网点" class="selectR">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="value" clearable placeholder="报警级别" class="selectR">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="value" clearable placeholder="处置状态" class="selectR">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="btn2">
      <el-select v-model="value" clearable placeholder="报警部位" class="selectR">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="value" clearable placeholder="报警类型" class="selectR">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="value" clearable placeholder="用户" class="selectR">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="warning" round>查询</el-button>
      <el-button type="danger" round @click="dialogTableVisible = true">处理记录</el-button>
    </div>
    <div class="tablee">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" type="index" label="序号" width="50" />
        <el-table-column align="center" prop="fireLevel" label="级别" />
        <el-table-column align="center" prop="cla" label="部门" />
        <el-table-column align="center" prop="name" label="网点名称" />
        <el-table-column align="center" prop="lx" label="网点类型" />
        <el-table-column align="center" prop="bw" label="报警部位" />
        <el-table-column align="center" prop="sb" label="报警设备" />
        <el-table-column align="center" prop="date" label="报警日期" />
        <el-table-column align="center" prop="state" label="报警类型">
          <template slot-scope="scope">
            <span v-if="scope.row.state == '1'" style="color:#67C23A">人员</span>
            <span v-if="scope.row.state == '2'">车辆</span>
            <span v-if="scope.row.state == '3'">警戒区域</span>
            <span v-if="scope.row.state == '4'">行为检测</span>
            <span v-if="scope.row.state == '5'">疫情防控</span>
            <span v-if="scope.row.state == '6'">断电告警</span>
            <span v-if="scope.row.state == '7'">消防告警</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="fireDisposal" label="处置状态">
          <template slot-scope="scope">
            <span v-if="scope.row.fireDisposal == '0'" style="color:#DC143C">未处置</span>
            <span v-if="scope.row.fireDisposal == '1'" style="color:#67C23A">已处置</span>
          </template>
        </el-table-column>
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
    <div class="dialog">
      <el-dialog title="危险报警" :visible.sync="dialogTableVisible" width="70%">
        <el-table :data="gridData">
          <el-table-column align="center" type="index" label="序号" width="50" />
          <el-table-column align="center" prop="lv" label="级别" />
          <el-table-column align="center" prop="cla" label="部门" />
          <el-table-column align="center" prop="name" label="网点名称" />
          <el-table-column align="center" prop="lx" label="网点类型" />
          <el-table-column align="center" prop="bw" label="报警部位" />
          <el-table-column align="center" prop="sb" label="报警设备" />
          <el-table-column align="center" prop="date" label="报警日期" />
          <el-table-column align="center" prop="bjlx" label="报警类型" />
          <el-table-column align="center" prop="state" label="处置状态" />
        </el-table>
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
      </el-dialog>
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
  data() {
    return {
      value1: '',
      // 分页
      currentPage4: 1,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      value: '',
      dialogTableVisible: false,
      options: [
        {
          value: '选项1',
          label: '1'
        },
        {
          value: '选项2',
          label: '2'
        }
      ],
      tableData: [],
      gridData: [
        {
          lv: '一级',
          cla: '安防',
          state: '处理',
          lx: '自助银行',
          bw: 'ATM机',
          sb: '报警器',
          bjlx: '火警',
          date: '2016-05-02',
          name: '唐山支行'
        }
      ]
    }
  },
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
      color: #f00000;
      font-size: 60 / @rem;
      display: flex;
      justify-content: center;
      align-items: center;
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
  // height: 100vh;
  box-sizing: border-box;
  padding-left: 50 / @rem;
  padding-top: 30 / @rem;
  padding-right: 30 / @rem;
  .btn2 {
    margin-top: 20 / @rem;
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
