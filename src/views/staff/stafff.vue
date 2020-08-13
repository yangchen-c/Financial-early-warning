<template>
  <div id="app">
    <div class="btn">
      <el-button type="primary" @click="addShop">新建</el-button>
      <el-input
        v-model="name"
        placeholder="请输入员工名称"
        clearable
        style="width:180px;margin-left:200px"
      />
      <el-button type="primary" @click="getList()">搜索</el-button>
    </div>
    <div class="tablee">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" label="序号" width="50" type="index">
          <!-- <template slot-scope="scope">
            <span>{{ scope.$index+(page - 1) * limit + 1 }}</span>
          </template> -->
        </el-table-column>
        <!-- <el-table-column align="center" prop="id" label="ID" width="50" /> -->
        <el-table-column align="center" prop="name" label="员工名称" />
        <el-table-column align="center" prop="phone" label="联系方式" />
        <el-table-column align="center" prop="position.name" label="职位" />
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-document-copy"
              type="primary"
              @click="getEditData(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              icon="el-icon-delete"
              type="danger"
              @click="delData(scope.row)"
            >删除</el-button>
            <el-button size="mini" icon="el-icon-user" type="success" @click="jump(scope.row.id)">工资</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- dialog弹出框 -->
    <el-dialog :title="title1" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="员工名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入职位名称" style="width:400px" />
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="form.phone" placeholder="请输入联系方式" style="width:400px" />
        </el-form-item>
        <el-form-item label="员工职位" :label-width="formLabelWidth">
          <!-- <el-input placeholder="请输入职位名称" style="width:400px" /> -->
          <el-select
            v-model="form.position.id"
            clearable
            placeholder="请选择"
            @change="changeOrder($event)"
          >
            <el-option
              v-for="item in tableData1"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属门店" :label-width="formLabelWidth">
          <!-- @change="changeOrder($event)" -->
          <el-select
            v-model="form.store.id"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in optionsShop"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="底薪" :label-width="formLabelWidth">
          <el-input v-model="form.salary" placeholder="请输入底薪" style="width:400px" />
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
import {
  shopList,
  positionList,
  staffList,
  staffAdd,
  staffUpdate,
  staffDelete
} from '@/api/api'

export default {
  name: 'Stafff',
  data() {
    return {
      btnLoading: false,
      name: '', // 门店名称
      title1: '',
      // 表格数据
      tableData: [],
      tableData1: [],
      optionsShop: [], // 门店数据
      dialogFormVisible: false,
      form: {
        name: '',
        id: '',
        phone: '',
        salary: '',
        position: {
          id: ''
        },
        store: {
          id: '',
          name: ''
        }
      },
      formLabelWidth: '100px'
    }
  },
  created() {
    this.getList()
    this.getPositionList()
    this.getShopList()
  },
  methods: {
    // select下拉事件
    changeOrder(val) {
      // console.log(val)
    },
    // 获取职位
    getPositionList() {
      positionList()
        .then((response) => {
          this.tableData1 = response.data.data
        })
        .catch(() => {
          this.tableData1 = []
        })
    },
    // 获取门店数据
    getShopList() {
      shopList()
        .then((response) => {
          this.optionsShop = response.data.data
        })
        .catch(() => {
          this.optionsShop = []
        })
    },
    // 获取数据
    getList() {
      staffList({ name: this.name })
        .then((response) => {
          this.tableData = response.data.data
        })
        .catch(() => {
          this.tableData = []
        })
    },
    // 新建
    addShop() {
      this.dialogFormVisible = true
      this.form.name = ''
      this.title1 = '新增职位'
      this.form.id = ''
      this.form.phone = ''
      this.form.salary = ''
      this.form.position.id = ''
      this.form.store.id = ''
      this.form.store.name = ''
    },
    // 编辑
    getEditData(data) {
      this.dialogFormVisible = true
      this.form.name = data.name
      this.title1 = '编辑职位'
      this.form.id = data.id
      this.form.phone = data.phone
      this.form.salary = data.salary
      this.form.position.id = data.position.id
      this.form.store.id = data.store.id
      this.form.store.name = data.store.name
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
    // 工资跳转
    jump(id) {
      console.log(id)
      this.$router.push({ name: 'wages', params: { id: id }})
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
