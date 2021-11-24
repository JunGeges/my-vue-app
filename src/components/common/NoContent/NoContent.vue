<template>
  <div class="no-content-container">
    <img src="~assets/img/no.png" alt="" srcset="" />
    <section @click="addFund">暂无数据,点击<span>添加</span>或通过<span>登录</span>恢复数据</section>
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
    addFund() {
      console.log('%c click', "font-size:40px")
      this.$router.push({ path: '/add' })
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