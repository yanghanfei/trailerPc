<template>
  <div class="home-page">
    <div class="mask-layer"></div>
    <el-carousel indicator-position="outside" ref="carousel" height='100vh' :interval='15000' autoplay @change="carouselChange">
      <el-carousel-item v-for="(item,index) in cityDataList" :key="index">
        <div class="home-body">
          <div class="parent-body">
            <el-row>
              <el-col :span="12">
                <!-- 上面的左半部分 -->
                <div class="box">
                  <el-row>
                    <el-col :span="5">
                      <div class="ceshi-immg">
                        <div class="elastic-box">
                          <div>
                            <p>{{item.todayOrder}}</p>
                            <p v-if="item.orderNumberToday" class="number">{{item.orderNumberToday}}</p>
                            <p v-if="item.rowCarNumberSomeDay" class="number">{{item.rowCarNumberSomeDay}}</p>
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="19">
                      <div class="right-shuju">
                        <order-today v-if="active" :dispatchId="dispatchId" :cityDataList="cityDataList"></order-today>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="5">
                      <div class="ceshi-immg">
                        <div class="elastic-box">
                          <div>
                            <p>{{item.todayDispatch}}</p>
                            <p v-if="item.carNumberToday" class="number">{{item.carNumberToday}}</p>
                            <p v-if="item.carNumberSomeDay" class="number">{{item.carNumberSomeDay}}</p>
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="19">
                      <div class="right-shuju">
                        <dispatch-today v-if="active" :dispatchId="dispatchId" :cityDataList="cityDataList"></dispatch-today>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="abbreviation">
                  <div class="placeholder"></div>
                  <div class="abbreviation-body">
                    <div class="doors-box" v-for="(ites,ins) in item.cityDataList" :key="ins">
                      <div class="colour" :style="{background:ites.color}"></div>
                      <div class="addreviation-msg">
                        <div v-for="(ited,inde) in ites.zxmdList" :key="inde" class="details">{{ited.zxmdCode}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="homeLeft-bot">
                  <div class="today-plan">
                    <div class="ceshi-img">
                      <div>
                        <p>月累计订单数</p>
                        <p class="number">{{item.monthlyOrderNumber}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="nightingale">
                  <province v-if="active" :dispatchId="dispatchId" :cityDataList="cityDataList" />
                </div>
              </el-col>
            </el-row>
            <!-- 定位部分 -->
            <div class="title">
              <span class="title-msg">车辆计划数据展示</span>
              <img src="../assets/images/hengxian_1.png" alt="" class="top-img">
            </div>
            <!-- 下面图片 -->
            <div class="bot-title">
              <img src="../assets/images/hengxian_2.png" alt="" class="bot-img">
              <span class="title-time" v-if="item.dateOfToday">{{timeFomatter(item.dateOfToday,'yyyy-MM-dd', true)}}</span>
              <span class="title-time" v-if="item.dateOfSomeDay">{{timeFomatter(item.dateOfSomeDay,'yyyy-MM-dd', true)}}</span>
            </div>
            <!-- 中间大图 -->
            <div class="middle">
              <div class="setting">
                <!-- 背景图 -->
                <img :src="imgSrc" alt="" class="middle-box" v-show="activeImg">
                <transition name="el-fade-in-linear">
                  <span v-if="show&&item.carIdleNumberToday&&num>0">{{num}}</span>
                  <span v-if="show&&item.carIdleNumberSomeDay&&num>0">{{num}}</span>
                </transition>
                <span class="car-title">{{msg}}</span>
              </div>
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import OrderToday from './order-today';
import DispatchToday from './dispatch-today';
import province from './province';
export default {
  data () {
    return {
      active: true,
      imgSrc: '',
      num: 0,
      SomeDayTwo: 0,
      SomeDaythree: 0,
      SomeDayfour: 0,
      SomeDayfive: 0,
      NumberToday: 0,
      noToday: '今天',//到那一天的时候
      show: false,
      activeImg: true,
      hodtruckTodayDataResult: {},
      cityDataList: [],
      dataTime: [],
      dispatchId: 'Monday',
      msg: '',
      timer: null
    }
  },
  components: {
    OrderToday,
    province,
    DispatchToday
  },
  methods: {
    fetchData () {
      let params = {}
      let _this = this
      this.$http.get("/integration/truck/order/screen").then(res => {
        if (res.data.msg === 'success') {
          _this.hodtruckTodayDataResult = res.data.data.truckTodayDataResult
          _this.cityDataList = res.data.data.truckSomeDayDataResults
          _this.cityDataList.unshift(_this.hodtruckTodayDataResult)
          _this.cityDataList.forEach(item => {
            item.cityDataList[0].color = '#B972DD'
            item.cityDataList[1].color = '#A5DD72'
            item.cityDataList[2].color = '#E1C985'
            item.cityDataList[3].color = '#DBEB7E'
            item.cityDataList[4].color = '#DDCD72'
            item.cityDataList[5].color = '#DD9F72'
            item.cityDataList[6].color = '#DD8772'
            item.cityDataList[7].color = '#72DDB7'
            item.cityDataList[8].color = '#72B7DD'
            item.cityDataList[9].color = '#7272DD'
            if (item.carIdleNumberSomeDay) {
              _this.dataTime.push(item.dateOfSomeDay)
              let min = ""
              // 从小到大排序
              for (let i = 0; i < _this.dataTime.length; i++) {
                for (let j = i; j < _this.dataTime.length; j++) {
                  if (_this.dataTime[i] > _this.dataTime[j]) {
                    min = _this.dataTime[j];
                    _this.dataTime[j] = _this.dataTime[i];
                    _this.dataTime[i] = min;
                  }
                }
              }
              if (_this.dataTime[0] === item.dateOfSomeDay) {
                _this.SomeDayTwo = item.carIdleNumberSomeDay
              } else if (_this.dataTime[1] === item.dateOfSomeDay) {
                _this.SomeDaythree = item.carIdleNumberSomeDay
              } else if (_this.dataTime[2] === item.dateOfSomeDay) {
                _this.SomeDayfour = item.carIdleNumberSomeDay
              } else {
                _this.SomeDayfive = item.carIdleNumberSomeDay
              }
              item.name = '当日闲置车辆'
              item.todayOrder = '当日排车'
              item.todayDispatch = '当日派车'
            }
            else {
              _this.NumberToday = item.carIdleNumberToday
              item.name = '今日闲置车辆'
              item.todayOrder = '今日接单'
              item.todayDispatch = '今日出车'
            }
          })
        }
      })
    },
    timeFomatter (time, format, dateFlag) {
      let date = new Date(time)
      var o = {
        'M+': date.getMonth() + 1, // month
        'd+': date.getDate(), // day
        'h+': date.getHours(), // hour
        'm+': date.getMinutes(), // minute
        's+': date.getSeconds(), // second
        'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
        'S': date.getMilliseconds() // millisecond
      }
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
      }
      if (dateFlag) {
        return format
      }
      return new Date(format).getTime()
    },
    carouselChange (key1, key2) {
      if (key1 === 1) {
        this.dispatchId = "Tuesday"
        this.noToday = '明天'
      } else if (key1 === 2) {
        this.dispatchId = "Wednesday"
        this.noToday = '后天'
      } else if (key1 === 3) {
        this.dispatchId = 'Thursday'
        this.noToday = '大后天'
      } else if (key1 === 4) {
        this.dispatchId = "Friday"
        this.noToday = '大大后天'
      } else {
        this.dispatchId = "Monday"
        this.noToday = '今天'
        this.fetchData()
      }
      this.active = false
      this.$nextTick(() => {
        this.active = true
        this.sequencePng()
      })
    },
    //图片转动
    sequencePng () {
      let n = 1
      this.show = false
      this.num = 0
      this.msg = ''
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.imgSrc = require('../assets/images/XZybp_' + n + '.png')
        n++
        if (n === 375) {
          n = 1
          this.num = 0
          clearInterval(this.timer)
        }
        if (n > 50) {
          this.msg = '当日闲置车辆'
          if (this.NumberToday && this.noToday === '今天') {
            if (this.num < this.NumberToday) {
              this.show = true
              this.num++
            }
          } else if (this.SomeDayTwo && this.noToday === '明天') {
            if (this.num < this.SomeDayTwo) {
              this.show = true
              this.num++
            }
          } else if (this.SomeDaythree && this.noToday === '后天') {
            if (this.num < this.SomeDaythree) {
              this.show = true
              this.num++
            }
          } else if (this.SomeDayfour && this.noToday === '大后天') {
            if (this.num < this.SomeDayfour) {
              this.show = true
              this.num++
            }
          } else if (this.SomeDayfive && this.noToday === '大大后天') {
            if (this.num < this.SomeDayfive) {
              this.show = true
              this.num++
            }
          }

        }
      }, 40);
    }
  },
  mounted () {
    this.sequencePng()
    this.fetchData()
  }
};
</script>

<style lang="less" scoped>
@import '../common/font.css';
.mask-layer {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 1000;
}
.home-body {
  width: 100vw;
  height: 100vh;
  background-image: url("https://www.anycase.cn/data/ac30/index/bg1.jpg");
  background-size: 100% 100%;
  color: aliceblue;
  font-size: 14px;
  position: fixed;
  top: 0;
  .parent-body {
    height: 100%;
    background-image: url("../assets/images/grid_tp.png");
    background-size: 100% 100%;
    opacity: 0.7;
    position: relative;
    .bot-title {
      position: absolute;
      bottom: 20px;
      .bot-img {
        width: 100vw;
      }
      .title-time {
        font-size: 25px;
        color: #ffffff;
        position: absolute;
        font-weight: 800;
        margin-top: 20px;
        left: calc(50% - 73px);
      }
    }
    .middle {
      width: 500px;
      height: 500px;
      position: absolute;
      top: calc(50vh - 250px);
      left: calc(50vw - 250px);
      .setting {
        width: 100%;
        height: 100%;
        position: relative;
        .car-title {
          font-size: 20px;
          position: absolute;
          top: 35px;
          color: #ffffff;
        }
        .middle-box {
          width: 100%;
          height: 100%;
        }
        span {
          position: absolute;
          width: 200px;
          height: 200px;
          top: calc(50% - 100px);
          left: calc(50% - 105px);
          text-align: center;
          line-height: 200px;
          font-size: 120px;
          color: #f45151;
          font-family: 'oswald';
        }
      }
    }
    .title {
      position: absolute;
      top: 40px;
      .title-msg {
        font-size: 25px;
        color: #f45151;
        position: absolute;
        font-weight: 800;
        left: calc(50% - 100px);
      }
      .top-img {
        width: 100vw;
      }
    }
    .box {
      margin-top: 10vh;
      .ceshi-immg {
        width: 200px;
        height: 200px;
        font-size: 20px;
        margin-bottom: 30px;
        background-image: url("../assets/images/circle_1.png");
        background-size: 100% 100%;
        .elastic-box {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          p {
            font-size: 18px;
            margin-top: 0;
            margin-bottom: 1px;
            text-align: center;
          }
          .number {
            font-size: 30px;
            margin-top: 10px;
          }
        }
      }
    }
    .right-shuju {
      margin-top: 14px;
    }
    .abbreviation {
      height: 62%;
      box-sizing: border-box;
      margin-top: 10vh;
      display: flex;
      position: relative;
      .placeholder {
        width: 48%;
      }
      .abbreviation-body {
        width: 52%;
        display: flex;
        flex-wrap: wrap;
        .doors-box {
          width: 50%;
          display: inline-block;
          overflow: hidden;
          margin-top: 5px;
          .colour {
            float: left;
            width: 15px;
            height: 6px;
            background: red;
            border-radius: 3px;
          }
          .addreviation-msg {
            float: left;
            display: flex;
            width: 200px;
            margin-left: 15px;
            flex-wrap: wrap;
            .details {
              width: 70px;
              min-height: 25px;
              font-size: 14px;
              font-family: "思源黑体";
              font-weight: 800;
              margin-right: 30px;
            }
          }
        }
      }
    }
    .homeLeft-bot {
      margin-top: 20px;
      .today-plan {
        .ceshi-img {
          width: 300px;
          height: 300px;
          font-size: 20px;
          background-image: url("../assets/images/circle_2.png");
          background-size: 100% 100%;
          display: flex;
          margin-left: 100px;
          align-items: center;
          justify-content: center;
          p {
            font-size: 18px;
            text-align: center;
          }
          .number {
            font-size: 40px;
          }
        }
      }
    }
    .nightingale {
      overflow: hidden;
      margin-top: 20px;
      .content {
        float: right;
        margin-right: 100px;
      }
    }
  }
}
/deep/.el-carousel__indicators--outside {
  display: none;
}
/deep/.el-carousel__arrow {
  display: none;
}
</style>