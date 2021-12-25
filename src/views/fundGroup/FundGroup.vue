<template>
  <div class="fund-group-container">
    <van-nav-bar title="小基助手·分组切换" left-arrow @click-left="back" />
    <div v-if="!isEditing">
      <!-- item -->
      <div
        class="group-item"
        v-for="(item, index) in tempFundGroup"
        :class="{ 'active-border': activeIndex === index }"
        :key="index"
        @click="selectGroupItem(index)"
      >
        <div class="left">{{ item.name }}</div>
        <div class="right">
          包含基金<span>{{ item.fundCode.length }}{{ item.id }}</span
          >支
        </div>
      </div>
    </div>
    <!-- 编辑item -->
    <div v-else>
      <div
        class="edit-group-item"
        v-for="(item, index) in tempFundGroup"
        :key="index"
      >
        <van-field
          :value="item.name"
          v-model="item.name"
          :style="{ opacity: index === 0 ? 0.4 : 1 }"
          :readonly="index === 0"
        >
          <template #right-icon>
            <div class="icons">
              <van-icon
                name="down"
                color="#979797"
                @click="move(index, 'down')"
              />
              <van-icon
                name="down"
                color="#979797"
                @click="move(index, 'up')"
              />
              <van-icon
                class-prefix="my-icon"
                name="delete"
                color="red"
                @click="deleteGroup(index)"
              />
            </div>
          </template>
        </van-field>
      </div>
    </div>
    <!-- 添加按钮 -->
    <div class="add-btn" @click="addGroupItem">+ 新增分组</div>
    <!-- 管理/保存按钮 -->
    <div class="save-edit-box">
      <div
        class="btn"
        :class="[isEditing === 1 ? 'save-btn' : 'edit-btn']"
        @click="handleEditGroup"
      >
        {{ isEditing === 0 ? "分组管理" : "保存" }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserInfo, addFundGroup } from "network/cloudApi";
export default {
  name: "MyVueAppFundGroup",

  data() {
    return {
      activeIndex: 0,
      isEditing: 0,
      fundGroup: [],
      tempFundGroup: [],
    };
  },

  computed: {
    ...mapState(["groupIndex"]),
  },

  mounted() {
    this.activeIndex = this.groupIndex;
    getUserInfo().then((res) => {
      this.tempFundGroup = this.fundGroup = res.result.fundGroups;
    });
  },

  methods: {
    // 向下移动分组
    downGroup() {
      console.log("downGroup");
    },

    // 向上移动分组
    upGroup() {
      console.log("upGroup");
    },

    // 删除分组
    deleteGroup(index) {
      if (index === 0) return;
      this.$dialog
        .confirm({
          title: "确认删除?",
          confirmButtonColor: "#2895fc",
          message: "删除分组将删除分组内基金,确认删除?",
        })
        .then(() => {
          this.tempFundGroup.splice(index, 1);
        })
        .catch(() => {
          console.log("cancel");
        });
    },

    handleEditGroup() {
      this.isEditing = this.isEditing === 0 ? 1 : 0;
      console.log(this.isEditing);
      // 保存分组
      if (this.isEditing === 0) {
        addFundGroup(this.tempFundGroup).then(console.log);
      }
    },

    // 选中某个组
    selectGroupItem(index) {
      this.activeIndex = index;
      console.log(index);
    },

    addGroupItem() {
      if (this.tempFundGroup.length >= 5)
        return this.$toast("最多添加5个分组~");
      this.isEditing = 1;
      this.tempFundGroup.push({
        name: "新分组",
        fundCode: [],
        fundAmount: {},
        fundCost: {},
      });
      //
      console.log(this.tempFundGroup);
    },

    move(index, flag) {
      // 默认分组不编辑 最后一个不能往下移动
      const fundGroup = this.tempFundGroup;
      if (
        index === 0 ||
        (index === fundGroup.length - 1 && flag === "down") ||
        (index === 1 && flag === "up")
      )
        return;
      console.log("move");
      if (flag === "up") return this.frontMove(fundGroup, index);
      this.backMove(fundGroup, index);
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

    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.fund-group-container {
  background-color: #f5f7fb;
  height: 100vh;
  overflow-y: scroll;
  padding-bottom: 100px;
  box-sizing: border-box;
  /deep/ .van-nav-bar {
    .van-icon {
      color: #333333 !important;
    }
  }

  .group-item {
    margin: 16px 16px 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    // box-sizing: border-box;
    background: #fff;
    height: 60px;
    border-radius: 10px;
    .left {
      color: #343434;
      font-size: 16px;
    }

    .right {
      color: #c3c3c3;
      font-size: 12px;

      span {
        margin: 0 4px;
      }
    }
  }

  .add-btn {
    margin: 16px 16px 0 16px;
    background: #fff;
    height: 60px;
    border-radius: 10px;
    color: #2895fc;
    font-size: 16px;
    text-align: center;
    line-height: 60px;
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
    }

    .edit-btn {
      border: 1px solid #2895fc;
      color: #2895fc;
    }

    .save-btn {
      background: #2895fc;
    }
  }

  .edit-group-item {
    margin: 16px 16px 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    // padding: 0 16px;
    // box-sizing: border-box;
    background: #fff;
    height: 60px;
    border-radius: 10px;
    /deep/ .van-field__control {
      background-color: #f0f0f0;
      height: 40px;
      border-radius: 6px;
      padding: 0 10px;
      box-sizing: border-box;
    }
    .icons {
      display: flex;
      align-items: center;
      justify-content: space-around;
      & :nth-child(2) {
        transform: rotate(180deg);
      }
      /deep/ .van-icon {
        margin-left: 10px;
      }
    }
  }

  .active-border {
    border: 2px solid #2895fc;
  }

  .active-font-color {
    color: #2895fc;
  }
}
</style>