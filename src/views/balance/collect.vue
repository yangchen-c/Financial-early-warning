<template>
  <div id="app">
    <div class="money">
      <span>总支出：11111元</span>
    </div>
    <div class="btn">
      <el-button type="primary" @click="addShop">新建</el-button>
      <el-date-picker
        v-model="value2"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
        :picker-options="pickerOptions"
        @change="ctime"
      />
      <el-button @click="handleDownload">导出表格</el-button>
      <el-input
        v-model="name"
        placeholder="请输入门店名称"
        clearable
        style="width:180px;margin-left:100px"
      />
      <el-button type="primary" @click="getList()">搜索</el-button>
    </div>
    <div class="tablee">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" prop="id" label="ID" width="50" />
        <el-table-column align="center" prop="name" label="姓名" />
        <el-table-column align="center" prop="price" label="金额" />
        <el-table-column align="center" prop="useTime" label="时间" />
        <el-table-column align="center" prop="remark" label="用途" />
        <el-table-column align="center" prop="voucher" label="凭证" width="200">
          <template slot-scope="scope">
            <img :src="scope.row.voucher" alt style="width:50px;height:50px">
          </template>
        </el-table-column>
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
    <el-dialog :title="title1" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入姓名" style="width:400px" />
        </el-form-item>
        <el-form-item label="金额" :label-width="formLabelWidth">
          <el-input v-model="form.price" placeholder="请输入金额" style="width:400px" />
        </el-form-item>
        <el-form-item label="时间" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.useTime" placeholder="请输入时间" style="width:400px" /> -->
          <el-date-picker
            v-model="form.useTime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="用途" :label-width="formLabelWidth">
          <el-input v-model="form.remark" placeholder="请输入用途" style="width:400px" />
        </el-form-item>
        <el-form-item label="凭证" :label-width="formLabelWidth">
          <el-upload
            :headers="headers"
            :action="uploadPath"
            :show-file-list="false"
            :on-success="uploadUrl"
            :before-upload="checkFileSize"
            class="avatar-uploader"
            accept=".jpg, .jpeg, .png"
          >
            <img v-if="form.voucher" :src="form.voucher" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1024kb</div>
          </el-upload>
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
  balanceList,
  balanceAdd,
  balanceUpdate,
  balanceDelete,
  uploadPath
} from '@/api/api'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      uploadPath,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value2: '',
      name: '',
      btnLoading: false,
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: '',
        price: '',
        useTime: '',
        remark: '',
        voucher: ''
      },
      formLabelWidth: '220px',
      title1: '',
      options: [
        {
          value: '选项1',
          label: '收入'
        },
        {
          value: '选项2',
          label: '支出'
        }
      ],
      value: ''
    }
  },
  computed: {
    headers() {
      return {
        token: getToken()
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    ctime() {
      console.log(this.value2[0])
      console.log(this.value2[1])
    },
    // 文件上传
    uploadUrl: function(response) {
      console.log(response)
      this.form.voucher = response.data
    },
    checkFileSize: function(file) {
      if (file.size > 1048576) {
        this.$message.error(
          `${file.name}文件大于1024KB，请选择小于1024KB大小的图片`
        )
        return false
      }
      return true
    },
    // 获取数据
    getList() {
      balanceList({ name: this.name })
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
      this.form.id = ''
      this.form.price = ''
      this.form.useTime = ''
      this.form.voucher = ''
      this.form.remark = ''
      this.title1 = '新增收支'
    },
    // 编辑
    getEditData(data) {
      // console.log(this.form.id)
      this.form.id = data.id
      this.dialogFormVisible = true
      this.form.name = data.name
      this.form.price = data.price
      this.form.useTime = data.useTime
      this.form.remark = data.remark
      this.form.voucher = data.voucher
      this.title1 = '编辑收支'
    },
    // 编辑新增确定事件
    addSubmit() {
      // this.btnLoading = true
      if (this.form.id) {
        balanceUpdate(this.form)
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
        balanceAdd(this.form)
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
          balanceDelete(params)
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
    // 导出表格
    handleDownload() {
    //   this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['ID', '姓名', '金额', '时间', '用途', '凭证']
        const filterVal = ['id', 'name', 'price', 'useTime', 'remark', 'voucher']
        excel.export_json_to_excel2(tHeader, this.tableData, filterVal, '支出明细')
        this.downloadLoading = false
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
  .money {
    span {
      margin-right: 50 / @rem;
    }
  }
  .btn {
    margin-top: 20 / @rem;
  }
  .tablee {
    margin-top: 20 / @rem;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 145px;
    height: 145px;
    display: block;
  }
}
</style>
