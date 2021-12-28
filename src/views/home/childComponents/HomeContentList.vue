<template>
  <div>
    <home-content-item
      v-for="(item, index) in funds"
      :key="index"
      :fund="item"
      @click.native="itemClick(item)"
    />
    <van-action-sheet
      v-model="showActionSheet"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="selectAction"
    />
  </div>
</template>

<script>
import HomeContentItem from "./HomeContentItem";
export default {
  name: "MyVueAppHomeContentList",

  data() {
    return {
      actions: [
        { name: "基金信息" },
        { name: "修改持仓" },
        { name: "加仓" },
        { name: "减仓" },
        { name: "删除" },
      ],
      showActionSheet: false,
      clickFund: null,
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
    selectAction(e, index) {
      console.log(index);
      const path = { 1: "updatefund", 2: "addfund", 3: "sellfund" };
      switch (index) {
        case 0:
          this.$toast("加班加点在干，别急~");
          break;
        case 1: //修改持仓
        case 2: //加仓
        case 3: //减仓
          if (!this.clickFund.fundAmount) return this.$toast("您未持有该基金");
          this.$router.push({
            name: `${path[index]}`,
            params: this.clickFund,
          });
          break;
      }
    },

    itemClick(item) {
      this.showActionSheet = true;
      this.clickFund = item;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>