<template>
  <h4>You are {{ region }} page.</h4>
</template>

<script>
export default {
  data() {
    return {
      region: this.$route.params.region
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.region = to.params.region;
    next();
  },
  mounted() {}
};
</script>

<style lang="stylus" scoped></style>
