<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.username" clearable class="filter-item" style="width: 200px;" placeholder="请输入用户名"/>
      <el-input v-model="listQuery.mobile" clearable class="filter-item" style="width: 200px;" placeholder="请输入手机号"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button> -->
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" width="100" label="用户ID" prop="id" sortable />

      <el-table-column align="center" label="用户名" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="头像" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" width="60">
        </template>
      </el-table-column>

      <el-table-column align="center" label="手机号码" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="身份证号" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.idCard }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户佣金">
        <template slot-scope="scope">
          <span>{{ scope.row.commission }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户股份数量">
        <template slot-scope="scope">
          <span>{{ scope.row.shareNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="消费券">
        <template slot-scope="scope">
          <span>{{ scope.row.consumptionVolume }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户身份">
        <template slot-scope="scope">
          <span>{{ scope.row.type | userTypeFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="上级推荐人">
        <template slot-scope="scope">
          <span>{{ scope.row.lastUserId }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="已返回佣金">
        <template slot-scope="scope">
          <span>{{ scope.row.returnCommission }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="累积消费金额">
        <template slot-scope="scope">
          <span>{{ scope.row.expenditure }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="直享成员数量">
        <template slot-scope="scope">
          <span>{{ scope.row.primaryDistributionNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="帮扶成员数量">
        <template slot-scope="scope">
          <span>{{ scope.row.secondaryDistributionNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="归属体验店">
        <template slot-scope="scope">
          <span>{{ scope.row.store.id == 0 ? '--' : scope.row.store.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="银行卡预留手机号" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.bankPhone }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="银行卡号" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.bankCard }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="现住址" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.currentAddress }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="margin-left:50px;">
        <el-form-item label="用户身份" prop="type">
          <el-select v-model="dataForm.type" clearable>
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { userList, userUpdate, userDelete } from '@/api/api'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'User',
  components: { Pagination },
  filters: {
    userTypeFilter(status) {
      const statusMap = {
        0: '普通用户',
        1: '消费商',
        2: '合伙人',
        3: '体验店',
        4: '代理商'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
        // username: undefined,
        // mobile: undefined
      },
      dataForm: {
        id: undefined,
        type: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '添加'
      },
      options: [
        {
          id: 0,
          name: '普通用户'
        },
        {
          id: 1,
          name: '消费商'
        },
        {
          id: 2,
          name: '合伙人'
        },
        {
          id: 3,
          name: '体验店'
        },
        {
          id: 4,
          name: '代理商'
        }
      ],
      rules: {
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      const params = {
        page: this.listQuery.page,
        size: this.listQuery.limit
      }
      userList(params).then(response => {
        this.list = response.data.data.currentList
        this.total = response.data.data.totalRecords
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    // resetForm() {
    //   this.dataForm = {
    //     id: undefined,
    //     type: undefined
    //   }
    // },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleUpdate(row) {
      this.dataForm = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(row) {
      const params = {
        id: row.id
      }
      userDelete(params)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
          this.getList()
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.message
          })
        })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const temp = Object.assign({}, this.dataForm)
          userUpdate(temp)
            .then(() => {
              this.dialogFormVisible = false
              this.$notify.success({
                title: '成功',
                message: '修改成功'
              })
              this.getList()
            })
            .catch(response => {
              this.$notify.error({
                title: '失败',
                message: response.data.message
              })
            })
        }
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['用户ID', '用户名', '手机号码', '身份证号', '用户佣金', '用户股份数量', '消费券', '用户身份', '上级推荐人', '已返回佣金', '累积消费金额', '直享成员数量', '帮扶成员数量', '银行卡预留手机号', '银行卡号', '现住址']
        const filterVal = ['id', 'name', 'phone', 'idCard', 'commission', 'shareNumber', 'consumptionVolume', 'type', 'lastUserId', 'returnCommission', 'expenditure', 'primaryDistributionNumber', 'secondaryDistributionNumber', 'bankPhone', 'bankCard', 'currentAddress']
        excel.export_json_to_excel2(tHeader, this.list, filterVal, '用户信息')
        this.downloadLoading = false
      })
    }
  }
}
</script>
