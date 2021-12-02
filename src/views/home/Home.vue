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
    <no-content></no-content>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import * as api from "network/api";
import NoContent from "components/common/NoContent/NoContent";
import BottomBar from "components/content/BottomBar";

export default {
  name: "home",
  components: {
    NoContent,
    BottomBar,
  },
  created() {
    // console.log('home created', this)
  },

  // http://fund.eastmoney.com/pingzhongdata/001186.js?v=20160518155842
  mounted() {
    // console.log('home mounted', this.$router);
    api
      .getFundDetailByTT("003")
      .then((res) => {
        console.log(`%c ${res}`, "font-size:40px;color:red");
      })
      .catch((err) => {
        console.warn(err);
      });
    // console.log(
    //   api.getFundCurrentInfoByTT("00307").then(console.log).catch((err) => {
    //     console.log(err, "铺货了吗");
    //   })
    // );
    // api.getFundDetailByJR("003017").then(console.log);
    // api.getFundBaseInfoByJR("003017").then(console.log);
    // api.getFundRankByJR().then(console.log);
    // api.getAllFundByJR();
  console.log(   api
      .getFundPositionByJR(123)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.warn(err)))
  },

  methods: {
    onClickLeft() {
      this.$router.push({
        name: "fundgroup",
        params: { a: 1 },
      });
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
