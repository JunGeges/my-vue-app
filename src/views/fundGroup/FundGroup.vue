<template>
  <div class="fund-group-container">
    <van-nav-bar title="小基助手·分组切换" left-arrow @click-left="back" />
    <van-cell title="默认分组" value="包含基金0支"/>
    <van-button plain block color="#2895fc">+ 新增分组</van-button>
    <van-button plain block color="#2895fc">分组管理</van-button>
  </div>
</template>

<script>

export default {
  name: "MyVueAppFundgroup",

  data() {
    return {};
  },

  mounted() {
    console.log(this.$route);
  },

  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.fund-group-container {
  /deep/ .van-nav-bar {
    .van-icon {
      color: #333333 !important;
    }
  }

  margin: 16rpx;
}
</style>