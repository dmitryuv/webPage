<template>
  <div id="ItemCheck" class="my-2">
    <div class="background text-left pointer">
      {{ text }} <v-icon class="float-right" v-if="active" color="#249fff">mdi-check</v-icon>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ItemCheck",
    props: ['text', 'active']
  }
</script>

<style lang="scss">
  #ItemCheck {
    width: 100%;

    .background {
      background: #202530;
      border-radius: 5px;
      padding: 15px 15px;
      color: #fff;
    }
  }

</style>