<template>
  <div class="set-custom-cloumn-container">
    <van-nav-bar title="小基助手·列自定义" left-arrow @click-left="back" />
    <div class="cloumn-title-box">
      <div>列名</div>
      <div>上移</div>
      <div>下移</div>
      <div>显示</div>
    </div>
    <div class="cloumn-content-box">
      <div class="ccb-item" v-for="(item, index) in columns" :key="item.id">
        <span>{{ item.columnTitle }}</span>
        <van-icon
          name="down"
          :color="index === 0 ? '#f5f5f5' : ''"
          @click="move(index, 'up')"
        />
        <van-icon
          name="down"
          :color="index === columns.length - 1 ? '#f5f5f5' : ''"
          @click="move(index, 'down')"
        />
        <van-icon
          class-prefix="my-icon"
          name="eyeyanjing"
          @click="handleCloumn(index, 'show')"
        />
      </div>
    </div>
    <!-- 需要隐藏的列 -->
    <div v-if="hideColumns.length" class="hide-cloumn-box">
      <div class="hcb-item" v-for="(item, index) in hideColumns" :key="item.id">
        <span>{{ item.columnTitle }}</span>
        <van-icon
          class-prefix="my-icon"
          name="yanjing"
          @click="handleCloumn(index, 'hide')"
        />
      </div>
    </div>

    <div class="save-edit-box">
      <div class="btn" @click="saveEdit">保存</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyVueAppSetcustomcloumn",

  data() {
    return {
      columns: [
        { id: "jz", columnTitle: "净值" },
        { id: "gsjz", columnTitle: "估算净值" },
        { id: "drsy", columnTitle: "当日收益" },
        { id: "cysy", columnTitle: "持有收益" },
        { id: "cysyl", columnTitle: "持有收益率" },
        { id: "ccje", columnTitle: "持仓金额" },
        { id: "cczb", columnTitle: "持仓占比" },
      ],
      hideColumns: [],
    };
  },

  mounted() {},

  methods: {
    back() {
      this.$router.go(-1);
    },

    move(index, flag) {
      if (flag === "up") return this.frontMove(this.columns, index);
      this.backMove(this.columns, index);
    },

    // splice 会更新数组 不用返回
    frontMove: (arr, index) => {
      if (index < 1) return arr;
      console.log("0", arr[index]);
      arr[index] = arr.splice(index - 1, 1, arr[index])[0];
      console.log("1", arr[index]);
      return arr;
    },

    backMove: (arr, index) => {
      if (index >= arr.length - 1) return arr;
      arr[index] = arr.splice(index + 1, 1, arr[index])[0];
      return arr;
    },

    // 隐藏/显示列
    handleCloumn(index, type) {
      const types = {
        show: this.columns,
        hide: this.hideColumns,
      };
      // 原数组移除
      let hideCloumnObj = types[type][index];
      types[type].splice(index, 1);
      // 新数组添加
      (type === "show" ? this.hideColumns : this.columns).push(hideCloumnObj);
    },

    saveEdit() {},
  },
};
</script>

<style lang="scss" scoped>
.set-custom-cloumn-container {
  // padding: 0 16px;
  box-sizing: boder-box;
  /deep/ .van-nav-bar {
    .van-icon {
      color: #333333 !important;
    }
  }

  .cloumn-title-box {
    display: flex;
    align-items: center;
    font-size: 15px;
    height: 60px;
    padding: 0 16px;
    color: #808080;
    & div:nth-of-type(1) {
      flex: 1;
      margin-left: 0;
    }

    div {
      margin-left: 10px;
    }
  }

  .cloumn-content-box {
    padding: 0 16px 20px 16px;
    border-bottom: 1px solid #efefef;
    .ccb-item {
      display: flex;
      align-items: center;
      font-size: 16px;
      height: 42px;
      color: black;

      & span {
        flex: 1;
        margin-left: 0;
      }

      & :nth-child(2) {
        transform: rotate(180deg);
      }

      .van-icon {
        margin-left: 30px;
        color: #808080;
      }
    }
  }

  .hide-cloumn-box {
    padding: 16px 16px 20px;
    .hcb-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      height: 42px;
      color: black;

      & span {
        flex: 1;
      }

      & :nth-child(2) {
        transform: rotate(180deg);
      }

      .van-icon {
        // margin-left: 30px;
        color: #808080;
      }
    }
  }

  .save-edit-box {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100vw;
    border-top: 1px solid #efefef;
    padding: 20px 0;
    background: #fff;
    .btn {
      height: 40px;
      color: #fff;
      border-radius: 6px;
      text-align: center;
      line-height: 40px;
      margin: 0 16px;
      background: #2895fc;
    }
  }
}
</style>