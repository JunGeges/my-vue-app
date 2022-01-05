<template>
  <div class="sell-fund-container">
    <van-nav-bar title="小基助手·减仓" left-arrow @click-left="back" />
    <div class="fund-box" v-if="fund">
      <van-cell
        :title="fund.SHORTNAME"
        :value="fund.FCODE"
        value-class="value-css"
      />
    </div>
    <van-cell-group title="卖出份额" :border="false" v-if="fund">
      <van-field
        v-model="mcfe"
        type="number"
        :placeholder="'最多卖出' + fund.fundAmount + '份'"
      />
    </van-cell-group>
    <!-- 卖出份数选择 -->
    <div class="sell-count-box">
      <div @click="selectSellAmount(0)">1/2</div>
      <div @click="selectSellAmount(1)">1/3</div>
      <div @click="selectSellAmount(2)">1/4</div>
      <div @click="selectSellAmount(3)">全部</div>
    </div>
    <van-button
      block
      :color="mcfe.length ? '#2895fc' : '#c6c6cc'"
      :disabled="mcfe.length <= 0"
      text="保存减仓"
      @click="save"
    />
  </div>
</template>

<script>
import { sellFundAmount } from "network/cloudApi";
import { mapState } from "vuex";
export default {
  name: "MyVueAppSellFund",

  data() {
    return {
      mcfe: "",
      fund: null,
      remainAmount: 0,
    };
  },

  mounted() {
    console.log(this.$route.params, this.groupIndex);
    this.fund = this.$route.params;
  },

  computed: {
    ...mapState(["groupIndex"]),
  },

  methods: {
    back() {
      this.$router.go(-1);
    },

    selectSellAmount(flag) {
      const tempMcfe = this.fund.fundAmount;
      const sellAmounts = [tempMcfe / 2, tempMcfe / 3, tempMcfe / 4, tempMcfe];
      // 卖出份额
      this.mcfe = parseFloat(sellAmounts[flag]).toFixed(2);
      // 剩余份额
      this.remainAmount = (this.fund.fundAmount - sellAmounts[flag]).toFixed(2);
    },

    save() {
      const params = {
        groupIndex: this.groupIndex,
        remainAmount: this.remainAmount,
        Fcode: this.fund.FCODE,
      };
      this.$dialog
        .confirm({
          title: "提示",
          message: `确认卖出 ${this.mcfe} 份吗?`,
          confirmButtonColor: "#2895fc",
        })
        .then(() => {
          sellFundAmount(params).then((res) => {
            if (res.result.updated) {
              this.$toast({
                message: "保存成功~",
                onClose: () => {
                  this.back();
                },
              });
            }
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.sell-fund-container {
  /deep/ .van-nav-bar {
    .van-icon {
      color: #333333 !important;
    }
  }

  .sell-count-box {
    display: flex;
    align-items: center;
    padding: 16px 0;
    div {
      margin-left: 10px;
      height: 30px;
      background: #f9f9f9;
      padding: 0 15px;
      color: #808080;
      font-size: 14px;
      line-height: 30px;
      border-radius: 15px;
    }
  }

  .van-button--disabled {
    opacity: 1;
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