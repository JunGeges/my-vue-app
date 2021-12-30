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
        :style="{ background: curIndex === index ? '#f4faff' : '' }"
        :title-class="[curIndex === index ? 'sel-title-css' : 'title-css']"
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
    />
    <div class="column-title-box">
      <div>名称</div>
      <div>上移</div>
      <div>下移</div>
      <div>显示</div>
    </div>
    <div class="column-content-box">
      <div class="ccb-item" v-for="(item, index) in funds" :key="index">
        <span>{{ item.SHORTNAME }}</span>
        <van-icon
          name="down"
          :color="index === 0 ? '#f5f5f5' : ''"
          @click="move(index, 'up')"
        />
        <van-icon
          name="down"
          :color="index === funds.length - 1 ? '#f5f5f5' : ''"
          @click="move(index, 'down')"
        />
        <van-icon
          class-prefix="my-icon"
          color="#808080"
          size="20"
          name="xuanxiang"
          @click="showActionSheet = true"
        />
      </div>
    </div>
    <div class="btns">
      <van-button
        plain
        hairline
        type="info"
        color="#2895fc"
        size="small"
        block
        text="复制到"
        class="vb"
      />
      <van-button
        plain
        hairline
        type="info"
        color="#2895fc"
        size="small"
        block
        text="移动到"
        class="vb"
      />
      <van-button color="#7232dd" size="small" block class="vb"
        >删除<span>(1)</span></van-button
      >
      <van-button
        :loading="false"
        type="info"
        loading-size="10px"
        loading-text="保存中"
        text="保存"
        class="vb"
        size="small"
        block
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
      curIndex: 0,
      userInfo: null,
      funds: [],
      actions: [
        { name: "置顶" },
        { name: "复制到其他分组" },
        { name: "移动到其他分组" },
        { name: "删除" },
      ],
    };
  },

  computed: {
    ...mapState(["groupIndex"]),
  },

  mounted() {
    this.curIndex = this.groupIndex;
    this.initData();
  },

  methods: {
    back() {
      this.$router.go(-1);
    },

    selectGroup(index) {
      this.showGroupSheet = false;
      this.curIndex = index;
      this.initData();
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
        let Fcode = this.userInfo.fundGroups[this.curIndex].fundCode;
        if (!Fcode.length) return Promise.reject("err");
        return this.userInfo.fundGroups[this.curIndex].fundCode.join(",");
      });
    },

    // 基金对象组装
    getFunds(req) {
      const reqFcode = req.Datas;
      const { fundAmount, fundCost } = this.userInfo.fundGroups[this.curIndex];
      // 组装基金信息
      return reqFcode.map((item) => {
        return Object.assign(item, {
          fundAmount: fundAmount[item.FCODE],
          fundCost: fundCost[item.FCODE],
          Expansion: req.Expansion,
        });
      });
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
      border-radius: 4px;
    }
  }
}
</style>