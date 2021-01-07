<template>
  <div class="kline_wrap">
    <ul class="kline_list">
      <li
        v-for="item in list"
        :class="item.value == val ? 'checked' : ''"
        @click="getData(item.value, true)"
        :key="item.key"
      >
        {{ item.key }}
      </li>
      <p class="clear"></p>
    </ul>
    <div id="chart_container" ref="chart_pie" class="f-fill"></div>

    <div class="k-box pos-box">
      <p>
        <span>{{ nowTime.value }}</span>
        开:
        <span :style="'color:' + datas.color">{{ datas.open.value }}</span>
        高:
        <span :style="'color:' + datas.color">{{ datas.heigh.value }}</span>
        低:
        <span :style="'color:' + datas.color">{{ datas.low.value }}</span>
        收:
        <span :style="'color:' + datas.color">{{ datas.close.value }}</span>
        量:
        <span :style="'color:' + vol.color">{{ vol.value }}</span>
      </p>
      <div class="ma-box pos-box">
        <span style="color: #ecd38e">MA5：{{ ma.ma5.value }}</span>
        <span style="color: #5fcebe">MA10：{{ ma.ma10.value }}</span>
        <span style="color: #715797">MA30：{{ ma.ma30.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import echarts from "echarts";
import { mapState } from "vuex";

export default {
  data() {
    return {
      list: [
        { key: "1min", value: 60 },
        { key: "5min", value: 300 },
        { key: "15min", value: 900 },
        { key: "30min", value: 1800 },
        { key: "1hour", value: 3600 },
        { key: "4hour", value: 14400 },
        { key: "12hour", value: 43200 },
        { key: "24hour", value: 86400 },
        { key: "3day", value: 259200 },
        { key: "1week", value: 604800 },
      ],
      val: 400,
      barStar: 72,
      barEnd: 100,
      // 提示框的数据显示
      macd: {
        macd: {
          name: "macd",
          value: 0,
          color: "",
        },
        dif: {
          name: "dif",
          value: 0,
          color: "",
        },
        dea: {
          name: "dea",
          value: 0,
          color: "",
        },
      },
      datas: {
        color: "",
        open: {
          name: "开",
          value: 0,
        },
        close: {
          name: "收",
          value: 0,
        },
        low: {
          name: "低",
          value: 0,
        },
        heigh: {
          name: "高",
          value: 0,
        },
      },
      ma: {
        ma5: {
          name: "MA5",
          value: 0,
          color: "",
        },
        ma10: {
          name: "MA10",
          value: 0,
          color: "",
        },
        ma30: {
          name: "MA30",
          value: 0,
          color: "",
        },
        ma60: {
          name: "MA60",
          value: 0,
          color: "",
        },
      },
      vol: {
        name: "成交量",
        value: 0,
        color: "",
      },
      nowTime: {
        name: "time",
        value: 0,
        color: "",
      },
      timer: null,
    };
  },
  created() {
    //this.getData();
  },
  computed: {
    ...mapState([
      "priceDatas",
      "rate",
      "fvId",
      "balances",
      "group",
      "currency",
      "userInfo",
    ]),
    m_id: function () {
      return this.fvId;
    },
  },
  mounted() {
    let _t = this;
    _t.getData();
    setTimeout(function () {
      _t.timer = setInterval(function () {
        _t.getData(_t.val);
      }, 15000);
    }, 1000);
  },
  watch: {
    m_id() {
      let _t = this;
      clearInterval(_t.timer);
      setTimeout(function () {
        _t.chartLine.clear();
        _t.getData();
        _t.timer = setInterval(function () {
          _t.getData(_t.val);
        }, 15000);
      }, 200);
    },
  },
  methods: {
    /**
     * @func formatDate 时间戳转日期
     * @param {number} 时间戳
     */
    formatDate(t) {
      const date = new Date(t * 1000),
        year = date.getFullYear(),
        month = this.formatTime(date.getUTCMonth() + 1),
        day = this.formatTime(date.getDate()),
        hours = this.formatTime(date.getHours()),
        minute = this.formatTime(date.getMinutes()),
        seconds = this.formatTime(date.getSeconds());

      return `${month}-${day} ${hours}:${minute}:${seconds}`;
    },
    /**
     * @func formatTime 日期时间 小于10 前面加0
     * @param {number} 日期或者时间
     */
    formatTime(t) {
      return t > 9 ? t : "0" + t;
    },
    /**
     * @func getData 获取k线图数据
     */
    getData(time, clickFlag) {
      var s = time || 900;
      const that = this;
      if (that.chartLine && clickFlag) {
        that.chartLine.clear();
      }
      const url = `/api/v2/market/period`;
      this.val = s;
      let market_id = that.m_id;
      if (market_id == null || market_id == "" || market_id == 0) {
        market_id = 1;
      }
      this.$axios
        .get(url, {
          params: {
            needTickers: 1,
            symbol: market_id,
            type: 15,
            step: s,
            size: 200,
          },
        })
        .then((res) => {
          if (res.status + "" == "200") {
            const dataArr = res.data;
            let klineArr = [[], [], []];
            for (let arr of dataArr) {
              klineArr[0].push(that.formatDate(arr[0]));
              klineArr[1].push(arr.slice(3, 7));
              klineArr[2].push(arr[7]);
            }
            this.drawKline(klineArr);
          }
        });
    },
    /**
     * @func drawKline 绘制k线图
     * @param {array} data k线图数据数组
     */
    drawKline(data) {
      var _t = this;
      var klinedata = data;
      var upColor = "#54b589";
      var upBorderColor = "#2c4e4a";
      var downColor = "#e85e59";
      var downBorderColor = "#a34849";
      var ma5Data = this.calculateMA(5, data[1]);
      var ma10Data = this.calculateMA(10, data[1]);
      var ma20Data = this.calculateMA(20, data[1]);
      var ma30Data = this.calculateMA(30, data[1]);
      var option = {
        backgroundColor: "#272020",
        dataset: {
          source: data[1],
        },
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            lineStyle: {
              type: "dashed",
            },
          },
          position: [0, 0],
          formatter: function (params) {
            _t.dealTool(params);
          },
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: false,
            },
          },
        },
        axisPointer: {
          link: { xAxisIndex: "all" },
          triggerTooltip: false,
        },
        visualMap: {
          show: false,
          seriesIndex: 2,
          dimension: 5,
          pieces: [
            {
              value: 1,
              color: downColor,
            },
            {
              value: -1,
              color: upColor,
            },
          ],
        },
        grid: [
          {
            top: "48",
            left: "4",
            right: "48",
            bottom: 94,
          },
          {
            left: "4",
            right: "48",
            height: 60,
            bottom: 32,
          },
        ],
        xAxis: [
          {
            type: "category",
            scale: true,
            // boundaryGap: false,
            // inverse: true,
            axisLine: { onZero: false },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#2B2B2B",
              },
            },
            axisTick: { show: false },
            axisLabel: { show: false },
            splitNumber: 20,
            min: "dataMin",
            max: "dataMax",
            data: data[0],
            axisLine: {
              //x轴底线颜色
              lineStyle: {
                color: "#2B2B2B",
              },
            },
            axisPointer: {
              label: {
                show: false,
              },
            },
          },
          {
            type: "category",
            gridIndex: 1,
            scale: true,
            //boundaryGap: false,
            axisLine: { onZero: false },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#2B2B2B",
              },
            },
            axisTick: { show: false },
            splitNumber: 20,
            min: "dataMin",
            max: "dataMax",
            data: data[0],
            axisLabel: {
              textStyle: {
                color: "#838a94",
              },
            },
          },
        ],
        yAxis: [
          {
            scale: true,
            position: "right",
            axisTick: { show: false },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#2B2B2B",
              },
            },
            axisLabel: {
              textStyle: {
                color: "#838a94",
              },
            },
            axisLine: {
              //y轴底线颜色
              lineStyle: {
                color: "#2B2B2B",
              },
            },
          },
          {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            position: "right",
            axisLine: {
              lineStyle: {
                color: "#2B2B2B",
              },
            },
          },
        ],
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0, 1],
            start: _t.barStar,
            end: _t.barEnd,
          },
          {
            show: false,
            xAxisIndex: [0, 1],
            type: "slider",
            height: "10",
            bottom: 5,
            start: 10,
            end: 100,
            handleIcon:
              "M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "105%",
            textStyle: {
              color: "#838a94",
            },
          },
        ],
        series: [
          {
            type: "candlestick",
            data: data[1],
            markPoint: {
              symbolSize: [24, 3],
              valueIndex: 1,
              data: [
                {
                  name: "max",
                  type: "max",
                  symbol:
                    "path://M92.75350454 389.59345804l709.69626151 0L802.44976605 455.30607501 92.75350454 455.30607501l0-65.71261697z M763.02803699 305.02634815L964 423.05750114l-200.97196301 121.22118402 0-239.25233701z",
                  symbolKeepAspect: true,
                  symbolOffset: [-18, -16],
                  itemStyle: {
                    color: "#fff",
                    borderColor: "#fff",
                    borderWidth: 0,
                    borderType: "solid",
                  },
                  label: {
                    show: true,
                    color: "#fff",
                    offset: [-40, 0],
                  },
                },
                {
                  name: "min",
                  type: "min",
                  symbol:
                    "path://M1005.796 529.636l-917.049 0 0-35.2711 917.049 0 0 35.2711Z M194.56 564.90600001L18.21 512 194.56 459.09399999Z",
                  symbolKeepAspect: true,
                  symbolOffset: [10, 12],
                  itemStyle: {
                    color: "#fff",
                    borderColor: "#fff",
                    borderWidth: 0,
                    borderType: "solid",
                  },
                  label: {
                    show: true,
                    color: "#fff",
                    offset: [40, 0],
                  },
                },
              ],
            },
            itemStyle: {
              color: upColor,
              color0: downColor,
              borderColor: null,
              borderColor0: null,
            },
          },
          {
            name: "MA5",
            type: "line",
            smooth: true,
            data: ma5Data,
            color: "red",
            symbol: "none",
            lineStyle: {
              width: 0.3,
            },
          },
          {
            name: "MA10",
            type: "line",
            smooth: true,
            data: ma10Data,
            color: "green",
            symbol: "none",
            lineStyle: {
              width: 0.3,
            },
          },
          {
            name: "MA20",
            type: "line",
            smooth: true,
            data: ma20Data,
            color: "orange",
            symbol: "none",
            lineStyle: {
              width: 0.3,
            },
          },
          {
            name: "MA30",
            type: "line",
            smooth: true,
            data: ma30Data,
            color: "blue",
            symbol: "none",
            lineStyle: {
              width: 0.3,
            },
          },
          {
            name: "成交量",
            type: "bar",
            data: data[2],
            xAxisIndex: 1,
            yAxisIndex: 1,

            itemStyle: {
              color: function (data) {
                let colorList = ["#e85e59", "#54b589"];
                const idx = data.dataIndex;
                return klinedata[1][idx][0] < klinedata[1][idx][1]
                  ? colorList[0]
                  : colorList[1];
              },
            },
          },
        ],
      };

      this.chartLine = echarts.init(this.$refs.chart_pie);
      this.chartLine.setOption(option, true);
      this.chartLine.on("datazoom", function (param) {
        _t.barStar = param.batch[0].start;
        _t.barEnd = param.batch[0].end;
      });
      window.addEventListener("resize", () => {
        this.chartLine.resize();
      });
    },
    calculateMA(dayCount, data) {
      var result = [];
      for (var i = 0, len = data.length; i < len; i++) {
        if (i < dayCount) {
          result.push("-");
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += data[i - j][1];
        }
        result.push(+(sum / dayCount).toFixed(3));
      }
      return result;
    },

    // 提示框处理事件
    dealTool(params) {
      let _this = this;
      params.forEach((el) => {
        switch (el.seriesIndex) {
          case 0:
            _this.datas = {
              color: el.color,
              open: {
                name: "开",
                value: el.value[1],
              },
              close: {
                name: "收",
                value: el.value[2],
              },
              low: {
                name: "低",
                value: el.value[4],
              },
              heigh: {
                name: "高",
                value: el.value[3],
              },
            };
            _this.nowTime.value = el.axisValue;
            break;
          case 1:
            _this.ma.ma5 = {
              name: "MA5",
              value: el.value,
              color: el.color,
            };
            break;
          case 2:
            _this.ma.ma10 = {
              name: "MA10",
              value: el.value,
              color: el.color,
            };
            break;
          case 3:
            _this.ma.ma30 = {
              name: "MA30",
              value: el.value,
              color: el.color,
            };
            break;
          case 4:
            _this.ma.ma60 = {
              name: "MA60",
              value: el.value,
              color: el.color,
            };
            break;
          case 5:
            _this.vol = {
              name: "成交量",
              value: el.value,
              color: el.color,
            };
            break;
          case 6:
            _this.macd.macd = {
              name: "macd",
              value: el.value,
              color: el.color,
            };
            break;
          case 7:
            _this.macd.dif = {
              name: "dif",
              value: el.value,
              color: el.color,
            };
            break;
          case 8:
            _this.macd.dea = {
              name: "dea",
              value: el.value,
              color: el.color,
            };
            break;
          default:
            break;
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.kline_wrap {
  width: 100%;
  height: 100%;
  position: relative;
}
.f-fill {
  width: 100%;
  height: calc(100% - 30px);
}
.kline_list {
  width: 100%;
}
.kline_list li {
  float: left;
  width: 7.69%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.checked {
  color: red;
}
.clear {
  clear: both;
}

.k-box {
  position: absolute;
  top: 32px;
  left: 12px;
  z-index: 999;
}
.ma-box span {
  padding-right: 12px;
}
</style>
