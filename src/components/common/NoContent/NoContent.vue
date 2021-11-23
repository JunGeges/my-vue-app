<template>
  <div class="no-content-container">
    <img src="~@assets/img/no.png" alt="" srcset="" />
    <section>暂无数据,点击<span>添加</span>或通过<span>恢复</span>数据</section>
  </div>
</template>

<script>
export default {
  name: "MyVueAppNocontent",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
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

  img {
    width: 60vw;
  }

  span {
    color: #2895fc;
    margin: 0 5px;
  }
}
</style>