<template>
  <div class="love-container">
    <van-nav-bar
      title="小基助手·❤️"
      left-arrow
      @click-left="back"
      :border="false"
    />
    <div class="love-panel">
      <div class="love-text">打赏一下，帮助小基助手更好的成长 (^_^)</div>
      <img class="love-img" src="~assets/img/dashangcode.jpg" alt="" />
      <div class="love-tip">先「长按」保存二维码，然后使用「扫一扫」识别</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FundLove",

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
.love-container {
  background: #f5f7fb;
  text-align: center;
  height: 100vh;
  /deep/ .van-nav-bar {
    background: #f5f7fb;
    .van-icon {
      color: #333333 !important;
    }
  }
}

.love-panel {
  position: relative;
  margin: 4vw;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 4px 0 rgba(35, 46, 60, 0.04);
}

.love-img {
  display: block;
  width: 92vw;
  height: 92vw;
}

.love-text,
.love-tip {
  color: #fff;
  font-size: 14px;
}

.love-tip {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 12vw;
  line-height: 11vw;
  background: #dfb741;
}

.love-text {
  padding: 4vw;
  background-image: linear-gradient(135deg, #2895fc, rgba(40, 149, 252, 0.7));
  text-align: center;
  font-weight: 700;
  margin-bottom: 20px;
}
</style>