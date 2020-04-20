<template>
  <div class="content">
    <div :ref="dispatchId" style="width:400px;height:150px;"></div>
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
      list: []
    };
  },
  methods: {
    drawChart () {
      if (this.dispatchId === 'Monday') {
        this.list = []
        this.list.push(this.cityDataList[0].orderNumberToday20Gp, this.cityDataList[0].orderNumberToday40Gp, this.cityDataList[0].orderNumberToday40Hq)
      } else if (this.dispatchId === 'Tuesday') {
        this.list = []
        this.list.push(this.cityDataList[1].rowCarNumberSomeDay20Gp, this.cityDataList[1].rowCarNumberSomeDay40Gp, this.cityDataList[1].rowCarNumberSomeDay40Hq)
      } else if (this.dispatchId === 'Wednesday') {
        this.list = []
        this.list.push(this.cityDataList[2].rowCarNumberSomeDay20Gp, this.cityDataList[2].rowCarNumberSomeDay40Gp, this.cityDataList[2].rowCarNumberSomeDay40Hq)
      } else if (this.dispatchId === 'Thursday') {
        this.list = []
        this.list.push(this.cityDataList[3].rowCarNumberSomeDay20Gp, this.cityDataList[3].rowCarNumberSomeDay40Gp, this.cityDataList[3].rowCarNumberSomeDay40Hq)
      } else if (this.dispatchId === 'Friday') {
        this.list = []
        this.list.push(this.cityDataList[4].rowCarNumberSomeDay20Gp, this.cityDataList[4].rowCarNumberSomeDay40Gp, this.cityDataList[4].rowCarNumberSomeDay40Hq)
      }
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs[this.dispatchId]);
      // 指定图表的配置项和数据
      var colorArray = [
        {
          top: '#ffffff', //绿
          bottom: 'rgba(255,255,255,0)'
        }, {
          top: '#ffffff', //绿
          bottom: 'rgba(255,255,255,0)'
        },
        {
          top: '#ffffff', //绿
          bottom: 'rgba(255,255,255,0)'
        }
      ];
      myChart.setOption({
        backgroundColor: 'rgba(0,0,0,0)',
        tooltip: {
          show: true,
          formatter: "{b}:{c}"
        },
        grid: {
          left: '12%',
          top: '15%',
          right: '12%',
          bottom: '8%',
          containLabel: true
        },

        xAxis: {
          type: 'value',
          show: false,
          position: 'top',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff',
            }
          },
          splitLine: {
            show: false
          },
        },
        yAxis: [{
          type: 'category',
          axisTick: {
            show: false,
            alignWithLabel: false,
            length: 3,

          },
          "splitLine": { //网格线
            "show": false
          },
          inverse: 'true', //排序
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff',
            }
          },
          data: ['20GP', '40GP', '40HP']
        }

        ],
        series: [{
          name: '能耗值',
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{c}',
              textStyle: {
                color: '#F45151',
                fontWeight: 800,
                fontSize: 17
              }
            }
          },
          itemStyle: {
            normal: {
              show: true,
              color: function (params) {
                let num = colorArray.length;
                return {
                  type: 'linear',
                  colorStops: [{
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }, {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }, {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom
                  }, {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top
                  }],
                  //globalCoord: false
                }
              },
              barBorderRadius: 70,
              borderWidth: 0,
              borderColor: '#333',
            }
          },
          barGap: '1%',
          barCategoryGap: '50%',
          data: this.list
        }

        ]
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