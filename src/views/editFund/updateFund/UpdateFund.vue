<template>
  <div class="update-fund-container">
    <van-nav-bar title="小基助手·修改" left-arrow @click-left="back" />
    <div class="fund-box" v-if="fund">
      <van-cell
        :title="fund.SHORTNAME"
        :value="fund.FCODE"
        value-class="value-css"
      />
    </div>
    <van-form @submit="saveUpdated">
      <van-cell-group title="持有份额" :border="false">
        <van-field v-model="fundAmount" type="number" name="amount" />
      </van-cell-group>
      <van-cell-group title="成本单价" :border="false">
        <van-field v-model="fundCost" type="number" name="cost" />
      </van-cell-group>
      <van-button block color="#2895fc" native-type="submit">保存</van-button>
    </van-form>
  </div>
</template>

<script>
import { updateFundCostOrAmount } from "network/cloudApi";
import { mapState } from "vuex";
export default {
  name: "MyVueAppUpdateFund",

  data() {
    return {
      fund: null,
      fundAmount: 0,
      fundCost: 0,
    };
  },

  mounted() {
    // console.log(this.$route.params, "--------");
    this.fund = this.$route.params;
    this.fundAmount = this.fund.fundAmount;
    this.fundCost = this.fund.fundCost;
  },

  computed: {
    ...mapState(["groupIndex"]),
  },

  methods: {
    back() {
      this.$router.go(-1);
    },

    saveUpdated(e) {
      // console.log(e);
      const params = Object.assign(
        {
          groupIndex: this.groupIndex,
          Fcode: this.fund.FCODE,
        },
        e
      );
      // return console.log({params});
      updateFundCostOrAmount(params)
        .then((res) => {
          console.log(res);
          this.$toast.success({
            message: "保存成功",
            onClose: () => {
              this.back();
            },
          });
        })
        .catch((err) => {
          this.$toast.fail("保存失败" + err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.update-fund-container {
  /deep/ .van-nav-bar {
    .van-icon {
      color: #333333 !important;
    }
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