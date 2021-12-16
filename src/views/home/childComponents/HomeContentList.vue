<template>
  <div>
    <home-content-item />
    <home-content-item />
    <home-content-item />
  </div>
</template>

<script>
import HomeContentItem from "./HomeContentItem";
export default {
  name: "MyVueAppHomeContentList",

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
  },

  components: {
    HomeContentItem,
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>