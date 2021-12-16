<template>
  <div class="content-item-container">
    <div class="left">
      <div>创金合信新能源汽车股票C</div>
      <div>估算 011103</div>
    </div>
    <div class="right">
      <div class="item">
        <div>+0.48%</div>
        <div>1.4364</div>
      </div>
      <div class="item">
        <div>-0.76%</div>
        <div>1.4295</div>
      </div>
      <div class="item">
        <div>+10.7</div>
        <div></div>
      </div>
      <div class="item">
        <div>-2761.98</div>
        <div></div>
      </div>
      <div class="item">
        <div>-55.33%</div>
        <div></div>
      </div>
      <div class="item">
        <div>2230.02</div>
        <div>3.2</div>
      </div>
      <div class="item">
        <div>2%</div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyVueAppHomeContentItem",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.content-item-container {
  display: flex;
  width: 100vw;
  padding: 6px 0;
  box-sizing: border-box;
  color: #000000;
  // border-bottom: 1px solid #efefef;
  .left {
    width: 30%;
    // box-shadow: 2px 0 0 rgba($color: #efefef, $alpha: 0.5);
    font-size: 14px;
    margin-right: 10px;
    position: fixed;
    background: #fff;
    z-index: 1;
    // font-weight: 600;
    & :first-child {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    & :last-child {
      color: #b3b3b3;
      font-size: 12px;
      margin-top: 5px;
    }
  }
  .right {
    width: 70%;
    display: flex;
    padding-left: 35%;
    // flex: 1;
    // overflow: scroll;
    flex-wrap: nowrap;
    font-size: 14px;
    font-weight: 600;
    .item {
      width: 78px;
      text-align: left;
      // flex flex-grow flex-shrink flex-basis
      // flex:0 0 72px;
      // margin-right: 35px;
      flex-shrink: 0;
      position: relative;
      color: #2bd36c;
      & :last-child {
        color: #696970;
        font-size: 12px;
        margin-top: 2px;
      }
      &:last-child {
        margin-right: 0px;
        width: 65px;
      }

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>