<template>
  <div class="setting-container">
    <van-nav-bar title="小基助手·设置" left-arrow @click-left="back" />
    <van-cell
      :border="false"
      size="large"
      title="登录/注册"
      label="登录后可进行数据云同步"
      label-class="label-css"
      to="/login"
      center
      is-link
      v-if="!hasLoginState"
    />
    <van-cell
      v-else
      :border="false"
      size="large"
      :title="userInfo.email"
      :label="'注册时间:' + userInfo.crateTime"
      label-class="label-css"
      title-class="title-css"
      center
      is-link
      @click="loginOut"
    />
    <van-action-sheet
      :actions="actions"
      v-model="showSingOut"
      cancel-text="取消"
      close-on-click-action
      @select="select"
    />
    <van-cell-group>
      <van-cell size="large" title="简洁模式" :border="false">
        <template #right-icon>
          <van-switch active-color="#2895fc" v-model="simpleMode" size="24" />
        </template>
      </van-cell>
      <van-cell size="large" title="绿涨红跌" :border="false">
        <template #right-icon>
          <van-switch active-color="#2895fc" v-model="upIsRed" size="24" />
        </template>
      </van-cell>
      <van-cell size="large" title="无障碍模式" :border="false">
        <template #right-icon>
          <van-switch active-color="#2895fc" v-model="downIsSafe" size="24" />
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell size="large" title="显示估算标签" :border="false">
      <template #right-icon>
        <van-switch active-color="#2895fc" v-model="showTag" size="24" />
      </template>
    </van-cell>
    <van-cell size="large" title="显示横屏切换按钮" :border="false">
      <template #right-icon>
        <van-switch active-color="#2895fc" v-model="showHP" size="24" />
      </template>
    </van-cell>
    <van-cell
      size="large"
      :border="false"
      title="显示列自定义"
      is-link
      to="/setcustomcloumn"
    />
    <van-cell-group>
      <van-cell
        to="/updatelog"
        title="更新日志"
        :border="false"
        size="large"
        is-link
      />
      <van-cell
        size="large"
        :border="false"
        title="关于 / 建议反馈"
        value="v1.8.3"
        is-link
        to="/about"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { singOut, getUserInfo } from "network/cloudApi";
export default {
  name: "MyVueAppSetting",

  data() {
    return {
      simpleMode: false,
      upIsRed: false,
      downIsSafe: false,
      showTag: false,
      showHP: false,
      showSingOut: false,
      actions: [{ name: "退出登录", color: "#ff605c" }],
      hasLoginState: null,
      userInfo: null,
    };
  },

  mounted() {
    this.hasLoginState = this.$cloudbase.auth().hasLoginState();
    // 获取userInfo
    getUserInfo(this.uid).then((res) => {
      this.userInfo = res.result;
      console.log(this.userInfo);
      const { simpleMode, upIsRed, downIsSafe, showTag, showHP } =
        this.userInfo.config;
      this.simpleMode = simpleMode;
      this.upIsRed = upIsRed;
      this.downIsSafe = downIsSafe;
      this.showTag = showTag;
      this.showHP = showHP;
    });
  },

  computed: {
    // ...mapState({
    //   hasLoginState: "hasLoginState", // 值为字符串等同于 state => state.hasLoginState  也可以写成  state => state.hasLoginState
    // }),
    ...mapState(["uid"]),
  },

  methods: {
    back() {
      this.$router.go(-1);
    },

    // 显示退出action sheet
    loginOut() {
      this.showSingOut = !this.showSingOut;
    },

    // 退出登录
    select(item, index) {
      console.log(item, index);
      singOut
        .call(this)
        .then(() => {
          // 成功退出登录 todo
          this.$toast("退出登录~");
          this.hasLoginState = null;
        })
        .catch(() => {
          this.$toast("退出失败!");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.setting-container {
  /deep/ .van-nav-bar {
    .van-icon {
      color: #333333 !important;
    }
  }

  /deep/ .van-cell-group .van-cell {
    padding-top: 16px !important;
    padding-bottom: 16px !important;
  }

  /deep/ .van-cell {
    padding-top: 16px !important;
    padding-bottom: 16px !important;
  }

  .label-css {
    color: #808080;
    font-size: 12px;
    font-weight: normal;
  }

  .title-css {
    font-weight: 600;
    color: #343434;
  }

  .value-css {
    color: #808080;
  }
}
</style>