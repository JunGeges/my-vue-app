<template>
  <div class="income-calendar-container">
    <van-nav-bar title="小基助手·收益日历" left-arrow @click-left="back" />
    <!-- <div>
      <div>2022年1月</div>
      <div>+15155</div>
    </div> -->
    <van-calendar
      title="默认分组"
      v-model="showCalendar"
      :poppable="false"
      :formatter="formatter"
      readonly
      color="rgba(0,0,0,0)"
      :show-confirm="false"
      :max-date="date"
    />
  </div>
</template>

<script>
export default {
  name: "MyVueAppIncomecalendar",

  data() {
    return {
      showCalendar: true,
      date: new Date(),
    };
  },

  mounted() {},

  methods: {
    formatter(day) {
      const incomes = [
        { "2022-01-04": "2320" },
        { "2022-01-05": "-728.34" },
        { "2022-01-06": "542.41" },
        { "2022-01-07": "188.1" },
        { "2022-01-10": "54.39" },
        { "2022-01-11": "1542.8" },
        { "2022-01-12": "-2542.24" },
        { "2022-01-13": "-200.24" },
        { "2022-01-14": "602" },
      ];
      const month = day.date.getMonth() + 1;
      const date = day.date.getDate();
      const splitItemIncomes = incomes.map((item) => {
        return Object.keys(item)[0].split("-");
      });

      for (let x = 0; x < splitItemIncomes.length; x++) {
        const splitItemIncome = splitItemIncomes[x];
        for (let y = 0; y < splitItemIncome.length; y++) {
          if (month == splitItemIncome[1]) {
            if (date == splitItemIncome[2]) {
              const value = Object.values(incomes[x])[0];
              day.bottomInfo = value > 0 ? "+"+value : value;
              day.className = value > 0 ? "hong" : "lv";
            }
          }
        }
      }
      return day;
    },

    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.income-calendar-container {
  /deep/ .van-nav-bar {
    .van-icon {
      color: #333333 !important;
    }
  }

  /deep/ .hong {
    background: #ff605c !important;
    color: #fff !important;
  }

  /deep/ .lv {
    background: #48a1ad !important;
    color: #fff !important;
  }

  .van-calendar__day--disabled {
    color: inherit;
    // background: #333333 !important;
  }

  .van-calendar__header {
    box-shadow: 0 5px 10px rgba(125, 126, 128, 0.16);
  }
}
</style>