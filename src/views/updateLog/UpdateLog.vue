<template>
  <div class="update-log-container">
    <van-nav-bar title="小基助手·更新日志" left-arrow @click-left="back" />
    <div class="log-ul" v-for="item in [1, 2, 3]">
      <div class="log-li">
        <div class="li-title">v1.8.3_20210901</div>
        <div class="li-info">
          <div>新开发了一款换头像的小程序</div>
          <div>已经上线了</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyVueAppUpdateLog",

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
.update-log-container {
  /deep/ .van-nav-bar {
    .van-icon {
      color: #333333 !important;
    }
  }

  .log-ul {
    margin: 0 16px;
    .log-li {
      margin-top: 16px;
      .li-title {
        color: #333333;
        font-weight: 600;
        margin-bottom: 10px;
        font-size: 14px;
      }

      .li-info {
        background-color: #f0f0f0;
        color: #343434;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 8px;
        line-height: 30px;
        font-size: 16px;
        div {
          &::before {
            content: "";
            width: 5px;
            height: 5px;
            background: #8a8a8a;
            margin-right: 10px;
            border-radius: 50%;
            display: inline-block;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>