<template>
  <div class="content-container">
    <home-content-title-bar />
    <home-content-list />
  </div>
</template>

<script>
import HomeContentTitleBar from "./HomeContentTitleBar";
import HomeContentList from "./HomeContentList";
export default {
  name: "MyVueAppHomeContent",

  data() {
    return {};
  },

  components: {
    HomeContentTitleBar,
    HomeContentList,
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.content-container {
  overflow: scroll;
  margin-left: 16px;
  height: calc(100vh - 96px);
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}
</style>