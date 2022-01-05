<template>
  <div class="income-detail-container">
    <van-nav-bar title="小基助手·盈亏详情" left-arrow @click-left="back" />
    <van-cell
      v-if="userInfo"
      :title="userInfo.fundGroups[curIndex].name"
      center
      :border="false"
      style="background: #f4faff"
      title-class="sel-title-css"
      @click="showActionSheet = true"
    >
      <template #right-icon>
        <span>点击切换分组</span>
        <van-icon name="exchange" color="#808080" />
      </template>
    </van-cell>
    <van-action-sheet v-model="showActionSheet" v-if="userInfo">
      <van-cell
        v-for="(item, index) in userInfo.fundGroups"
        :key="index"
        :title="item.name"
        center
        :border="false"
        :style="{ background: curIndex === index ? '#f4faff' : '' }"
        :title-class="[curIndex === index ? 'sel-title-css' : 'title-css']"
        :value="'包含基金' + item.fundCode.length + '只'"
        @click="selectGroup(index)"
      >
      </van-cell>
    </van-action-sheet>
    <!-- 详情 -->
    <div class="income-detail-box">
      <div class="all-money">
        <div>{{ totalAmount }}</div>
        <div>总持仓</div>
      </div>
      <div class="income-detail">
        <div class="id-item" v-for="(item, index) in incomeDatas" :key="index">
          <div :style="{ color: item.color }">{{ item.value2 }}</div>
          <div>{{ item.value1 }}</div>
        </div>
        <!-- <div class="id-item">
          <div>{{ totalHoldIncomeRate.toFixed(2) }}%</div>
          <div>持有收益率</div>
        </div>
        <div class="id-item">
          <div>{{ totalDailyIncome }}</div>
          <div>当日收益</div>
        </div>
        <div class="id-item">
          <div>{{ totalDailyIncomeRate.toFixed(2) }}%</div>
          <div>当日收益率</div>
        </div>
        <div class="id-item">
          <div>{{ updatedIncome[0] }}</div>
          <div>已更新收益</div>
        </div>
        <div class="id-item">
          <div>{{ updatedIncome[1] }}</div>
          <div>待更新收益</div>
        </div> -->
      </div>
    </div>

    <!-- 分享 -->
    <div class="share-box">
      <div class="btn" @click="shareIncome">分享我的收益</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { getUserInfo } from "network/cloudApi";
import { getFundDetail } from "network/api";

export default {
  name: "MyVueAppIncomeDetail",

  data() {
    return {
      showActionSheet: false,
      curIndex: 0,
      userInfo: null,
      totalAmount: 0,
      incomeDatas: [],
    };
  },

  computed: {
    ...mapState({
      groupIndex: (state) => state.groupIndex,
      downIsSafe: (state) => state.userInfo.config.downIsSafe,
    }),
  },

  mounted() {
    this.curIndex = this.groupIndex;
    console.log(this.incomeDatas);
    this.initData();
  },

  methods: {
    back() {
      this.$router.go(-1);
    },

    isHong(value) {
      if (this.downIsSafe)
        return [value > 0 ? "#48a1ad" : value == 0 ? "#808080" : "#008800"];
      return value > 0 ? "#ff0000" : value == 0 ? "#808080" : "#008800";
    },

    format(value) {
      return value > 0 ? "+" + value : value;
    },

    selectGroup(index) {
      this.showActionSheet = false;
      if (!this.userInfo.fundGroups[index].fundCode.length)
        return this.$toast("该组内无基金~");
      this.curIndex = index;
      this.initData();
    },

    initData() {
      this.getFundDetail().then((res) => {
        if (res === "err") return;
        this.funds = this.getFunds(res);
        // "总持仓",
        this.totalAmount = this.calcTotalAmount(this.funds);
        this.incomeDatas = [
          {
            key: "totalHoldIncome",
            value1: "持有收益",
            color: this.isHong(this.calcTotalHoldIncome(this.funds)),
            value2: this.format(this.calcTotalHoldIncome(this.funds)),
          },
          {
            key: "totalHoldIncomeRate",
            value1: "持有收益率",
            color: this.isHong(this.calcTotalHoldIncomeRate(this.funds)),
            value2:
              this.format(this.calcTotalHoldIncomeRate(this.funds).toFixed(2)) +
              "%",
          },
          {
            key: "totalDailyIncome",
            value1: "当日收益",
            color: this.isHong(this.calcTotalDailyIncome(this.funds)),
            value2: this.format(this.calcTotalDailyIncome(this.funds).toFixed(2)),
          },
          {
            key: "totalDailyIncomeRate",
            value1: "当日收益率",
            color: this.isHong(this.calcTotalDailyIncomeRate(this.funds)),
            value2:
              this.format(
                this.calcTotalDailyIncomeRate(this.funds).toFixed(2)
              ) + "%",
          },
          {
            key: "updatedIncome",
            value1: "已更新收益",
            color: this.isHong(this.isUpdatedIncome(this.funds)[0]),
            value2: this.format(this.isUpdatedIncome(this.funds)[0]),
          },
          {
            key: "waitUpdatedIncome",
            value1: "待更新收益",
            color: this.isHong(this.isUpdatedIncome(this.funds)[1]),
            value2: this.format(this.isUpdatedIncome(this.funds)[1]),
          },
        ];
      });
    },

    // 获取基金分组
    async getFundDetail() {
      try {
        const Fcode = await this.getUserInfo();
        const res = await getFundDetail(Fcode);
        return res.data;
      } catch (error) {
        return error;
      }
    },

    /**
     * @returns 基金code拼接
     */
    async getUserInfo() {
      return await getUserInfo().then((res) => {
        this.userInfo = res.result;
        // config存vuex
        // this.$store.commit({
        //   type: SET_USER_INFO,
        //   userInfo: this.userInfo,
        // });
        let Fcode = this.userInfo.fundGroups[this.curIndex].fundCode;
        if (!Fcode.length) return Promise.reject("err");
        return this.userInfo.fundGroups[this.curIndex].fundCode.join(",");
      });
    },

    // 基金对象组装
    getFunds(req) {
      const reqFcode = req.Datas;
      const { fundAmount, fundCost } = this.userInfo.fundGroups[this.curIndex];
      // 组装基金信息
      const funds = reqFcode.map((item) => {
        return Object.assign(item, {
          fundAmount: fundAmount[item.FCODE],
          fundCost: fundCost[item.FCODE],
          Expansion: req.Expansion,
        });
      });
      // 给每只基金绑定总持仓 方便计算持仓占比
      const totalAmount = this.calcTotalAmount(funds);
      return funds.map((item) => {
        item["totalAmount"] = totalAmount;
        return item;
      });
    },

    // 是否更新了收益
    isUpdated(fund) {
      return fund.PDATE.substr(5, 5) === fund.Expansion.GZTIME.substr(5, 5);
    },

    // 计算分组持仓总持仓 = 每个基金的当前持仓之和
    calcTotalAmount(funds) {
      const totalAmount = funds.reduce((acc, cur) => {
        if (!cur.fundCost || !cur.fundAmount) return acc;
        return acc + this.positionAmount(cur);
      }, 0);
      return totalAmount.toFixed(2);
    },

    // 计算分组当日收益
    calcTotalDailyIncome(funds) {
      const totalDailyIncome = funds.reduce((acc, cur) => {
        if (!cur.fundCost || !cur.fundAmount) return acc;
        return acc + parseFloat(this.dailyIncome(cur));
      }, 0);
      this.totalDailyIncome =
        totalDailyIncome && totalDailyIncome.toFixed(3).slice(0, -1);
      return totalDailyIncome;
    },

    // 计算分组当日收益率 = 分组当日收益/ 当前持仓金额
    calcTotalDailyIncomeRate(funds) {
      return (
        (this.calcTotalDailyIncome(funds) / this.calcTotalAmount(funds)) *
          100 || 0
      );
    },

    // 计算分组持有收益 = 每个基金的持有收益之和
    calcTotalHoldIncome(funds) {
      const totalHoldIncome = funds.reduce((acc, cur) => {
        if (!cur.fundCost || !cur.fundAmount) return acc;
        return acc + this.holdIncome(cur);
      }, 0);
      return totalHoldIncome.toFixed(2);
    },

    // 计算分组持有收益率 = 分组持有收益 / 分组初始持仓总金额
    calcTotalHoldIncomeRate(funds) {
      // 0 /0
      return (
        (this.calcTotalHoldIncome(funds) / this.positionCost(funds)) * 100 || 0
      );
    },

    //  已更新收益 /待更新收益
    isUpdatedIncome(funds) {
      let x = 0;
      let y = 0;
      funds.forEach((i) => {
        if (this.isUpdated(i)) {
          x += parseFloat(this.dailyIncome(i));
        } else y += parseFloat(this.dailyIncome(i));
      });
      return [x.toFixed(2), y.toFixed(2)];
    },

    //  单个基金的收益情况
    // 当日收益
    dailyIncome(fund) {
      if (!fund.fundCost || !fund.fundAmount) return 0;
      let dailyIncome = 0;
      if (this.isUpdated(fund)) {
        // -fund.NAV / (1 + fund.NAVCHGRT / 100)) 求出昨天的净值
        dailyIncome =
          (fund.NAV - -fund.NAV / -(1 + fund.NAVCHGRT / 100)) * fund.fundAmount;
      } else {
        dailyIncome = (fund.GSZZL / 100) * this.positionAmount(fund);
      }
      dailyIncome = dailyIncome.toFixed(2);
      return dailyIncome;
    },

    // 持有收益
    holdIncome(fund) {
      if (!fund.fundCost || !fund.fundAmount) return 0;
      let holdIncome = (fund.NAV - fund.fundCost) * fund.fundAmount;
      return holdIncome;
    },

    // 持有收益率
    holdIncomeRate(fund) {
      if (!fund.fundCost || !fund.fundAmount) return 0;
      let holdIncomeRate =
        (this.holdIncome / (fund.fundCost * fund.fundAmount)) * 100;
      // holdIncomeRate = holdIncomeRate.toFixed(2);
      return holdIncomeRate;
    },

    // 当前持仓金额
    positionAmount(fund) {
      if (!fund.fundCost || !fund.fundAmount) return 0;
      let positionAmount =
        fund.fundCost * fund.fundAmount + parseFloat(this.holdIncome(fund));
      // positionAmount = positionAmount.toFixed(2);
      return positionAmount;
    },

    // 持仓初始金额
    positionCost(funds) {
      const positionCost = funds.reduce((acc, cur) => {
        if (!cur.fundCost || !cur.fundAmount) return acc;
        return acc + cur.fundCost * cur.fundAmount;
      }, 0);
      return positionCost;
    },

    shareIncome() {},
  },
};
</script>

<style lang="scss" scoped>
.income-detail-container {
  /deep/ .van-nav-bar {
    .van-icon {
      color: #333333 !important;
    }
  }

  span {
    margin-right: 8px;
  }

  .van-cell {
    // background: #f4faff;
    color: #d6dade;
    margin: 16px;
    border-radius: 6px;
    width: calc(100vw - 32px);
  }

  .sel-title-css {
    color: #2895fc;
    font-size: 15px;
  }

  .title-css {
    color: #000000;
  }

  .income-detail-box {
    .all-money {
      margin-top: 30px;
      text-align: center;
      & :first-child {
        font-weight: bold;
        color: black;
        font-size: 20px;
      }
      & :last-child {
        color: #b3b3b3;
        font-size: 12px;
      }
    }
    .income-detail {
      display: flex;
      flex-wrap: wrap;
      .id-item {
        width: 50%;
        text-align: center;
        margin-top: 30px;
        & :first-child {
          font-weight: bold;
          color: #ff605c;
          font-size: 20px;
        }
        & :last-child {
          color: #b3b3b3;
          font-size: 12px;
        }
      }
    }
  }

  .share-box {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100vw;
    border-top: 1px solid #efefef;
    padding: 20px 0;
    background: #fff;
    .btn {
      height: 40px;
      color: #fff;
      border-radius: 6px;
      text-align: center;
      line-height: 40px;
      margin: 0 16px;
      background: #2895fc;
    }
  }
}
</style>