<template>
  <div class="about-container">
    <van-nav-bar title="小基助手·关于" left-arrow @click-left="back" />
    <div class="about-content">
      <img src="~assets/img/logo.png" alt="" srcset="" />
      <div>v1.8.3_20201128</div>
      <div>Design & Code by Gao.</div>
      <div>Email: g_aojun_01@163.com</div>
      <div>Data from 天天基金.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyVueAppAbout",

  data() {
    return {};
  },

  mounted() {},

  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.about-container {
  /deep/ .van-nav-bar {
    .van-icon {
      color: #333333 !important;
    }
  }

  .about-content {
    width: 100vw;
    display: flex;
    align-items: center;
    flex-flow: column nowrap;
    margin-top: 30%;
    color: #808080;
    line-height: 40px;
    font-weight: bold;

    img {
      width: 100px;
      height: 100px;
      margin-bottom: 20px;
    }
  }
}
</style>