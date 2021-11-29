<template>
  <div class="bottom-bar-container">
    <van-icon @click="edit" class-prefix="my-icon" name="caidan" />
    <van-icon @click="toSetting" class-prefix="my-icon" name="shezhi" />
    <div class="right" @click="toIncomeDetail">
      <div class="income">
        <div :style="{ color: isHong }">-0.12</div>
        <div>当日收益</div>
      </div>
      <div><van-icon name="arrow" color="#808080" /></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyVueAppBottomBar",

  data() {
    return {};
  },

  computed: {
    isHong: () => {
      return "green";
    },
  },

  mounted() {},

  methods: {
    toSetting() {
      this.$router.push('/setting')
    },

    toIncomeDetail() {
      this.$router.push('/incomedetail')
    }
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
</style>