<template>
  <div class="add-container">
    <van-nav-bar title="小基助手·新增" left-arrow @click-left="back" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="fundCode"
        validate-first
        name="fundCode"
        label="持仓编码"
        placeholder="必填 点击输入"
        maxlength="6"
        type="digit"
        :rules="codeRules"
      />
      <van-field
        v-model="fundCount"
        type="number"
        name="positionAmount"
        label="持有份额"
        placeholder="选填 持有份额"
      />
      <van-field
        v-model="fundPrice"
        type="number"
        name="costUnitPrice"
        label="成本单价"
        placeholder="选填 成本单价"
      />
      <div style="margin: 16px">
        <van-button
          :color="isCanSave ? '#2895fc' : '#c6c6cc'"
          :disabled="!isCanSave"
          block
          type="primary"
          native-type="submit"
          >保存</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
const MAXLENGTH = 6;
import { addFundToGroup } from "network/cloudApi";
import { getFundDetailByTT } from "network/api";
export default {
  name: "MyVueAppAdd",

  data() {
    return {
      fundCode: "",
      fundCount: "",
      fundPrice: "",
      // 校验基金代码
      codeRules: [
        {
          required: true,
          message: "请输入基金编码",
          trigger: "onBlur",
        },
        {
          // 自定义校验规则
          validator: (value) => {
            return value.length === MAXLENGTH;
          },
          message: "请输入正确的基金编码",
          trigger: "onBlur",
        },
      ],
    };
  },

  computed: {
    isCanSave() {
      return this.fundCode.length > 0;
    },
  },

  mounted() {},

  methods: {
    back() {
      this.$router.go(-1);
    },

    async onSubmit(values) {
      console.log("submit", values);
      try {
        const uid = "cc0c3074fe394600b922e2a8fca1f60c";
        const groupId = "b1482569";
        // 先查出来是否有该基金
        await getFundDetailByTT(values.fundCode);
        // 插入分组中 需要参数 分组id
        let result = await addFundToGroup(uid, groupId, values);
        console.log(result);
        if (result.result?.updated === 1) {
          return this.$toast({
            message: "添加成功~",
            onClose: () => {
              this.$router.go(-1);
            },
          });
        }
        // 已经存在
        this.$toast(result.result);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.add-container /deep/ .van-nav-bar .van-icon {
  color: #333333 !important;
}
</style>