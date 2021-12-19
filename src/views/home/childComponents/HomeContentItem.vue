<template>
  <div class="content-item-container">
    <div class="left">
      <div class="left-first">{{ fund.name }}</div>
      <div class="left-last">估算 {{ fund.code }}</div>
    </div>
    <div class="right">
      <div class="item">
        <div class="item-first">{{ fund.expectGrowth | format }}%</div>
        <div class="item-last">{{ fund.expectWorth }}</div>
      </div>
      <div class="item">
        <div class="item-first">{{ fund.dayGrowth | format }}%</div>
        <div class="item-last">{{ fund.netWorth }}</div>
      </div>
      <div class="item">
        <div class="item-first">{{ dailyIncome | format }}</div>
        <div class="item-last"></div>
      </div>
      <div class="item">
        <div class="item-first">{{ holdIncome | format }}</div>
        <div class="item-last"></div>
      </div>
      <div class="item">
        <div class="item-first">{{ holdIncomeRate | format }}%</div>
        <div class="item-last"></div>
      </div>
      <div class="item">
        <div class="item-first">{{ positionAmount }}</div>
        <div class="item-last">{{ fund.costUnitPrice }}</div>
      </div>
      <div class="item">
        <div class="item-first">2%</div>
        <div class="item-last"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import { CALC_POSITION_AMOUNT } from "store/mutations-type";
export default {
  name: "MyVueAppHomeContentItem",

  data() {
    return {};
  },

  props: {
    fund: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  computed: {
    // 当日收益
    dailyIncome() {
      const fund = this.fund;
      if (!fund.costUnitPrice || !fund.positionShare) return "--";
      let dailyIncome = (fund.expectWorth - fund.netWorth) * fund.positionShare;
      dailyIncome = dailyIncome.toFixed(2);
      return dailyIncome;
    },

    // 持有收益
    holdIncome() {
      const fund = this.fund;
      if (!fund.costUnitPrice || !fund.positionShare) return "--";
      let holdIncome = (
        (fund.netWorth - fund.costUnitPrice) *
        fund.positionShare
      ).toFixed(2);
      return holdIncome;
    },

    // 持有收益率
    holdIncomeRate() {
      const fund = this.fund;
      if (!fund.costUnitPrice || !fund.positionShare) return "--";
      let holdIncomeRate =
        (this.holdIncome / (fund.costUnitPrice * fund.positionShare)) * 100;
      holdIncomeRate = holdIncomeRate.toFixed(2);
      return holdIncomeRate;
    },

    // 持仓金额
    positionAmount() {
      const fund = this.fund;
      if (!fund.costUnitPrice || !fund.positionShare) return "--";
      let positionAmount =
        fund.costUnitPrice * fund.positionShare + parseFloat(this.holdIncome);
      positionAmount = positionAmount.toFixed(2);
      return positionAmount;
    },
  },

  filters: {
    format(value) {
      return value > 0 ? `+${value}` : value;
    },
  },

  mounted() {
    if (this.dailyIncome.indexOf("--") === -1) {
      this.$emit("mid", parseFloat(this.dailyIncome));
    }
    // console.log(this.positionAmount);
    // this.$store.commit({
    //   type: CALC_POSITION_AMOUNT,
    //   positionAmount: this.positionAmount,
    // });
    // console.log((this.positionAmount/this.$store.state.totalPositionAmount).toFixed(2))
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.content-item-container {
  display: flex;
  width: 100vw;
  padding: 6px 0;
  box-sizing: border-box;
  color: #000000;
  margin-bottom: 3px;
  // border-bottom: 1px solid #efefef;
  .left {
    width: 30%;
    // box-shadow: 2px 0 0 rgba($color: #efefef, $alpha: 0.5);
    font-size: 14px;
    margin-right: 10px;
    position: fixed;
    background: #fff;
    z-index: 1;
    // font-weight: 600;
    .left-first {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .left-last {
      color: #b3b3b3;
      font-size: 12px;
      margin-top: 5px;
    }
  }
  .right {
    width: 70%;
    display: flex;
    padding-left: 35%;
    // flex: 1;
    // overflow: scroll;
    flex-wrap: nowrap;
    font-size: 14px;
    font-weight: 600;
    .item {
      width: 60px;
      text-align: right;
      // flex flex-grow flex-shrink flex-basis
      // flex:0 0 72px;
      margin-right: 12px;
      flex-shrink: 0;
      position: relative;
      color: #2bd36c;
      .item-last {
        color: #696970;
        font-size: 12px;
        margin-top: 2px;
      }
      &:last-child {
        margin-right: 0px;
        width: 65px;
      }

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>