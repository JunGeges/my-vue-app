<template>
  <div>
    <home-content-item
      v-for="(item, index) in funds"
      :key="index"
      :fund="item"
    />
  </div>
</template>

<script>
import HomeContentItem from "./HomeContentItem";
export default {
  name: "MyVueAppHomeContentList",

  data() {
    return {
      allAmounts: 0,
    };
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

  methods: {
  },
};
</script>

<style lang="scss" scoped>
</style>