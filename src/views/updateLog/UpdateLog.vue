<template>
  <div class="update-log-container">
    <van-nav-bar title="小基助手·更新日志" left-arrow @click-left="back" />
    <div class="log-ul" v-for="(item, index) in logs" :key="index">
      <div class="log-li">
        <div class="li-title">{{ item.versionNumber }}</div>
        <div class="li-info">
          <div v-for="(item, index) in item.log" :key="index">
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getVersionLog } from "network/cloudApi";
export default {
  name: "MyVueAppUpdateLog",

  data() {
    return {
      logs: [],
    };
  },

  mounted() {
    this.getData();
  },

  methods: {
    back() {
      this.$router.go(-1);
    },

    getData() {
      getVersionLog.call(this).then((res) => {
        this.logs = res.data;
        // console.log('res----', res.data);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.update-log-container {
  /deep/ .van-nav-bar {
    .van-icon {
      color: #333333 !important;
    }
  }

  .log-ul {
    margin: 0 16px;
    .log-li {
      margin-top: 16px;
      .li-title {
        color: #333333;
        font-weight: 600;
        margin-bottom: 10px;
        font-size: 14px;
      }

      .li-info {
        background-color: #f0f0f0;
        color: #343434;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 8px;
        line-height: 30px;
        font-size: 16px;
        div {
          display: flex;
          align-items: center;
          // justify-content: space-between;
          &::before {
            content: "";
            width: 5px;
            height: 5px;
            background: #8a8a8a;
            margin-right: 10px;
            border-radius: 50%;
            flex-shrink: 0;
          }
        }
      }
    }
  }
}
</style>