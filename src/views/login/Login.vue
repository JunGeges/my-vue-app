<template>
  <div class="login-container">
    <van-nav-bar :title="title" left-arrow @click-left="back" />
    <van-form @submit="onSubmit" validate-first>
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="请输入用户名"
        :rules="usernameRules"
      />
      <van-field
        v-model="password"
        name="密码"
        label="密码"
        required
        placeholder="请输入密码"
        type="password"
        :rules="passwordRules"
      />
      <van-field
        v-if="isLogin"
        v-model="confirmPassword"
        name="确认密码"
        label="确认密码"
        required
        placeholder="请确认密码"
        type="password"
        :rules="confirmPasswordRules"
      />
      <div class="tip">登录后可以进行数据云同步</div>
      <div style="margin: 16px">
        <van-button native-type="submit" color="#2895fc" block>{{
          changeBtnText[0]
        }}</van-button>
        <van-button
          @click="changeMode"
          native-type="button"
          style="margin-top: 16px"
          color="#2895fc"
          plain
          block
          >{{ changeBtnText[1] }}</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "MyVueAppLogin",

  data() {
    return {
      isLogin: 0,
      username: "",
      usernameRules: [
        {
          required: true,
          message: "用户名最少4位",
          validator: (value) => {
            return value.length >= 4;
          },
        },
      ],
      password: "",
      passwordRules: [{ required: true, message: "请填写密码" }],
      confirmPassword: "",
      confirmPasswordRules: [
        {
          required: true,
          message: "两次输入不一致",
          validator: (value) => {
            return this.password === value;
          },
        },
      ],
    };
  },

  computed: {
    changeBtnText() {
      return [
        { 0: "登录", 1: "切换到注册" },
        { 0: "注册", 1: "切换到登录" },
      ][this.isLogin];
    },

    title() {
      return `小基助手·${this.changeBtnText[0]}`;
    },
  },

  mounted() {},

  methods: {
    // 表单提交
    onSubmit(value) {
      console.log("submit", value);
    },

    // 注册/登录切换
    changeMode() {
      this.isLogin = this.isLogin === 0 ? 1 : 0;
    },

    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  /deep/ .van-nav-bar {
    .van-icon {
      color: #333333 !important;
    }
  }

  .tip {
    color: #00ca4e;
    margin: 16px;
    font-size: 14px;
  }
}
</style>