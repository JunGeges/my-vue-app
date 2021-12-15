<template>
  <div>
    <home-content-title-bar />
    <home-content-list />
  </div>
</template>

<script>
import HomeContentList from "./HomeContentList";
import HomeContentTitleBar from "./HomeContentTitleBar";
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
</style>