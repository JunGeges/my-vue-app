<template>
  <div class="operation-fund-container">
    <van-nav-bar title="小基助手·管理" left-arrow @click-left="back" />
    <van-cell
      v-if="userInfo"
      :title="userInfo.fundGroups[curIndex].name"
      center
      :border="false"
      style="background: #f4faff"
      title-class="sel-title-css"
      @click="showActionSheet = true"
    >
      <template #right-icon>
        <span>点击切换分组</span>
        <van-icon name="exchange" color="#808080" />
      </template>
    </van-cell>
    <van-action-sheet v-model="showActionSheet" v-if="userInfo">
      <van-cell
        v-for="(item, index) in userInfo.fundGroups"
        :key="index"
        :title="item.name"
        center
        :border="false"
        :style="{ background: curIndex === index ? '#f4faff' : '' }"
        :title-class="[curIndex === index ? 'sel-title-css' : 'title-css']"
        :value="'包含基金' + item.fundCode.length + '只'"
        @click="selectGroup(index)"
      >
      </van-cell>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  name: "MyVueAppOperationFund",

  data() {
    return {};
  },

  mounted() {},

  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.operation-fund-container {
  /deep/ .van-nav-bar {
    .van-icon {
      color: #333333 !important;
    }
  }

  .van-cell-group__title {
    font-size: 16px;
    color: #808080;
  }
}
</style>