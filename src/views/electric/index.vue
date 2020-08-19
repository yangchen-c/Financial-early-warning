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
            <div class="cardOne1">
              <div class="cardl">
                <span class="cardlt">功率</span>
                <span class="cardlte">6000W</span>
              </div>
              <div class="cardr">
                <div class="cardrt">
                  <span class="span1" />
                  <span class="span2">已用配额：4000W</span>
                </div>
                <div class="cardrb">
                  <span class="span1" />
                  <span class="span2">未用配额：2000W</span>
                </div>
              </div>
            </div>
            <div class="cardOne1">
              <div class="cardl2">
                <img src="../../assets/tem1.png" alt>
              </div>
              <div class="cardr">
                <div class="cardrt1">
                  <span class="span1" />
                  <span class="span2">正常：220V</span>
                </div>
              </div>
            </div>
            <div class="cardOne1">
              <div class="cardl2">
                <img src="../../assets/shiliang.png" alt>
              </div>
              <div class="cardr">
                <div class="cardrt">
                  <span class="span2">用电量汇总：20KWH</span>
                </div>
                <div class="cardrb">
                  <span class="span2">今日用电量：20KWH</span>
                </div>
              </div>
            </div>
          </div>
          <div class="cardTwo">
            <div class="cardTwo1">
              <columnar />
            </div>
            <div class="cardTwo1">
              <div class="temperature">
                <div class="tem1">
                  <img src="../../assets/tem.png" alt>
                </div>
                <div class="tem2">
                  <div class="tem2t">高温报警 36°C</div>
                  <div class="tem2b">传感器位置：XXXXXXXXXX东南角传感器5号</div>
                </div>
                <div class="tem3">
                  <div class="tem3t">2020/06/11 17:07</div>
                  <div class="tem3b">处理</div>
                </div>
              </div>
              <div class="temperature">
                <div class="tem1">
                  <img src="../../assets/tem.png" alt>
                </div>
                <div class="tem2">
                  <div class="tem2t">高温报警 36°C</div>
                  <div class="tem2b">传感器位置：XXXXXXXXXX东南角传感器5号</div>
                </div>
                <div class="tem3">
                  <div class="tem3t">2020/06/11 17:07</div>
                  <div class="tem3b">处理</div>
                </div>
              </div>
              <div class="temperature">
                <div class="tem1">
                  <img src="../../assets/tem.png" alt>
                </div>
                <div class="tem2">
                  <div class="tem2t">高温报警 36°C</div>
                  <div class="tem2b">传感器位置：XXXXXXXXXX东南角传感器5号</div>
                </div>
                <div class="tem3">
                  <div class="tem3t">2020/06/11 17:07</div>
                  <div class="tem3b">处理</div>
                </div>
              </div>
              <div class="temperature">
                <div class="tem1">
                  <img src="../../assets/tem.png" alt>
                </div>
                <div class="tem2">
                  <div class="tem2t">高温报警 36°C</div>
                  <div class="tem2b">传感器位置：XXXXXXXXXX东南角传感器5号</div>
                </div>
                <div class="tem3">
                  <div class="tem3t">2020/06/11 17:07</div>
                  <div class="tem3b">处理</div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="处理记录" name="second">
          <div class="btn">
            <el-select v-model="value" clearable placeholder="请选择网点" class="selectR">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
            <el-button type="warning" round>查询</el-button>
          </div>
          <div class="tablee">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column align="center" type="index" label="序号" width="50" />
              <el-table-column align="center" prop="name" label="网点名称" />
              <el-table-column align="center" prop="address" label="报警类型" />
              <el-table-column align="center" prop="date" label="报警时间" />
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
import columnar from '@/components/Echarts/columnar.vue'
export default {
  components: {
    columnar
  },
  data() {
    return {
      activeName: 'first',
      value: '',
      value1: '',
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
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
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
  .cardOne {
    display: flex;
    .cardOne1 {
      width: 573 / @rem;
      height: 230 / @rem;
      background-color: #17181c;
      // background: rgba(23, 23, 27, 1);
      margin-right: 30 / @rem;
      margin-top: 30 / @rem;
      border-radius: 30 / @rem;
      display: flex;
      .cardl {
        width: 130 / @rem;
        height: 130 / @rem;
        border: 10 / @rem solid rgba(255, 204, 0, 1);
        box-shadow: 0px 0px 14px 0px rgba(255, 204, 0, 0.52);
        border-radius: 65 / @rem;
        margin-top: 50 / @rem;
        margin-left: 77 / @rem;
        .cardlt {
          display: block;
          margin-left: 36 / @rem;
          margin-top: 20 / @rem;
          font-size: 18 / @rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 27px;
        }
        .cardlte {
          display: block;
          margin-left: 23 / @rem;
          font-size: 18 / @rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 27px;
        }
      }
      .cardr {
        .cardrt {
          margin-top: 70 / @rem;
          margin-left: 50 / @rem;
          .span1 {
            display: inline-block;
            width: 20 / @rem;
            height: 20 / @rem;
            background: rgba(255, 204, 0, 1);
          }
          .span2 {
            font-size: 18 / @rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 36px;
            margin-left: 20 / @rem;
          }
        }
        .cardrb {
          margin-top: 5 / @rem;
          margin-left: 50 / @rem;
          .span1 {
            display: inline-block;
            width: 20 / @rem;
            height: 20 / @rem;
            background: rgba(102, 102, 102, 1);
          }
          .span2 {
            font-size: 18 / @rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 36px;
            margin-left: 20 / @rem;
          }
        }
        .cardrt1 {
          margin-top: 100 / @rem;
          margin-left: 50 / @rem;
          .span1 {
            display: inline-block;
            width: 20 / @rem;
            height: 20 / @rem;
            background: rgba(252, 72, 71, 1);
          }
          .span2 {
            font-size: 18 / @rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 36px;
            margin-left: 20 / @rem;
          }
        }
      }
      .cardl2 {
        width: 130 / @rem;
        height: 130 / @rem;
        margin-top: 50 / @rem;
        margin-left: 77 / @rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
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
      padding-top: 50 / @rem;
      padding-left: 50 / @rem;
      .temperature {
        width: 755 / @rem;
        height: 94 / @rem;
        margin-bottom: 30 / @rem;
        background-color: #26272c;
        display: flex;
        .tem1 {
          width: 45 / @rem;
          height: 61 / @rem;
          // background-color: red;
          margin-top: 17 / @rem;
          margin-left: 38 / @rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .tem2 {
          width: 450 / @rem;
          height: 61 / @rem;
          margin-left: 38 / @rem;
          margin-top: 17 / @rem;
          .tem2t {
            font-size: 26 / @rem;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(255, 0, 0, 1);
          }
          .tem2b {
            font-size: 18 / @rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 36px;
          }
        }
        .tem3 {
          height: 61 / @rem;
          margin-top: 17 / @rem;
          .tem3t {
            font-size: 18 / @rem;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
          .tem3b {
            font-size: 18 / @rem;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(252, 139, 71, 1);
            line-height: 36px;
            margin-left: 110 / @rem;
            margin-top: 8 / @rem;
          }
        }
      }
    }
  }
}
</style>
