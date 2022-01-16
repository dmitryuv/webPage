<template>
  <div id="text_input">
    <div class="background text-left">
      <label>{{ label }}</label>
      <input type="text" :value="inputVal" :placeholder="placeholder" :disabled="disabled" @input="inputVal = $event.target.value">
    </div>
  </div>
</template>

<script>
  export default {
    name: "TextInput",
    props: ['label', 'value', 'placeholder', 'disabled'],
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
  #text_input {
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
      }
    }
  }

</style>