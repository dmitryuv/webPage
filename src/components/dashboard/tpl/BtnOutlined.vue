<template>
  <v-btn class="btn_outlined" :class="fw ? 'w-100' : null" color="#249fff" outlined>{{ text }}</v-btn>
</template>

<script>
  export default {
    name: "BtnOutlined",
    props: ['text', 'fw']
  }
</script>

<style lang="scss">
  .btn_outlined {
    .v-btn__content {
      color: #fff;
    }
  }
</style>