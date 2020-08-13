<template>
  <div id="app">
    <!-- 考勤设置 -->
    <el-form :model="form">
      <el-form-item label="上班时间" :label-width="formLabelWidth">
        <!-- <el-input v-model="form.name" placeholder="请输入上班时间" style="width:400px" /> -->
        <el-time-select
          v-model="value"
          :picker-options="{
            start: '06:30',
            step: '00:15',
            end: '10:30'
          }"
          placeholder="选择时间"
        />
      </el-form-item>
      <el-form-item label="下班时间" :label-width="formLabelWidth">
        <!-- <el-input v-model="form.name" placeholder="请输入下班时间" style="width:400px" /> -->
        <el-time-select
          v-model="value1"
          :picker-options="{
            start: '16:30',
            step: '00:15',
            end: '21:30'
          }"
          placeholder="选择时间"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'WorkSet',
  data() {
    return {
      value: '',
      value1: '',
      form: {
        name: ''
      },
      formLabelWidth: '100px'
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
}
</style>
