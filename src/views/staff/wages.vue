<template>
  <div id="app">
    <div class="btn">
      <el-select v-model="value" clearable placeholder="请选择员工">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-date-picker v-model="value1" type="date" placeholder="选择开始日期" />
      <el-date-picker v-model="value2" type="date" placeholder="选择日期" />
      <el-select v-model="valueState" clearable placeholder="请选择状态状态">
        <el-option
          v-for="item in optionsState"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary" @click="getList()">查询</el-button>
    </div>
    <div class="tablee">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" prop="id" label="ID" width="50" />
        <el-table-column align="center" prop="name" label="员工名称" />
        <el-table-column align="center" prop="salary" label="底薪" />
        <el-table-column align="center" prop="name" label="提成" />
        <el-table-column align="center" prop="name" label="结算时间" />
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
    <el-dialog title="编辑工资" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="工资调整" :label-width="formLabelWidth">
          <el-input v-model="form.salary" placeholder="请输入工资" style="width:400px" />
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
import { staffList, staffAdd, staffUpdate, staffDelete } from '@/api/api'

export default {
  name: 'Wages',
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '员工1'
        },
        {
          value: '选项2',
          label: '员工2'
        }
      ],
      optionsState: [
        {
          value: '选项1',
          label: '状态1'
        },
        {
          value: '选项2',
          label: '状态2'
        }
      ],
      value: '',
      valueState: '',
      value1: '',
      value2: new Date(),
      btnLoading: false,
      name: '', // 门店名称
      // 表格数据
      tableData: [],
      dialogFormVisible: false,
      form: {
        salary: ''
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
      staffList({ id: this.$route.params.id })
        .then((response) => {
          this.tableData = response.data.data
          // this.$route.query.id = ''
        })
        .catch(() => {
          this.tableData = []
        })
    },
    // 编辑
    getEditData(data) {
      this.dialogFormVisible = true
      this.form.name = data.name
      this.form.id = data.id
      this.form.phone = data.phone
      this.form.salary = data.salary
    },
    // 编辑新增确定事件
    addSubmit() {
      // this.btnLoading = true
      if (this.form.id) {
        staffUpdate(this.form)
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
        staffAdd(this.form)
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
          staffDelete(params)
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
}
</style>
