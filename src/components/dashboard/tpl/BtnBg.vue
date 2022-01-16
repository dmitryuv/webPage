<template>
  <v-btn class="btn_bg" :class="fw ? 'w-100' : null" color="#249fff">{{ text }}</v-btn>
</template>

<script>
  export default {
    name: "BtnBg",
    props: ['text', 'disabled', 'fw']
  }
</script>

<style lang="scss">
  .btn_bg {
    .v-btn__content {
      color: #fff;
    }
  }
</style>