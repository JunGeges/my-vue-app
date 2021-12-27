<template>
  <div class="content-item-container">
    <div class="left">
      <div class="left-first">{{ fund.SHORTNAME }}</div>
      <div class="left-last" v-if="!simpleMode">
        <span
          style="color: #2895fc; border: 1px solid #2895fc; border-radius: 3px"
          >{{ isUpdated ? "已更新" : "估算" }}</span
        >
        {{ fund.FCODE }}
      </div>
    </div>
    <div class="right">
      <div class="item">
        <div :class="isUp(fund.GSZZL)">{{ fund.GSZZL | format }}%</div>
        <div class="item-last" v-if="!simpleMode">{{ fund.GSZ }}</div>
      </div>
      <div class="item">
        <div :class="isUp(fund.NAVCHGRT)">{{ fund.NAVCHGRT | format }}%</div>
        <div class="item-last" v-if="!simpleMode">{{ fund.NAV }}</div>
      </div>
      <div class="item">
        <div :class="isUp(dailyIncome)">{{ dailyIncome | format }}</div>
        <div class="item-last" v-if="!simpleMode"></div>
      </div>
      <div class="item">
        <div :class="isUp(holdIncome)">{{ holdIncome | format }}</div>
        <div class="item-last" v-if="!simpleMode"></div>
      </div>
      <div class="item">
        <div :class="isUp(holdIncomeRate)">{{ holdIncomeRate | format }}%</div>
        <div class="item-last" v-if="!simpleMode"></div>
      </div>
      <div class="item">
        <div class="item-first">
          {{ positionAmount > 0 ? positionAmount : 0 }}
        </div>
        <div class="item-last" v-if="!simpleMode">{{ fund.fundCost }}</div>
      </div>
      <div class="item">
        <div class="item-first">
          {{
            positionAmount > 0
              ? ((positionAmount / fund.totalAmount) * 100).toFixed(1)
              : 0
          }}%
        </div>
        <div class="item-last" v-if="!simpleMode"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
    // 基金已更新
    isUpdated() {
      return (
        this.fund.PDATE.substr(5, 5) === this.fund.Expansion.GZTIME.substr(5, 5)
      );
    },

    // 当日收益
    dailyIncome() {
      const fund = this.fund;
      if (!fund.fundCost || !fund.fundAmount) return "--";
      let dailyIncome =
        ((this.isUpdated ? fund.NAVCHGRT : fund.GSZZL) * this.positionAmount) /
        100;
      console.log(dailyIncome);
      dailyIncome = dailyIncome.toFixed(2);
      return dailyIncome;
    },

    // 持有收益
    holdIncome() {
      const fund = this.fund;
      if (!fund.fundCost || !fund.fundAmount) return "--";
      let holdIncome = ((fund.NAV - fund.fundCost) * fund.fundAmount).toFixed(
        2
      );
      return holdIncome;
    },

    // 持有收益率
    holdIncomeRate() {
      const fund = this.fund;
      if (!fund.fundCost || !fund.fundAmount) return "--";
      let holdIncomeRate =
        (this.holdIncome / (fund.fundCost * fund.fundAmount)) * 100;
      holdIncomeRate = holdIncomeRate.toFixed(2);
      return holdIncomeRate;
    },

    // 持仓金额
    positionAmount() {
      const fund = this.fund;
      if (!fund.fundCost || !fund.fundAmount) return "--";
      let positionAmount =
        fund.fundCost * fund.fundAmount + parseFloat(this.holdIncome);
      positionAmount = positionAmount.toFixed(2);
      return positionAmount;
    },

    ...mapState({
      simpleMode: (state) => state.userInfo.config.simpleMode,
    }),
  },

  filters: {
    format(value) {
      return value > 0 ? `+${value}` : value;
    },
  },

  mounted() {
    // console.log(this.positionAmount);
    // this.$store.commit({
    //   type: CALC_POSITION_AMOUNT,
    //   positionAmount: this.positionAmount,
    // });
    // console.log((this.positionAmount/this.$store.state.totalPositionAmount).toFixed(2))
  },

  methods: {
    isUp(key) {
      return [key > 0 ? "item-first-up" : "item-first-down"];
    },
  },
};
</script>

<style lang="scss" scoped>
.content-item-container {
  display: flex;
  width: 100vw;
  padding: 6px 0;
  box-sizing: border-box;
  color: #000000;
  margin-bottom: 10px;
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
      width: 70px;
      text-align: center;
      // flex flex-grow flex-shrink flex-basis
      // flex:0 0 72px;
      // margin-right: 12px;
      flex-shrink: 0;
      position: relative;
      color: #000000;
      .item-first-up {
        color: #ff0000;
      }
      .item-first-down {
        color: #008800;
      }
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