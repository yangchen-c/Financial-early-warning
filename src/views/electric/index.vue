<template>
  <div id="app">
    <div class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first">
          <div class="btn">
            <el-select v-model="value" clearable placeholder="请选择网点" class="selectR">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-button type="warning" round>查询</el-button>
          </div>
          <div class="cardOne">
            <div class="cardOne1">1</div>
            <div class="cardOne1">2</div>
            <div class="cardOne1">3</div>
          </div>
          <div class="cardTwo">
            <div class="cardTwo1">
              <columnar />
            </div>
            <div class="cardTwo1">2</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="处理记录" name="second">处理记录</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import columnar from '@/components/Echarts/columnar.vue'
export default {
  components: {
    columnar
  },
  data() {
    return {
      activeName: 'first',
      value: '',
      options: [
        {
          value: '选项1',
          label: 'ATM机'
        },
        {
          value: '选项2',
          label: '前台'
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
  .cardOne {
    display: flex;
    .cardOne1 {
      width: 573 / @rem;
      height: 230 / @rem;
      background-color: #fff;
      // background: rgba(23, 23, 27, 1);
      margin-right: 30 / @rem;
      margin-top: 30 / @rem;
      border-radius: 30 / @rem;
    }
  }
  .cardTwo {
    display: flex;
    .cardTwo1 {
      width: 874 / @rem;
      height: 566 / @rem;
      // background-color: #fff;
      background: rgba(23, 23, 27, 1);
      margin-right: 30 / @rem;
      margin-top: 30 / @rem;
      border-radius: 30 / @rem;
    }
  }
}
</style>
