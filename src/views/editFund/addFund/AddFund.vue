<template>
  <div class="add-fund-container">
    <van-nav-bar title="小基助手·加仓" left-arrow @click-left="back" />
    <div class="fund-box" v-if="fund">
      <van-cell
        :title="fund.SHORTNAME"
        :value="fund.FCODE"
        value-class="value-css"
      />
    </div>
    <van-form @submit="save">
      <van-cell-group title="加仓金额" :border="false">
        <van-field
          v-model="jcje"
          type="number"
          placeholder="点击输入金额"
          name="jcje"
        />
      </van-cell-group>
      <van-cell-group title="手续费/%" :border="false">
        <van-field
          v-model="sxf"
          type="number"
          placeholder="点击输入"
          name="sxf"
        />
      </van-cell-group>
      <van-cell-group
        title="加仓日期"
        :border="false"
        @click="showActionSheet = true"
      >
        <van-cell :value="jcrq" class="rq" />
      </van-cell-group>
      <van-button
        block
        :color="jcje > 0 ? '#2895fc' : '#c6c6cc'"
        :loading="isSave"
        type="info"
        native-type="submit"
        :disabled="!jcje > 0"
        loading-size="10px"
        loading-text="保存中"
        text="保存"
      />
    </van-form>
    <van-action-sheet
      v-model="showActionSheet"
      :actions="actions"
      close-on-click-action
      title="加仓日期"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { getJzList } from "network/api";
export default {
  name: "MyVueAppAddFund",

  data() {
    return {
      showActionSheet: false,
      jcje: "",
      sxf: 0.15,
      jcrq: '',
      actions: [],
      fund: null,
      isSave: false,
      jcrqIndex: 0,
    };
  },

  async mounted() {
    this.fund = this.$route.params;
    this.actions = await getJzList(this.fund.FCODE).then((res) => {
      return res.data.Datas;
    });
    this.actions = this.actions
      .map((item) => {
        return {
          DWJZ: item.DWJZ,
          name: item.FSRQ + " 15:00前",
        };
      })
      .reverse();
    this.jcrq = this.actions[0].name;
    console.log(this.actions);
  },

  methods: {
    back() {
      this.$router.go(-1);
    },

    save(e) {
      console.log(e);
      const formData = Object.assign(e, { DWJZ: this.actions[this.jcrqIndex].DWJZ })
      
    },

    onSelect(action, index) {
      this.jcrq = action.name;
      this.jcrqIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.add-fund-container {
  /deep/ .van-nav-bar {
    .van-icon {
      color: #333333 !important;
    }
  }

  .van-cell-group__title {
    font-size: 16px;
    color: #808080;
  }

  .fund-box {
    padding: 16px;
    border-bottom: 1px solid #efefef;
    .van-cell {
      background: #f4faff;
      border-radius: 6px;
      color: #2895fc;
      font-size: 14px;
    }
    .value-css {
      color: #a5a5a5;
      font-size: 12px;
    }
  }

  .van-field,
  .rq {
    border-bottom: 2px solid #f0f0f0 !important;
    width: calc(100vw - 32px);
    margin-left: 16px;
    padding: 10px 0;
  }

  .van-action-sheet {
    max-height: 40% !important;
  }

  .van-button {
    margin: 16px;
    width: calc(100vw - 32px);
    border-radius: 6px;
  }
}
</style>