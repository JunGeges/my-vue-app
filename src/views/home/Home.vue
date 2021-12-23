<template>
  <div id="app">
    <van-nav-bar title="小基助手" left-arrow @click-left="onClickLeft">
      <template #left>
        <div class="left-box">
          默认分组
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

import { getFundGroup } from "network/cloudApi";
import { getFundBaseInfoByJR } from "network/api";
import { formatDate } from "common/utils";

export default {
  name: "home",
  data() {
    return {
      funds: [],
    };
  },
  components: {
    NoContent,
    BottomBar,
    HomeContent,
  },
  created() {
    // console.log('home created', this)
  },

  // http://fund.eastmoney.com/pingzhongdata/001186.js?v=20160518155842
  mounted() {
    this.getFundGroup()
      .then((res) => {
        this.funds = res;
        console.log({ res });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    onClickLeft() {
      this.$router.push({
        name: "fundgroup",
        params: { a: 1 },
      });
    },

    // 获取基金分组
    async getFundGroup() {
      try {
        const uid = "cc0c3074fe394600b922e2a8fca1f60c";
        const groupId = "b1482569";
        // 排除周末 往上推日期
        const startDate = formatDate(
          new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
          "yyyy-MM-dd"
        );
        const endDate = formatDate(new Date(), "yyyy-MM-dd");
        // 查询数据库存的基金
        const selfFunds = await getFundGroup(uid, groupId);
        // 拼接基金的code去请求详细信息
        const fundCodes = await this.getFundCodes(selfFunds.result);
        // 获取基金的详细信息
        const queryFundsInfo = await getFundBaseInfoByJR(
          fundCodes,
          startDate,
          endDate
        );
        console.log(queryFundsInfo);
        return this.handle(queryFundsInfo.data, selfFunds.result);
      } catch (error) {
        console.log(error);
      }
    },

    // 把数据库存的信息拼到接口获取的基金对象中
    handle(fundsInfoArr, source) {
      delete source.fundCode;
      return fundsInfoArr.map((item, index) => {
        if (this.isWeekend()) {
          item.expectWorth = item.netWorthData[item.netWorthData.length - 2][1];
        }
        return Object.assign(item, source[index]);
      });
    },

    async getFundCodes(funds) {
      console.log({ funds });
      let result = funds.reduce((accumulator, cur) => {
        return accumulator + cur.fundCode + ",";
      }, "");
      // 去掉最后一个,
      return result.slice(0, -1);
    },

    // 获取所有基金的总金额
    // 是否是周末
    isWeekend() {
      return [0, 6].includes(new Date().getDay());
    },
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
