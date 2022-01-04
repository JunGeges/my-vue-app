<template>
  <div class="bottom-bar-container">
    <van-icon @click="edit" class-prefix="my-icon" name="caidan" />
    <van-icon @click="toSetting" class-prefix="my-icon" name="shezhi" />
    <van-icon @click="toLove" class-prefix="my-icon" name="aixin" />
    <div class="right" @click="toIncomeDetail">
      <div class="income">
        <div :style="{ color: isHong }">
          {{ dailyIncome > 0 ? "+" + dailyIncome : dailyIncome }}
        </div>
        <div>当日收益</div>
      </div>
      <div><van-icon name="arrow" color="#808080" /></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MyVueAppBottomBar",

  data() {
    return {};
  },

  props: {
    dailyIncome: {
      type: [String, Number],
      default: 0,
    },
  },

  computed: {
    isHong() {
      const dailyIncome = this.dailyIncome;
      if (this.downIsSafe)
        return [
          dailyIncome > 0
            ? "#48a1ad"
            : dailyIncome == 0
            ? "#808080"
            : "#008800",
        ];
      return dailyIncome > 0
        ? "#ff0000"
        : dailyIncome == 0
        ? "#808080"
        : "#008800";
    },

    ...mapState({
      downIsSafe: (state) => state.userInfo.config.downIsSafe,
    }),
  },

  mounted() {
    console.log(this.dailyIncome, this.funds);
  },

  methods: {
    edit() {
      this.$router.push("/operationfund");
    },

    toSetting() {
      this.$router.push("/setting");
    },

    toIncomeDetail() {
      this.$router.push({
        name: "incomedetail",
      });
    },

    toLove() {
      this.$router.push({
        name: "love",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom-bar-container {
  display: flex;
  align-items: center;
  height: 50px;
  border-top: 1px solid #efefef;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100vw;
  padding: 0 8px 0 15px;
  box-sizing: border-box;
  .my-icon-aixin {
    animation: heartbeat 1s infinite;
    transform-origin: center;
  }
  .right {
    display: flex;
    align-items: center;
    float: right;
    margin-left: auto;

    .income {
      text-align: right;
      margin-right: 5px;
      & :nth-child(1) {
        font-weight: bold;
      }

      & :nth-child(2) {
        color: #a5a5a5;
        font-size: 14px;
      }
    }
  }
}

@keyframes heartbeat {
  0%,
  to {
    transform: scale(1);
    opacity: 1;
  }

  25% {
    transform: scale(1.4);
    opacity: 0.6;
  }
}

@-webkit-keyframes heartbeat {
  0%,
  to {
    transform: scale(1);
    opacity: 1;
  }

  25% {
    transform: scale(1.4);
    opacity: 0.6;
  }
}
</style>