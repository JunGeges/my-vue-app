<template>
  <div class="content-container">
    <home-content-title-bar :funds="funds" :expansion="expansion" />
    <home-content-list :funds="funds" />
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

  props: {
    funds: {
      type: Array,
      default: () => {
        return [];
      },
    },
    expansion: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  components: {
    HomeContentTitleBar,
    HomeContentList,
  },

  mounted() {
    console.log(this.funds);
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.content-container {
  overflow: scroll;
  margin-left: 16px;
  margin-top: 10px;
  height: calc(100vh - 96px);
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}
</style>