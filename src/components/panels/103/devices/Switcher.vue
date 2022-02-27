<template>
  <div :ref="'device'+_uid" id="switcher" :class="['device relative', selected?'selected':null]">
    <v-icon :ref="'icon'+_uid" class="center_transform">$Lamp</v-icon>
  </div>
</template>

<script>
  export default {
    name: "Switcher",
    props: ['selected', 'gridItem'],
    data: () => ({}),
    mounted() {
      if (this.gridItem) {
        let width = this.$refs['device'+this._uid].clientWidth
        let height = this.$refs['device'+this._uid].clientHeight
        this.resizeIcon(width, height)
      }
    },
    methods: {
      resizeIcon(width, height) {
        let size = 0
        if (width < height) {
          size = width
        } else {
          size = height
        }
        size = size / 3
        this.$refs['icon'+this._uid].$children[0].$el.style.height = size
        this.$refs['icon'+this._uid].$children[0].$el.style.width = size
      }
    }
  }
</script>

<style lang="scss">
  #switcher {
    border: 1px solid #3a4056;
    border-radius: 9px;
    background: #2c3041;
    height: 100%;
    width: 100%;

    &.selected {
      border-color: #0455bf;
    }
  }
</style>