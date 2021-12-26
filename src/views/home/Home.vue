<template>
  <div id="app">
    <van-nav-bar title="小基助手" left-arrow @click-left="onClickLeft">
      <template #left>
        <div class="left-box" v-if="userInfo">
          {{ userInfo.fundGroups[groupIndex].name }}
          <van-icon name="sort" class="custom-css" />
        </div>
      </template>
    </van-nav-bar>
    <home-content v-if="funds.length" :funds="funds"></home-content>
    <no-content v-else></no-content>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
// import * as api from "network/api";
import NoContent from "components/common/NoContent/NoContent";
import BottomBar from "components/content/BottomBar";
import HomeContent from "./childComponents/HomeContent";

import { getUserInfo } from "network/cloudApi";
import { getFundDetail } from "network/api";
import { mapState } from "vuex";
import { SET_USER_INFO } from "store/mutations-type";

export default {
  name: "home",
  data() {
    return {
      funds: [],
      userInfo: null
    };
  },
  components: {
    NoContent,
    BottomBar,
    HomeContent,
  },
  created() {},

  computed: {
    ...mapState(["groupIndex"]),
  },

  mounted() {
    this.getFundDetail().then((res) => {
      if (res === "err") return this.$toast("该组内无基金~");
      this.funds = this.getFunds(res);
    });
    // this.timeout = setInterval(() => {
    //   getFundDetail("011103,011102");
    // }, 5000);
  },

  beforeDestroy() {
    this.timeout && clearInterval(this.timeout);
  },

  methods: {
    onClickLeft() {
      this.$router.push({
        name: "fundgroup",
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
        // config存vuex
        this.$store.commit({
          type: SET_USER_INFO,
          userInfo: this.userInfo,
        });
        let Fcode = this.userInfo.fundGroups[this.groupIndex].fundCode;
        if (!Fcode.length) return Promise.reject("err");
        return this.userInfo.fundGroups[this.groupIndex].fundCode.join(",");
      });
    },

    // 基金对象组装
    getFunds(req) {
      const reqFcode = req.Datas;
      const { fundAmount, fundCost } =
        this.userInfo.fundGroups[this.groupIndex];
      return reqFcode.map((item) => {
        return Object.assign(item, {
          fundAmount: fundAmount[item.FCODE],
          fundCost: fundCost[item.FCODE],
          Expansion: req.Expansion,
        });
      });
    },

    // 获取所有基金的总金额
  },
};
</script>

<style lang="scss" scoped>
.left-box {
  display: flex;
  background: #f4faff;
  align-items: center;
  justify-content: space-around;
  padding: 5px 10px;
  box-sizing: border-box;
  border-radius: 5px;
  color: #3da0fc;

  .custom-css {
    color: #343434;
    transform: rotate(90deg);
    margin-left: 8px;
  }
}
</style>
