<template>
    <div>
        <!-- 面包屑导肮 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">数据统计</a></el-breadcrumb-item>
            <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <el-row>
                <el-col>
                    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
                    <div id="main" style="width: 700px;height:400px;"></div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
// 1.引入 ECharts 文件
import echarts from 'echarts'
import _ from 'lodash'

export default {
  data() {
    return {
      //   options是需要合并的数据
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  created() {},
  //   2.只要执行mouted函数，就说明DOM元素已经渲染完毕
  async mounted() {
    // 3. 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))

    // 获取折线图数据
    const { data: res } = await this.$http.get('reports/type/1')
    if (res.meta.status !== 200) {
      return this.$message.error('获取折现图数据失败')
    }

    // 4.指定图表的配置项和数据,使用lodash 提供的merge函数，将服务器返回的data数据和深拷贝来的options数据合并，得到一个新的对象，使点具有跟随效果
    const result = _.merge(res.data, this.options)

    // 5.使用刚指定的配置项和数据展示图表。
    myChart.setOption(result)
  },
  methods: {}
}
</script>

<style lang="less" scoped>

</style>
