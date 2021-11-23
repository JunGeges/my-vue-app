<template>
  <div class="bottom-bar-container">
    <van-icon class-prefix="my-icon" name="caidan" />
    <van-icon class-prefix="my-icon" name="settings" />
    <span class="iconfont iconcaidan"></span>
    <div class="right">
      <div>
        <div>-0.12</div>
        <div>当日收益</div>
      </div>
      <div><van-icon name="arrow" /></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyVueAppBottomBar",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.bottom-bar-container {
  display: flex;
  align-items: center;
  height: 50px;
  border-top: 1px solid #efefef;
}

</style>