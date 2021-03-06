<template>
  <div id="app">
    <van-nav-bar title="小基助手" left-arrow @click-left="onClickLeft">
      <template #left>
        <div class="left-box" v-if="userInfo">
          {{ userInfo.fundGroups[groupIndex].name }}
          <van-icon name="sort" class="custom-css" />
        </div>
      </template>
    </van-nav-bar>

    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <home-content
        v-if="funds.length"
        :funds="funds"
        :expansion="Expansion"
      ></home-content>
      <no-content v-else />
    </van-pull-refresh>

    <bottom-bar :daily-income="totalDailyIncome" />

    <van-icon
      class="add-btn"
      class-prefix="my-icon"
      name="jia"
      size="40px"
      color="#2895fc"
      @click="toAddFund"
    />
  </div>
</template>

<script>
// import * as api from "network/api";
import NoContent from "components/common/NoContent/NoContent";
import BottomBar from "components/content/BottomBar";
import HomeContent from "./childComponents/HomeContent";

import { getUserInfo } from "network/cloudApi";
import { getFundDetail } from "network/api";
import { mapState } from "vuex";
import { SET_USER_INFO } from "store/mutations-type";


export default {
  name: "home",
  data() {
    return {
      funds: [],
      userInfo: null,
      totalDailyIncome: 0,
      isLoading: false,
      Expansion: null
    };
  },
  components: {
    NoContent,
    BottomBar,
    HomeContent,
  },
  created() {},

  computed: {
    ...mapState(["groupIndex"]),
  },

  mounted() {
    this.initDatas();

    // 监听事件
    this.$bus.$on("deleteFund", (fCode) => {
      const index = this.funds.findIndex((item) => {
        return item.FCODE === fCode;
      });
      this.funds.splice(index, 1);
      this.calcTotalDailyIncome(this.funds);
      // this.initDatas();
    });
    if (process.env.NODE_ENV == "production") {
      this.poll();
    }
  },

  beforeDestroy() {
    this.timeout && clearInterval(this.timeout);
  },

  methods: {
    async onRefresh() {
      // 有缓存
      if (this.funds.length) {
        const fCodes = this.funds.map((item) => {
          return item.FCODE;
        });
        const res = await getFundDetail(fCodes.join(","));
        this.funds = await this.getFunds(res.data);
        this.calcTotalDailyIncome(this.funds);
        this.isLoading = false;
        return;
      }
      // 没缓存
      this.initDatas();
      this.isLoading = false;
    },

    poll() {
      this.timeout = setTimeout(async () => {
        // 有缓存
        if (this.funds.length) {
          const fCodes = this.funds.map((item) => {
            return item.FCODE;
          });
          const res = await getFundDetail(fCodes.join(","));
          this.funds = await this.getFunds(res.data);
          this.calcTotalDailyIncome(this.funds);
          this.poll();
          return;
        }
        // 没缓存
        await this.initDatas();
      }, 1000 * 60);
    },

    async initDatas() {
      this.getFundDetail().then((res) => {
        if (res === "err") return this.$toast("该组内无基金~");
        this.funds = this.getFunds(res);
        // console.log(this.funds);
        this.funds && this.calcTotalDailyIncome(this.funds);
        // console.log(
        //   "总持仓",
        //   this.calcTotalAmount(this.funds),
        //   "当日收益",
        //   this.calcTotalDailyIncome(this.funds),
        //   "当日收益率",
        //   this.calcTotalDailyIncomeRate(this.funds),
        //   "持有收益",
        //   this.calcTotalHoldIncome(this.funds),
        //   "持有收益率",
        //   this.calcTotalHoldIncomeRate(this.funds),
        //   "已更新收益/待更新收益",
        //   this.isUpdatedIncome(this.funds)
        // );
      });
    },

    onClickLeft() {
      this.$router.push({
        name: "fundgroup",
      });
    },

    toAddFund() {
      this.$router.push({ name: "add" });
    },

    // 获取基金分组
    async getFundDetail() {
      try {
        const Fcode = await this.getUserInfo();
        const res = await getFundDetail(Fcode);
        this.Expansion = res.data.Expansion;
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
        this.$store.commit({
          type: SET_USER_INFO,
          userInfo: this.userInfo,
        });
        let Fcode = this.userInfo.fundGroups[this.groupIndex].fundCode;
        if (!Fcode.length) return Promise.reject("err");
        return this.userInfo.fundGroups[this.groupIndex].fundCode.join(",");
      });
    },

    // 基金对象组装
    getFunds(req) {
      const reqFcode = req.Datas;
      const { fundAmount, fundCost } =
        this.userInfo.fundGroups[this.groupIndex];
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
      // console.log({ totalAmount });
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
        return acc + this.positionAmount(cur);
      }, 0);
      return totalAmount.toFixed(2);
    },

    // 计算分组当日收益
    calcTotalDailyIncome(funds) {
      const totalDailyIncome = funds.reduce((acc, cur) => {
        console.log(acc, this.dailyIncome(cur));
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
        (100).toFixed(2)
      );
    },

    // 计算分组持有收益 = 每个基金的持有收益之和
    calcTotalHoldIncome(funds) {
      const totalHoldIncome = funds.reduce((acc, cur) => {
        return acc + this.holdIncome(cur);
      }, 0);
      return totalHoldIncome.toFixed(2);
    },

    // 计算分组持有收益率 = 分组持有收益 / 分组初始持仓总金额
    calcTotalHoldIncomeRate(funds) {
      return (
        (this.calcTotalHoldIncome(funds) / this.positionCost(funds)) *
        (100).toFixed(2)
      );
    },

    //  已更新收益 /待更新收益
    isUpdatedIncome(funds) {
      let x = 0;
      let y = 0;
      funds.forEach((i) => {
        if (this.isUpdated(i)) {
          x += this.dailyIncome(i);
        } else y += this.dailyIncome(i);
      });
      return [x, y];
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
  },
};
</script>

<style lang="scss" scoped>
.left-box {
  display: flex;
  background: #f4faff;
  align-items: center;
  justify-content: space-around;
  padding: 5px 10px;
  box-sizing: border-box;
  border-radius: 5px;
  color: #3da0fc;

  .custom-css {
    color: #343434;
    transform: rotate(90deg);
    margin-left: 8px;
  }
}

.add-btn {
  position: fixed;
  right: 20px;
  bottom: 80px;
  border-radius: 50%;
  box-shadow: 0 3px 0 #e5e5e5;
}

#tree-map {
  width: 100vw;
  height: 100vw;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
}
</style>
