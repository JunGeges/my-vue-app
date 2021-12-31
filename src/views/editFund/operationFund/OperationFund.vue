<template>
  <div class="operation-fund-container">
    <van-nav-bar title="小基助手·管理" left-arrow @click-left="back" />
    <van-cell
      v-if="userInfo"
      :title="userInfo.fundGroups[curGroupIndex].name"
      center
      :border="false"
      style="background: #f4faff"
      title-class="sel-title-css"
      @click="showGroupSheet = true"
    >
      <template #right-icon>
        <span class="tp">点击切换分组</span>
        <van-icon name="exchange" color="#afb1b3" />
      </template>
    </van-cell>
    <van-action-sheet v-model="showGroupSheet" v-if="userInfo">
      <van-cell
        v-for="(item, index) in userInfo.fundGroups"
        :key="index"
        :title="item.name"
        center
        :border="false"
        :style="{ background: curGroupIndex === index ? '#f4faff' : '' }"
        :title-class="[curGroupIndex === index ? 'sel-title-css' : 'title-css']"
        :value="'包含基金' + item.fundCode.length + '只'"
        @click="selectGroup(index)"
      >
      </van-cell>
    </van-action-sheet>
    <van-action-sheet
      v-model="showActionSheet"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="editAction"
    />
    <div class="column-title-box">
      <div class="column-title">名称</div>
      <div class="div-right">
        <div>上移</div>
        <div>下移</div>
        <div>显示</div>
      </div>
    </div>
    <div class="column-content-box">
      <div
        class="ccb-item"
        v-for="(item, index) in funds"
        :key="item.FCODE"
        @click="selectItem(index)"
      >
        <van-icon
          v-show="!item.select"
          name="yuanxingweixuanzhong"
          class-prefix="my-icon"
        />
        <van-icon
          v-show="item.select"
          name="yuanxingxuanzhong"
          class-prefix="my-icon"
        />
        <div class="ccb-title">
          <div>{{ item.SHORTNAME }}</div>
          <div>{{ item.FCODE }}</div>
        </div>
        <div class="icons">
          <van-icon
            name="down"
            :color="index === 0 ? '#f5f5f5' : ''"
            class="rotate"
            @click.stop="move(index, 'up')"
          />
          <van-icon
            name="down"
            :color="index === funds.length - 1 ? '#f5f5f5' : ''"
            @click.stop="move(index, 'down')"
          />
          <van-icon
            class-prefix="my-icon"
            color="#808080"
            size="20"
            name="xuanxiang"
            @click.stop="isShowActionSheet(index)"
          />
        </div>
      </div>
    </div>
    <div class="btns">
      <van-button
        plain
        hairline
        type="info"
        :color="['#cacacf', '#2895fc'][count]"
        size="small"
        block
        text="复制到"
        :disabled="[true, false][count]"
        class="vb"
        @click="copyFund"
      />
      <van-button
        plain
        hairline
        type="info"
        :color="['#cacacf', '#2895fc'][count]"
        size="small"
        block
        :disabled="[true, false][count]"
        text="移动到"
        class="vb"
        @click="moveFund"
      />
      <van-button
        :color="count ? '#ff605c' : '#c6c6cc'"
        size="small"
        type="primary"
        block
        class="vb"
        :disabled="[true, false][count]"
        :text="count ? '删除(' + count + ')' : '删除'"
        @click="deleteFund"
      />
      <van-button
        :loading="false"
        type="info"
        loading-size="10px"
        loading-text="保存中"
        text="保存"
        class="vb"
        size="small"
        block
        @click="saveEdit"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { getUserInfo } from "network/cloudApi";
import { getFundDetail } from "network/api";

export default {
  name: "MyVueAppOperationFund",

  data() {
    return {
      showActionSheet: false,
      showGroupSheet: false,
      curGroupIndex: 0,
      curSelectFundIndex: -1,
      userInfo: null,
      funds: [],
      count: 0,
      actions: [
        { name: "置顶", id: "sticky" },
        { name: "复制到其他分组", id: "copy" },
        { name: "移动到其他分组", id: "move" },
        { name: "删除", id: "delete" },
      ],
    };
  },

  computed: {
    ...mapState(["groupIndex"]),
  },

  mounted() {
    this.curGroupIndex = this.groupIndex;
    this.initData();
  },

  methods: {
    back() {
      this.$router.go(-1);
    },

    // action sheet 弹窗
    editAction(e, index) {
      console.log(e, index);
    },

    // 显示编辑弹窗
    isShowActionSheet(index) {
      this.showActionSheet = true;
      console.log(index);
    },

    // 选择分组
    selectGroup(index) {
      this.showGroupSheet = false;
      this.curGroupIndex = index;
      this.initData();
    },

    // 选中基金
    selectItem(index) {
      this.funds[index].select = !this.funds[index].select;
      // 选中个数
      this.count = this.selectedCount(this.funds);
      console.log(this.funds);
    },

    initData() {
      this.getFundDetail().then((res) => {
        if (res === "err") return this.$toast("该组内无基金~");
        this.funds = this.getFunds(res);
        console.log(this.funds);
      });
    },

    // 获取基金分组
    async getFundDetail() {
      try {
        const Fcode = await this.getUserInfo();
        const res = await getFundDetail(Fcode);
        return res.data;
      } catch (error) {
        return error;
      }
    },

    /**
     * @returns 基金code拼接
     */
    async getUserInfo() {
      return await getUserInfo().then((res) => {
        this.userInfo = res.result;
        let Fcode = this.userInfo.fundGroups[this.curGroupIndex].fundCode;
        if (!Fcode.length) return Promise.reject("err");
        return this.userInfo.fundGroups[this.curGroupIndex].fundCode.join(",");
      });
    },

    // 基金对象组装
    getFunds(req) {
      const reqFcode = req.Datas;
      const { fundAmount, fundCost } =
        this.userInfo.fundGroups[this.curGroupIndex];
      // 组装基金信息
      return reqFcode.map((item) => {
        return Object.assign(item, {
          fundAmount: fundAmount[item.FCODE],
          fundCost: fundCost[item.FCODE],
          select: false,
          Expansion: req.Expansion,
        });
      });
    },

    move(index, flag) {
      // 第一个不能向上移动，最后一个不能向下移动
      if (
        (index === this.funds.length - 1 && flag === "down") ||
        (index === 0 && flag === "up")
      )
        return;
      if (flag === "up") return this.frontMove(this.funds, index);
      this.backMove(this.funds, index);
    },

    // splice 会更新数组 不用返回
    frontMove: (arr, index) => {
      arr[index] = arr.splice(index - 1, 1, arr[index])[0];
      return arr;
    },

    backMove: (arr, index) => {
      if (index >= arr.length - 1) return arr;
      arr[index] = arr.splice(index + 1, 1, arr[index])[0];
      return arr;
    },

    // 统计选中个数
    selectedCount(funds) {
      return funds.reduce((acc, cur) => {
        return cur.select ? (acc += 1) : acc;
      }, 0);
    },

    // 复制基金到分组
    copyFund() {},

    // 从分组删除基金
    deleteFund() {},

    // 移动基金到其他分组
    moveFund() {},

    // 保存操作
    saveEdit() {},
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

  .tp {
    color: #afb1b3;
    margin: 5px;
  }

  .van-cell {
    // background: #f4faff;
    color: #d6dade;
    margin: 16px;
    border-radius: 6px;
    width: calc(100vw - 32px);
  }

  .sel-title-css {
    color: #2895fc;
    font-size: 15px;
  }

  .title-css {
    color: #000000;
  }

  .column-title-box {
    display: flex;
    align-items: center;
    font-size: 15px;
    height: 60px;
    padding: 0 16px;
    color: #808080;
    .column-title {
      flex: 1;
      margin-left: 17px;
    }

    .div-right {
      float: right;
      margin-left: auto;
      width: 32%;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }

  .column-content-box {
    padding: 0 10px 20px 10px;
    border-bottom: 1px solid #efefef;
    .ccb-item {
      display: flex;
      align-items: center;
      font-size: 15px;
      margin-bottom: 5px;
      height: 42px;
      color: #000000;

      .ccb-title {
        flex: 1;
        margin-left: 5px;
        font-size: 15px;
        & :last-child {
          color: #b3b3b3;
          margin-top: 3px;
          font-size: 10px;
        }
      }

      .icons {
        float: right;
        margin-left: auto;
        width: 32%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .rotate {
          transform: rotate(180deg);
        }

        .van-icon {
          // margin-left: 30px;
          color: #808080;
        }
      }
    }
  }

  .btns {
    display: flex;
    position: fixed;
    left: 0;
    justify-content: space-around;
    align-items: center;
    bottom: 0;
    padding: 0 10px;
    box-sizing: border-box;
    width: 100vw;
    background: #ffffff;
    border-top: 1px solid #efefef;
    height: 60px;

    .vb {
      // flex: 1;
      width: 24%;
      margin-right: 5px;
      border-radius: 4px !important;
    }
  }
}
</style>