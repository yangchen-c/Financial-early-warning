<template>
  <div id="app">
    <div class="btn">
      <el-input
        v-model="input"
        prefix-icon="el-icon-search"
        placeholder="搜索网点名称"
        clearable
        style="width:230px;"
        class="inputR"
      />
      <el-select v-model="value" clearable placeholder="请选择网点类型" class="selectR">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="warning" round>查询</el-button>
      <el-button type="primary" size="small" round style="margin-left:850px" @click="add">新建</el-button>
      <el-button type="primary" size="small" round>导入数据</el-button>
      <el-button type="primary" size="small" round>导出数据</el-button>
    </div>
    <div class="tablee">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" type="index" label="序号" width="50" />
        <el-table-column align="center" prop="name" label="网点名称" />
        <el-table-column align="center" prop="phone" label="所属上级" />
        <el-table-column align="center" prop="address" label="网点类型" />
        <el-table-column align="center" prop="address" label="添加时间" />
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
          <el-form-item label="所属上级" :label-width="formLabelWidth">
            <el-select v-model="form.store.id" clearable placeholder="选择所属上级" style="width:400px">
              <el-option
                v-for="item in optionsShop"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="网点类型" :label-width="formLabelWidth">
            <el-select
              v-model="form.classify.id"
              clearable
              placeholder="选择网点类型"
              style="width:400px"
            >
              <el-option
                v-for="item in optionsCombo"
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
      <el-pagination
        :current-page="currentPage4"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Customer',

  components: {},
  data() {
    return {
      currentPage4: 1,
      dialogFormVisible: false,
      formLabelWidth: '100px',
      title1: '',
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
          label: 'ATM机'
        },
        {
          value: '选项2',
          label: '前台'
        }
      ],
      value: '',
      input: '',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }
      ]
    }
  },
  created() {},
  methods: {
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
