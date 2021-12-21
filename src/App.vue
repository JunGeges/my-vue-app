<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},

  created() {
    // 初始化vuex,vuex数据持久化
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("vuex", JSON.stringify(this.$store.state));
    });

    try {
      localStorage.getItem("vuex") &&
        this.$store.replaceState(
          Object.assign(
            {},
            this.$store.state,
            JSON.parse(localStorage.getItem("vuex"))
          )
        );
    } catch (err) {
      console.log(err);
    }
    // localStorage.removeItem("list");
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
@import url("./assets/css/base.css");
</style>

