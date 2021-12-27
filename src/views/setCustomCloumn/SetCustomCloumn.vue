<template>
  <div class="set-custom-column-container">
    <van-nav-bar title="小基助手·列自定义" left-arrow @click-left="back" />
    <div class="column-title-box">
      <div>列名</div>
      <div>上移</div>
      <div>下移</div>
      <div>显示</div>
    </div>
    <div class="column-content-box">
      <div
        class="ccb-item"
        v-for="(item, index) in Object.values(columns)"
        :key="index"
      >
        <span>{{ item | format }}</span>
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
          @click="handleColumn(index, 'show')"
        />
      </div>
    </div>
    <!-- 需要隐藏的列 -->
    <div v-if="hideColumns.length" class="hide-column-box">
      <div
        class="hcb-item"
        v-for="(item, index) in Object.values(hideColumns)"
        :key="index"
      >
        <span>{{ item | format }}</span>
        <van-icon
          class-prefix="my-icon"
          name="yanjing"
          @click="handleColumn(index, 'hide')"
        />
      </div>
    </div>

    <div class="save-edit-box">
      <div class="btn" @click="saveEdit">保存</div>
    </div>
  </div>
</template>

<script>
import { getUserInfo, upColumnConfig } from "network/cloudApi";
export default {
  name: "MyVueAppSetCustomColumn",

  data() {
    return {
      columns: [],
      hideColumns: [],
    };
  },

  filters: {
    format(value) {
      return Object.values(value)[0];
    },
  },

  mounted() {
    let configObj = {
      jz: "净值",
      gz: "估算净值",
      sy: "当日收益",
      syAll: "持有收益",
      syAllL: "持有收益率",
      moneyAfter: "持仓金额",
      percentage: "持仓占比",
    };

    getUserInfo().then((res) => {
      this.columns = res.result.config.columnOrder.map((item) => {
        return { [item]: configObj[item] };
      });
      if (this.columns.length) {
        Object.keys(configObj).filter((item, index) => {
          const columnsObj = Object.values(this.columns)[index];
          if (!columnsObj) this.hideColumns.push({ [item]: configObj[item] });
        });
      }
    });
  },

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
      console.log("0", arr[index]);
      arr[index] = arr.splice(index - 1, 1, arr[index])[0];
      return arr;
    },

    backMove: (arr, index) => {
      if (index >= arr.length - 1) return arr;
      arr[index] = arr.splice(index + 1, 1, arr[index])[0];
      return arr;
    },

    // 隐藏/显示列
    handleColumn(index, type) {
      const types = {
        show: this.columns,
        hide: this.hideColumns,
      };
      // 原数组移除
      let handleColumnObj = types[type][index];
      types[type].splice(index, 1);
      // 新数组添加
      (type === "show" ? this.hideColumns : this.columns).push(handleColumnObj);
    },

    saveEdit() {
      const upConfig = this.columns.map((item) => {
        return Object.keys(item)[0];
      });
      upColumnConfig(upConfig);
      console.log(upConfig);
    },
  },
};
</script>

<style lang="scss" scoped>
.set-custom-column-container {
  // padding: 0 16px;
  box-sizing: border-box;
  /deep/ .van-nav-bar {
    .van-icon {
      color: #333333 !important;
    }
  }

  .column-title-box {
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

  .column-content-box {
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

  .hide-column-box {
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