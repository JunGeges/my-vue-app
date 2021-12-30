<template>
  <div class="content-item-container">
    <div
      v-if="simpleMode && isHold && showTag"
      class="updated-tip"
      :class="[isUpdated ? 'updated-sel' : '']"
    ></div>
    <div class="left">
      <div class="left-first">{{ fund.SHORTNAME }}</div>
      <div class="left-last" v-if="!simpleMode">
        <span
          v-if="isHold && showTag"
          :class="[isUpdated ? 'updated' : 'no-updated']"
          >{{ isUpdated ? "已更新" : "估算" }}</span
        >
        {{ fund.FCODE }}
      </div>
    </div>
    <div class="right">
      <template v-for="(item, index) in datas">
        <div class="item" :key="index">
          <div :class="item.color">{{ item.title1 }}</div>
          <div class="item-last" v-if="!simpleMode">{{ item.title2 }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MyVueAppHomeContentItem",

  data() {
    return {
      datas: [],
    };
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
    ...mapState({
      showTag: (state) => state.userInfo.config.showTag,
    }),
    // 基金已更新
    isUpdated() {
      return (
        this.fund.PDATE.substr(5, 5) === this.fund.Expansion.GZTIME.substr(5, 5)
      );
    },

    isHold() {
      return this.fund.fundCost && this.fund.fundAmount ? true : false;
    },

    // 当日收益
    dailyIncome() {
      const fund = this.fund;
      if (!fund.fundCost || !fund.fundAmount) return "--";
      let dailyIncome = 0;
      if (this.isUpdated) {
        // -fund.NAV / (1 + fund.NAVCHGRT / 100)) 求出昨天的净值
        dailyIncome =
          (fund.NAV - -fund.NAV / -(1 + fund.NAVCHGRT / 100)) * fund.fundAmount;
      } else {
        dailyIncome = (fund.GSZ - fund.NAV) * fund.fundAmount;
      }
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
      columnOrder: (state) => state.userInfo.config.columnOrder,
    }),
  },

  mounted() {
    // console.log(this.positionAmount);
    // this.$store.commit({
    //   type: CALC_POSITION_AMOUNT,
    //   positionAmount: this.positionAmount,
    // });
    // console.log((this.positionAmount/this.$store.state.totalPositionAmount).toFixed(2))
    const holdIncomeRate = this.format(this.holdIncomeRate);
    let sample = {
      jz: {
        key1: "jzL",
        title1: this.format(this.fund.NAVCHGRT) + "%",
        key2: "jz",
        title2: this.fund.NAV,
        keyTip: "jzDate",
        color: this.isUp(this.fund.NAVCHGRT),
      },
      gz: {
        key1: "gzL",
        title1: this.format(this.fund.GSZZL) + "%",
        key2: "gz",
        title2: this.fund.GSZ,
        keyTip: "gzDate",
        color: this.isUp(this.fund.GSZZL),
      },
      sy: {
        key1: "sy",
        title1: this.format(this.dailyIncome),
        color: this.isUp(this.dailyIncome),
      },
      syAll: {
        key1: "syAll",
        title1: this.format(this.holdIncome),
        color: this.isUp(this.holdIncome),
      },
      syAllL: {
        key1: "syAllL",
        title1: holdIncomeRate == "--" ? holdIncomeRate : holdIncomeRate + "%",
        color: this.isUp(this.holdIncomeRate),
      },
      moneyAfter: {
        key1: "moneyAfter",
        title1: this.positionAmount > 0 ? this.positionAmount : 0,
        key2: "cost",
        title2: this.fund.fundCost,
      },
      percentage: {
        key1: "percentage",
        title1:
          this.positionAmount > 0
            ? ((this.positionAmount / this.fund.totalAmount) * 100).toFixed(1) +
              "%"
            : "0%",
      },
    };
    this.datas = this.columnOrder.map((item) => {
      return sample[item];
    });
  },

  methods: {
    format(value) {
      return value > 0 ? `+${value}` : value;
    },

    isUp(value) {
      if (value == "--") return ["item-first-eq0"];
      return [
        value > 0
          ? "item-first-up"
          : value == 0
          ? "item-first-eq0"
          : "item-first-down",
      ];
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
  position: relative;
  .updated-tip {
    position: fixed;
    left: 8px;
    // top: 0;
    width: 3px;
    height: 3px;
    transform: translateY(130%);
    border: 1px solid #b9b9b9;
    border-radius: 50%;
  }

  .updated-sel {
    background: #2895fc;
  }

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
      font-size: 10px;
      margin-top: 5px;
      .no-updated {
        border: 1px solid #b3b3b3;
        border-radius: 3px;
        padding: 1px 2px;
      }
      .updated {
        color: #2895fc;
        border: 1px solid #2895fc;
        border-radius: 3px;
      }
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
      .item-first-eq0 {
        color: #696970;
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