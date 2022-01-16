<template>
  <div id="panels">
    <v-container>
      <div class="panels_item text-center" v-for="panel in panels" :key="panel.id">
        <div class="panel_title">{{ panel.name }}</div>
        <div class="panels_item_body">
          <PanelPreview :data="panel"/>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
  import PanelPreview from "./PanelPreview";

  export default {
    name: 'Panels',
    components: {PanelPreview},
    data: () => ({
      panels: [
        {
          id: 1,
          name: 'Panel 1',
          grid_type: 1,
          devices: [],
        },
        {
          id: 2,
          name: 'Panel 2',
          grid_type: 2,
          devices: [],
        },
        {
          id: 3,
          name: 'Panel 3',
          grid_type: 3,
          devices: [],
        },
        {
          id: 4,
          name: 'Panel 4',
          grid_type: 4,
          devices: [],
        },
        {
          id: 5,
          name: 'Panel 5',
          grid_type: 5,
          devices: [],
        }
      ]
    }),
  }
</script>

<style lang="scss">
  #panels {
    .panels_item {
      width: 17vw;
      height: 17vw;
      display: inline-block;
      margin: 2.3vw;

      .panel_title {
        color: #fff;
        margin-bottom: 5px;
      }

      .panels_item_body {
        background: #2c3041;
        border: 1vw solid #000;
        border-radius: 3px;
      }
    }
  }
</style>