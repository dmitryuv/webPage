<template>
  <div id="pass_input">
    <div class="background text-left relative">
      <label>{{ label }}</label>
      <input
          :type="show ? 'text' : 'password'"
          :value="inputVal"
          :placeholder="placeholder"
          :disabled="disabled"
          :append-icon="show ? 'eye-off' : 'eye'"
          @input="inputVal = $event.target.value"
          @click:append="show = !show">
      <v-icon v-if="show" color="white" class="float-right absolute" @click="show = !show">mdi-eye-off</v-icon>
      <v-icon v-if="!show" color="white" class="float-right absolute" @click="show = !show">mdi-eye</v-icon>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PassInput",
    props: ['label', 'value', 'placeholder', 'disabled'],
    data() {
      return {
        show: false
      }
    },
    computed: {
      inputVal: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit('onChange', val);
        }
      }
    }
  }
</script>

<style lang="scss">
  #pass_input {
    width: 100%;

    .background {
      background: #202530;
      border-radius: 5px;
      border-bottom: 2px solid #249fff;
      padding: 2px 15px;

      label {
        font-size: 13px;
        color: #249fff;
      }

      input {
        outline: 0;
        width: 100%;
        color: #fff;
        padding-right: 30px;
      }

      .v-icon {
        right: 10px;
      }
    }
  }

</style>