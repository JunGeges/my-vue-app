<template>
  <div class="add-container">
    <van-nav-bar title="小基助手·新增" left-arrow @click-left="back" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="fundCode"
        validate-first
        name="持仓编码"
        label="持仓编码"
        placeholder="必填 点击输入"
        maxlength="6"
        type="digit"
        :rules="codeRules"
      />
      <van-field
        v-model="fundCount"
        type="number"
        name="持有份额"
        label="持有份额"
        placeholder="选填 持有份额"
      />
      <van-field
        v-model="fundPrice"
        type="number"
        name="成本单价"
        label="成本单价"
        placeholder="选填 成本单价"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >保存</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
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
            console.log(value.length < 6);
            return !value.length < 6;
          },
          message: "请输入正确的基金编码",
          trigger: "onBlur",
        },
      ],
    };
  },

  mounted() {},

  methods: {
    back() {
      this.$router.go(-1);
    },

    validator(val) {
      return val.length < 6;
    },

    onSubmit(values) {
      console.log("submit", values);
    },
  },
};
</script>

<style lang="scss" scoped>
.add-container /deep/ .van-nav-bar .van-icon {
  color: #333333 !important;
}

.add-container /deep/ .van-form .van-field .van-button{
  background-color: #333333 !important;
}
</style>