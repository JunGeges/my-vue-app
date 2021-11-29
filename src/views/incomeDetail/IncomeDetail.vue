<template>
  <div class="income-detail-container">
    <van-nav-bar title="小基助手·盈亏详情" left-arrow @click-left="back" />
    <van-cell
      title="默认分组"
      center
      title-class="title-css"
      @click="show = true"
    >
      <template #right-icon>
        <span>点击切换分组</span>
        <van-icon name="exchange" color="#808080" />
      </template>
    </van-cell>
    <van-action-sheet v-model="show">
      <van-cell
        v-for="item in [1, 2]"
        :key="item"
        title="默认分组"
        center
        title-class="title-css"
        value="包含基金1只"
        @click="show = true"
      >
      </van-cell>
    </van-action-sheet>
    <!-- 详情 -->
    <div class="income-detail-box">
      <div class="all-money">
        <div>2027.5</div>
        <div>总持仓</div>
      </div>
      <div class="income-detail">
        <div class="id-item">
          <div>+527.5</div>
          <div>持有收益</div>
        </div>
        <div class="id-item">
          <div>+35.17%</div>
          <div>持有收益率</div>
        </div>
        <div class="id-item">
          <div>+0.61</div>
          <div>当日收益</div>
        </div>
        <div class="id-item">
          <div>+0.03%</div>
          <div>当日收益率</div>
        </div>
        <div class="id-item">
          <div>0</div>
          <div>已更新收益</div>
        </div>
        <div class="id-item">
          <div>+0.61</div>
          <div>待更新收益</div>
        </div>
      </div>
    </div>

    <!-- 分享 -->
    <div class="share-box">
      <div class="btn" @click="shareIncome">分享</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyVueAppIncomeDetail",

  data() {
    return {
      show: false,
    };
  },

  mounted() {},

  methods: {
    back() {
      this.$router.go(-1);
    },

    shareIncome() {},
  },
};
</script>

<style lang="scss" scoped>
.income-detail-container {
  /deep/ .van-nav-bar {
    .van-icon {
      color: #333333 !important;
    }
  }

  span {
    margin-right: 8px;
  }

  .van-cell {
    background: #f4faff;
    color: #d6dade;
    margin: 16px;
    border-radius: 6px;
    width: calc(100vw - 32px);
  }

  .title-css {
    color: #2895fc;
    font-size: 15px;
  }

  .income-detail-box {
    .all-money {
      margin-top: 30px;
      text-align: center;
      & :first-child {
        font-weight: bold;
        color: black;
        font-size: 20px;
      }
      & :last-child {
        color: #b3b3b3;
        font-size: 12px;
      }
    }
    .income-detail {
      display: flex;
      flex-wrap: wrap;
      .id-item {
        width: 50%;
        text-align: center;
        margin-top: 30px;
        & :first-child {
          font-weight: bold;
          color: #ff605c;
          font-size: 20px;
        }
        & :last-child {
          color: #b3b3b3;
          font-size: 12px;
        }
      }
    }
  }

  .share-box {
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