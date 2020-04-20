<template>
  <div class="content">
    <div :ref="dispatchId" style="width: 300px;height:300px;"></div>
  </div>
</template>

<script>
export default {
  props: {
    dispatchId: String,
    cityDataList: Array
  },
  data () {
    return {
      datalist: [],
      newList: [],
      labelData: [],
      formList: []
    }
  },
  methods: {
    reuselist (ins) {
      this.datalist = this.cityDataList[ins].cityDataList
      this.newList = this.datalist.map((item, index) => {
        const { city, cityCounts } = item
        return { name: city, value: cityCounts, itemStyle: { normal: { color: '', borderColor: '' } }, id: index }
      })
      this.labelData = this.datalist.map((item, index) => {
        const { city, cityCounts } = item
        return { name: city, value: 1 }
      })
      this.formList = this.newList.map(items => {
        if (items.id == 0) {
          items.itemStyle.normal.color = '#B972DD'
          items.itemStyle.normal.borderColor = '#050505'
        } else if (items.id == 1) {
          items.itemStyle.normal.color = '#A5DD72'
          items.itemStyle.normal.borderColor = '#050505'
        } else if (items.id == 2) {
          items.itemStyle.normal.color = '#E1C985'
          items.itemStyle.normal.borderColor = '#050505'
        } else if (items.id == 3) {
          items.itemStyle.normal.color = '#DBEB7E'
          items.itemStyle.normal.borderColor = '#050505'
        } else if (items.id == 4) {
          items.itemStyle.normal.color = '#DDCD72'
          items.itemStyle.normal.borderColor = '#050505'
        } else if (items.id == 5) {
          items.itemStyle.normal.color = '#DD9F72'
          items.itemStyle.normal.borderColor = '#050505'
        } else if (items.id == 6) {
          items.itemStyle.normal.color = '#DD8772'
          items.itemStyle.normal.borderColor = '#050505'
        } else if (items.id == 7) {
          items.itemStyle.normal.color = '#72DDB7'
          items.itemStyle.normal.borderColor = '#050505'
        } else if (items.id == 8) {
          items.itemStyle.normal.color = '#72B7DD'
          items.itemStyle.normal.borderColor = '#050505'
        } else if (items.id == 1) {
          items.itemStyle.normal.color = '#7272DD'
          items.itemStyle.normal.borderColor = '#050505'
        }
        return items
      })
      return this.formList
    },
    drawChart () {
      if (this.dispatchId === 'Monday') {
        this.reuselist(0)
      } else if (this.dispatchId === 'Tuesday') {
        this.reuselist(1)
      } else if (this.dispatchId === 'Wednesday') {
        this.reuselist(2)
      } else if (this.dispatchId === 'Thursday') {
        this.reuselist(3)
      } else if (this.dispatchId === 'Friday') {
        this.reuselist(4)
      }

      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs[this.dispatchId]);
      // 指定图表的配置项和数据
      var data = this.formList
      var labelData = this.labelData
      myChart.setOption({
        title: {
          left: '50%',
          textAlign: 'center',
          top: '20%'
        },
        color: ['#22C3AA'],
        series: [{
          type: 'pie',
          data: data,
          roseType: 'area',
          labelLine: {
            normal: {
              show: false
            }
          },
          label: {
            normal: {
              show: false
            }
          }
        }, {
          type: 'pie',
          data: labelData,
          radius: ['75%', '100%'],
          center:['50%','50%'],
          zlevel: 3,
          itemStyle: {
            normal: {
              color: '#48547e',
              borderColor: '#090909',
            }
          },
          label: {
            normal: {
              position: "inside"
            }
          }
        //   label: {
        //     normal: {
        //       formatter: '{b|{b}}',
        //       rich: {
        //         b: {
        //           color: 'red',
        //           fontSize: 12
        //         },
        //       },
        //     }
        //   },
        //    labelLine: {
        //     normal: {
        //         lineStyle: {
        //             color: 'rgb(98,137,169)',
        //         },
        //         length: 10
        //     }
        // }
        }]
      })
    }
  },
  mounted () {
    this.drawChart()
  }
}
</script>
<style lang='less' scoped>
</style>