<template>
  <div id="PanelPreview" class="text-center">
    <div class="grid_preview">
      grid_type: {{ data.grid_type }}
    </div>
  </div>
</template>

<script>
  export default {
    name: "PanelPreview",
    props: [
      'data',
    ]
  }
</script>

<style lang="scss">
  #PanelPreview {
    padding: 0.5vw;

    .grid_preview {
      background: #232834;
      border-radius: 5px;
      margin-top: 2vw;
      height: 12vw;
      width: 14vw;
    }
  }
</style>