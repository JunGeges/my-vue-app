<template>
  <div class="no-content-container">
    <img src="~assets/img/no.png" alt="" srcset="" />
    <section>暂无数据,点击<span @click="addFund">添加</span>或通过<span @click="goSettingPage">登录</span>恢复数据</section>
  </div>
</template>

<script>
export default {
  name: "MyVueAppNocontent",

  data() {
    return {};
  },

  mounted() {},

  methods: {
    // 添加基金
    addFund() {
      this.$router.push({ path: '/add' })
    },

    // 进入设置页面
    goSettingPage() {
      this.$router.push({ path: '/setting' })
    }
  },
};
</script>

<style lang="scss" scoped>
.no-content-container {
  display: flex;
  flex-flow: column nowrap;
  width: 100vw;
  height: calc(100vh - 138px);
  justify-content: center;
  align-items: center;
  color: #a5a5a5;
  font-size: 14px;
  letter-spacing: 1px;

  img {
    width: 60vw;
  }

  span {
    color: #2895fc;
  }
}
</style>