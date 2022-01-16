<template>
  <div id="ItemMenu">
    <div class="background text-left pointer d-flex align-center justify-space-between">
      <div>{{ text }}</div>
      <div :class="[right_class, 'float-right']" v-if="right">{{ right }}</div>
      <v-icon v-if="right_icon" color="#249fff">{{ right_icon }}</v-icon>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ItemMenu",
    props: ['text', 'right', 'right_class', 'right_icon']
  }
</script>

<style lang="scss">
  #ItemMenu {
    width: 100%;

    .background {
      background: #202530;
      border-radius: 5px;
      padding: 15px 15px;
      color: #fff;
    }
  }

</style>