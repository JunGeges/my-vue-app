<template>
  <div class="add-fund-container">
    <van-nav-bar title="小基助手·加仓" left-arrow @click-left="back" />
    <div class="fund-box">
      <van-cell
        title="招商中正白酒指数基金"
        value="020152"
        value-class="value-css"
      />
    </div>
    <van-cell-group title="加仓金额" :border="false">
      <van-field v-model="jcje" type="number" placeholder="点击输入金额"/>
    </van-cell-group>
    <van-cell-group title="手续费/%" :border="false">
      <van-field v-model="sxf" type="number" placeholder="点击输入"/>
    </van-cell-group>
    <van-cell-group title="加仓日期" :border="false">
      <van-field v-model="jcrq" disabled/>
    </van-cell-group>
    <van-button block color="#2895fc">保存</van-button>
  </div>
</template>

<script>
export default {
  name: "MyVueAppAddFund",

  data() {
    return {
      jcje: 0,
      sxf: 0.15,
      jcrq:'2021-11-25 15:00前'
    };
  },

  mounted() {

},

  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.add-fund-container {
  /deep/ .van-nav-bar {
    .van-icon {
      color: #333333 !important;
    }
  }

  .van-cell-group__title {
    font-size: 16px;
    color: #808080;
  }

  .fund-box {
    padding: 16px;
    border-bottom: 1px solid #efefef;
    .van-cell {
      background: #f4faff;
      border-radius: 6px;
      color: #2895fc;
      font-size: 14px;
    }
    .value-css {
      color: #a5a5a5;
      font-size: 12px;
    }
  }

  .van-field {
    border-bottom: 2px solid #f0f0f0 !important;
    width: calc(100vw - 32px);
    margin-left: 16px;
    padding: 10px 0;
  }

  .van-button {
    margin: 16px;
    width: calc(100vw - 32px);
    border-radius: 6px;
  }
}
</style>