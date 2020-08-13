<template>
  <div id="app">
    <div class="btn">
      <!-- <el-cascader :options="options" clearable placeholder="请选择员工" /> -->
      <el-select v-model="value" clearable placeholder="请选择门店" @change="changeOrder($event)">
        <el-option v-for="item in optionsShop" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="valueStaff" clearable placeholder="请选择员工" @change="changeStaff($event)">
        <el-option v-for="item in optionsStaff" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-date-picker v-model="value1" type="date" placeholder="选择开始日期" />
      <el-date-picker v-model="value2" type="date" placeholder="选择日期" />
      <el-button type="primary" @click="search">查询</el-button>
    </div>
    <div class="tablee">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" type="index" label="序号" width="50" />
        <!-- <el-table-column align="center" prop label="员工名称">
          <template>
            <span>{{ valueStaff }}</span>
          </template>
        </el-table-column> -->
        <el-table-column align="center" prop="time1" label="上班打卡时间" />
        <el-table-column align="center" prop="time2" label="下班打卡时间" />
      </el-table>
    </div>
  </div>
</template>

<script>
import { staffList, shopList, workList } from '@/api/api'
export default {
  name: 'Work',
  data() {
    return {
      value1: '',
      value2: new Date(),
      workTime1: '',
      workTime2: '',
      options: [],
      optionsShop: [],
      optionsStaff: [],
      optionsStaffAll: [],
      value: '',
      valueStaff: '',
      staffId: '',
      storeId: '',
      // options: [
      //   {
      //     value: 'zhinan',
      //     label: '指南',
      //     children: [
      //       {
      //         value: 'shejiyuanze',
      //         label: '设计原则'
      //       },
      //       {
      //         value: 'daohang',
      //         label: '导航'
      //       }
      //     ]
      //   }
      // ],
      tableData: []
    }
  },
  created() {
    this.getList()
    this.getShopList()
    this.getStaffList()
  },
  methods: {
    search() {
      this.workTime1 =
        this.value1.getFullYear() +
        '-' +
        (this.value1.getMonth() + 1 < 10
          ? '0' + (this.value1.getMonth() + 1)
          : this.value1.getMonth() + 1) +
        '-' +
        (this.value1.getDate() < 10
          ? '0' + this.value1.getDate()
          : this.value1.getDate()) +
        ' ' +
        '00' +
        ':' +
        '00' +
        ':' +
        '00'
      this.workTime2 =
        this.value2.getFullYear() +
        '-' +
        (this.value2.getMonth() + 1 < 10
          ? '0' + (this.value2.getMonth() + 1)
          : this.value2.getMonth() + 1) +
        '-' +
        (this.value2.getDate() < 10
          ? '0' + this.value2.getDate()
          : this.value2.getDate()) +
        ' ' +
        '23' +
        ':' +
        '59' +
        ':' +
        '59'
      console.log(this.workTime1)
      console.log(this.workTime2)
      this.getList()
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
    // select下拉门店
    changeOrder(val) {
      this.storeId = val
      // console.log(this.storeId)
      this.getStaffList()
    },
    // select下拉员工
    changeStaff(val) {
      this.staffId = val
    },
    // 获取员工数据
    getStaffList() {
      staffList()
        .then((response) => {
          this.optionsStaffAll = response.data.data
          this.optionsStaff = this.optionsStaffAll.filter((el) => el.store.id === this.storeId)
        })
        .catch(() => {
          this.optionsStaff = []
        })
    },
    // 获取数据
    getList() {
      const data = {
        staffId: this.staffId,
        workDateFrom: this.workTime1,
        workDateTo: this.workTime2,
        offset: 0
      }
      workList(data)
        .then((response) => {
          this.tableData = response.data.data
        })
        .catch(() => {
          this.tableData = []
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
