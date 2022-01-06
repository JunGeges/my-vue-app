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
    <van-action-sheet
      v-model="showGroupSheet"
      v-if="userInfo"
      @close="closeGroupAction"
    >
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
      <template v-if="funds.length">
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
      </template>
      <div v-else class="no-data">暂无数据</div>
    </div>
    <div class="btns">
      <van-button
        plain
        hairline
        type="info"
        :color="opreationFunds.length ? '#2895fc' : '#cacacf'"
        size="small"
        block
        text="复制到"
        :disabled="opreationFunds.length ? false : true"
        class="vb"
        @click="copyFund"
      />
      <van-button
        plain
        hairline
        type="info"
        :color="opreationFunds.length ? '#2895fc' : '#cacacf'"
        size="small"
        block
        :disabled="opreationFunds.length ? false : true"
        text="移动到"
        class="vb"
        @click="moveFund"
      />
      <van-button
        :color="opreationFunds.length ? '#ff605c' : '#c6c6cc'"
        size="small"
        type="primary"
        block
        class="vb"
        :disabled="opreationFunds.length ? false : true"
        :text="
          opreationFunds.length ? '删除(' + opreationFunds.length + ')' : '删除'
        "
        @click="deleteFund"
      />
      <van-button
        :loading="isSave"
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

import { getUserInfo, updateFundGroups } from "network/cloudApi";
import { getFundDetail } from "network/api";

export default {
  name: "MyVueAppOperationFund",

  data() {
    return {
      isOperation: false, //是否是复制或者移动状态
      isMove: false, // 批量操作时，区分移动还是复制
      isSave: false, //是否保存中
      edited: false, // 是否有过操作动作
      showActionSheet: false,
      showGroupSheet: false,
      curGroupIndex: 0,
      curSelectFundIndex: -1,
      userInfo: null,
      funds: [],
      opreationFunds: [],
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

  beforeRouteLeave(to, from, next) {
    // TODO 有问题待研究----------------------
    // if (this.edited) {
    //   console.log("离开");
    //   // 提醒是否保存
    //   return this.$dialog
    //     .confirm({
    //       title: "提示",
    //       message: "未保存修改将不会生效，确认返回?",
    //     })
    //     .then(() => {
    //       this.edited = false;
    //       console.log(this.edited);
    //       // this.back();
    //       next();
    //     })
    //     .catch(() => {
    //       next(false);
    //     });
    // }
    next();
  },

  methods: {
    back() {
      if (this.edited) {
        // 提醒是否保存
        return this.$dialog
          .confirm({
            title: "提示",
            message: "未保存修改将不会生效，确认返回?",
          })
          .then(() => {
            this.edited = false;
            this.$router.go(-1);
          })
          .catch(() => {});
      }
      this.$router.go(-1);
    },

    // action sheet 弹窗
    editAction(e, index) {
      const funs = [
        this.stickyFund,
        this.copyFund,
        this.moveFund,
        this.deleteFund,
      ];
      funs[index](this.curSelectFundIndex);
    },

    closeGroupAction() {
      this.isOperation = false;
      this.isMove = false;
    },

    // 显示编辑弹窗
    isShowActionSheet(index) {
      this.showActionSheet = true;
      this.curSelectFundIndex = index;
    },

    // 选择分组
    async selectGroup(index) {
      // 复制移动基金
      if (this.isOperation) {
        // this.$toast("复制或者移动中");
        // toIndex=>index fromIndex=> curGroupIndex funds => [] 1 or 多个

        // 目标分组不包含操作的基金
        const noExistFunds = [];
        // 目标分组包含的操作基金
        const existFunds = [];
        this.opreationFunds.forEach((item) => {
          (this.userInfo.fundGroups[index].fundCode.includes(item)
            ? existFunds
            : noExistFunds
          ).push(item);
        });

        // 目标分组添加基金代码 (代码,单价,份额)
        // 代码
        this.userInfo.fundGroups[index].fundCode = [
          ...this.userInfo.fundGroups[index].fundCode,
          ...noExistFunds,
        ];
        // 单价,份额
        noExistFunds.forEach((item) => {
          this.userInfo.fundGroups[index].fundAmount[item] =
            this.userInfo.fundGroups[this.curGroupIndex].fundAmount[item];
          this.userInfo.fundGroups[index].fundCost[item] =
            this.userInfo.fundGroups[this.curGroupIndex].fundCost[item];
        });
        if (this.isMove) {
          // 更新页面组装的基金数组
          this.funds = this.funds.filter(
            (item) => !noExistFunds.includes(item.FCODE)
          );
          // 如果是移动，则移除当前分组选中基金 (代码,单价,份额)
          this.userInfo.fundGroups[this.curGroupIndex].fundCode =
            this.userInfo.fundGroups[this.curGroupIndex].fundCode.filter(
              (item) => {
                if (noExistFunds.includes(item)) {
                  delete this.userInfo.fundGroups[this.curGroupIndex].fundCost[
                    item
                  ];
                  delete this.userInfo.fundGroups[this.curGroupIndex]
                    .fundAmount[item];
                }
                return !noExistFunds.includes(item);
              }
            );
          this.isMove = false;
        }
        this.isOperation = false;
        this.showGroupSheet = false;
        // 批量复制完修改状态
        this.funds = this.funds.map((item) => {
          item.select = false;
          return item;
        });
        this.opreationFunds = [];
        return !existFunds.length
          ? this.$toast.success({
              message: "操作成功",
            })
          : this.$dialog.alert({
              title: "操作部分成功",
              message: `由于目的分组包含重名基金，以下基金未操作:${existFunds.join(
                ","
              )}`,
              confirmButtonText: "知道了",
              confirmButtonColor: "#2895fc",
            });
      }
      // 切换分组
      this.showGroupSheet = false;
      this.curGroupIndex = index;
      const fundCode = this.userInfo.fundGroups[this.curGroupIndex].fundCode;
      this.funds = fundCode.length
        ? await getFundDetail(fundCode.join(",")).then((res) => {
            return res.data.Datas;
          })
        : [];
    },

    // 选中基金
    selectItem(index) {
      this.funds[index].select = !this.funds[index].select;
      // 选中的基金
      this.opreationFunds = this.selectedFund(this.funds);
    },

    initData() {
      this.getFundDetail().then((res) => {
        if (res === "err") return this.$toast("该组内无基金~");
        this.funds = this.getFunds(res);
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
      flag === "up"
        ? this.frontMove(this.funds, index)
        : this.backMove(this.funds, index);
      this.edited = true;
      // 更新userInfo fundCode顺序
      this.userInfo.fundGroups[this.curGroupIndex].fundCode = [];
      this.funds.forEach((item) => {
        this.userInfo.fundGroups[this.curGroupIndex].fundCode.push(item.FCODE);
      });
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
    selectedFund(funds) {
      return funds.reduce((acc, cur) => {
        // 由于push返回长度 所以用concat 返回新数组
        return cur.select ? (acc = acc.concat(cur)) : acc;
      }, []);
    },

    // 置顶基金
    stickyFund(index) {
      // 第一个不需要置顶
      if (index === 0) return this.$toast("大兄弟,已经在顶了~");
      this.edited = true;
      // 移除原来位置的对象,并保存
      const deleteItem = this.funds.splice(index, 1)[0];
      this.funds.unshift(deleteItem);

      const fundCode = this.userInfo.fundGroups[this.curGroupIndex].fundCode;
      const item = fundCode.splice(index, 1)[0];
      fundCode.unshift(item);
    },

    // 复制基金到分组
    copyFund(index) {
      this.showGroupSheet = true;
      this.isOperation = true;
      this.edited = true;
      // 复制一个
      if (Object.prototype.toString.call(index) === "[object Number]")
        return this.opreationFunds.push(this.funds[index].FCODE);
      //  批量复制
      this.opreationFunds = this.opreationFunds.map((item) => {
        // 数据格式兼容
        return item.FCODE ? item.FCODE : item;
      });
    },

    // 删除基金
    deleteFund(index) {
      this.edited = true;
      // 删除一个
      this.$dialog
        .confirm({
          title: "提示",
          confirmButtonColor: "#2895fc",
          message:
            this.opreationFunds.length === 1
              ? "确认删除该基金?"
              : `确认删除选中的 ${this.opreationFunds.length} 只基金?`,
        })
        .then(() => {
          const fundGroup = this.userInfo.fundGroups[this.curGroupIndex];
          if (Object.prototype.toString.call(index) === "[object Number]") {
            // 移除组装后的数组
            this.funds.splice(index, 1);
            // 移除userInfo的
            const deleteFund = fundGroup.fundCode.splice(index, 1)[0];
            delete fundGroup.fundAmount[deleteFund];
            delete fundGroup.fundCost[deleteFund];
            return;
          }
          // 删除多个
          this.opreationFunds = this.opreationFunds.map((item) => {
            // 数据格式兼容
            return item.FCODE ? item.FCODE : item;
          });
          this.funds = this.funds.filter(
            (item) => !this.opreationFunds.includes(item.FCODE)
          );

          fundGroup.fundCode = fundGroup.fundCode.filter((item) => {
            if (this.opreationFunds.includes(item)) {
              delete fundGroup.fundCost[item];
              delete fundGroup.fundAmount[item];
            }
            return !this.opreationFunds.includes(item);
          });
        })
        .catch(() => {});
    },

    // 移动单个基金到其他分组
    moveFund(index) {
      this.copyFund(index);
      this.isMove = true;
    },

    // 保存操作
    async saveEdit() {
      this.isSave = true;
      if (!this.edited) return this.back();
      // 接口请求，保存配置
      updateFundGroups(this.userInfo.fundGroups).then((res) => {
        // console.log(res);
        this.isSave = false;
        this.edited = false;
        this.back();
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
    .no-data {
      font-size: 14px;
      color: #b3b3b3;
      text-align: center;
    }
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