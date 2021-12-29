<template>
  <div class="title-bar-container">
    <div class="left">
      <div>基金名称</div>
      <div class="left-last" v-if="!simpleMode">基金编码</div>
    </div>
    <div class="right">
      <div class="item" v-for="item in titles" :key="item.key1">
        <div>{{ item.title1 }}</div>
        <div class="item-last" v-if="!simpleMode">{{ item.title2 }}</div>
      </div>
      <!-- <div class="item">
        <div>净值</div>
        <div class="item-last" v-if="!simpleMode">12-14</div>
      </div>
      <div class="item">
        <div>当日收益</div>
        <div class="item-last" v-if="!simpleMode"></div>
      </div>
      <div class="item">
        <div>持有收益</div>
        <div class="item-last" v-if="!simpleMode"></div>
      </div>
      <div class="item">
        <div>持有收益率</div>
        <div class="item-last" v-if="!simpleMode"></div>
      </div>
      <div class="item">
        <div>持仓金额</div>
        <div class="item-last" v-if="!simpleMode">持仓成本</div>
      </div>
      <div class="item">
        <div>持仓占比</div>
        <div class="item-last" v-if="!simpleMode"></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MyVueAppHomeContentTitleBar",

  data() {
    return {
      sample: {
        jz: {
          key1: "jzL",
          title1: "净值",
          key2: "jz",
          title2: "12-28",
          keyTip: "jzDate",
        },
        gz: {
          key1: "gzL",
          title1: "估算净值",
          key2: "gz",
          title2: "12-29",
          keyTip: "gzDate",
        },
        sy: {
          key1: "sy",
          title1: "当日收益",
        },
        syAll: {
          key1: "syAll",
          title1: "持有收益",
        },
        syAllL: {
          key1: "syAllL",
          title1: "持有收益率",
        },
        moneyAfter: {
          key1: "moneyAfter",
          title1: "持仓金额",
          key2: "cost",
          title2: "持仓成本",
        },
        percentage: {
          key1: "percentage",
          title1: "持仓占比",
        },
      },
      titles: [],
    };
  },

  props: {
    funds: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },

  computed: {
    ...mapState({
      simpleMode: (state) => state.userInfo.config.simpleMode,
      columnOrder: (state) => state.userInfo.config.columnOrder,
    }),
  },

  mounted() {
    console.log(this.funds, "11", this.columnOrder);
    // let count = 0;
    // this.funds.forEach((item) => {
    //   const x = [
    //     item.Expansion.FSRQ.substr(5, 5),
    //     item.Expansion.GZTIME.substr(5, 5),
    //   ];
    //   const isUpdate = item.PDATE.substr(5, 5) === x[1];
    //   if (isUpdate) {
    //     count++;
    //   }
    // });
    this.titles = this.columnOrder.map((item) => {
      return this.sample[item];
    });
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.title-bar-container {
  display: flex;
  // width: 100vw;
  padding: 6px 0;
  box-sizing: border-box;
  color: #000000;
  // border-bottom: 1px solid #efefef;
  // position: relative;

  .left {
    width: 30%;
    position: fixed;
    background: #fff;
    z-index: 1;
    // left: ;
    // box-shadow: 2px 0 0 rgba($color: #efefef, $alpha: 0.5);
    font-size: 14px;
    font-weight: 600;
    margin-right: 10px;
    .left-last {
      color: #b3b3b3;
      font-size: 12px;
      margin-top: 5px;
      font-weight: normal;
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
      // margin-right: 25px;
      flex-shrink: 0;
      position: relative;
      .item-last {
        color: #b3b3b3;
        font-size: 12px;
        margin-top: 2px;
        font-weight: normal;
      }
      &:last-child {
        margin-right: 10px;
      }

      // &::after,
      // &::before {
      //   content: "";
      //   width: 0;
      //   height: 0;
      //   // border: solid;
      //   border-style: solid;
      //   border-width: 0 4px 6px 4px;
      //   border-color: transparent transparent #cccccc;
      //   // background-color: #b3b3b3;
      //   display: block;
      //   position: absolute;
      //   right: -10px;
      //   // top: 50%;
      // }

      // &::before {
      //   top: 50%;
      //   transform: translateY(-50%);
      // }

      // &::after {
      //   //  border-width: 6px 4px 0 4px;
      //   top: 65%;
      //   transform: rotate(180deg);
      // }

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>