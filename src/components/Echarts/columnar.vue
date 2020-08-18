<template>
  <div id="app1">
    <div id="main" style="width: 660px;height:400px;" />
  </div>
</template>

<script>
export default {
  name: 'Columnar',
  mounted() {
    this.drawChart()
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('main'))
      // 指定图表的配置项和数据
      const option = {
        // title: {
        //   text: '世界人口总量',
        //   subtext: '数据来自网络'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        // legend: {
        //   data: ['2011年']
        // },
        grid: {
          left: '7%',
          right: '3%',
          bottom: '1%',
          containLabel: true,
          // 选中不触发
          tooltip: {
            show: false
          }
        },
        color: ['#0F3FE9'],
        textStyle: {
          // 图列内容样式
          color: '#fff', // 字体颜色
          backgroundColor: 'black' // 字体背景色
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          axisLine: {
            // 坐标轴 轴线
            show: true, // 是否显示
            // ----- 线 -------
            lineStyle: {
              color: 'blue',
              width: 1,
              type: 'solid'
            }
          },
          splitLine: {
            // gird 区域中的分割线
            show: false // 是否显示
          },
          axisTick: {
            // 坐标轴 刻度
            show: false // 是否显示
          }
        },
        yAxis: {
          type: 'category',
          data: [
            '06-11',
            '06-12',
            '06-13',
            '06-14',
            '06-15',
            '06-16',
            '06-17',
            '06-18'
          ],
          axisLine: {
            // 坐标轴 轴线
            show: true, // 是否显示
            // ------   线 ---------
            lineStyle: {
              color: 'blue',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            // 坐标轴 刻度
            show: false // 是否显示
          }
        },
        series: [
          {
            name: '2011年',
            type: 'bar',
            data: [10, 20, 30, 20, 30, 40, 50, 80],
            barWidth: 8 // 柱形的宽度
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
#app1 {
  //   color: #ffffff;
}
</style>
