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
    console.log(this.$router);
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import url("./assets/css/base.css");
</style>

