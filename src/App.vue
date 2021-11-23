<template>
  <div id="app">
    <van-nav-bar title="小基助手" left-arrow @click-left="onClickLeft">
      <template #left>
        <div class="left-box">
          默认分组
          <van-icon name="sort" class="custom-css" />
        </div>
      </template>
    </van-nav-bar>
    <no-content></no-content>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import NoContent from "./components/common/NoContent/NoContent";
import BottomBar from './components/content/BottomBar.vue'

export default {
  name: "App",
  components: {
    NoContent,
    BottomBar
  },
  methods: {
    onClickLeft() {
      this.$toast("返回");
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("./assets/css/base.css");
.left-box {
  display: flex;
  background: #f4faff;
  align-items: center;
  justify-content: space-around;
  padding: 5px 10px;
  box-sizing: border-box;
  border-radius: 5px;
  color: #3da0fc;

  .custom-css {
    color: #343434;
    transform: rotate(90deg);
    margin-left: 8px;
  }
}
</style>

