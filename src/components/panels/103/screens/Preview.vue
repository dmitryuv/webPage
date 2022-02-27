<template>
  <div id="preview">
    <div class="cont">
      <div class="border">
        <div class="screen">
          <v-row class="ma-0">
            <v-col class="pa-0">
              <v-icon size="8" color="white">mdi-cog</v-icon>
            </v-col>
            <v-col class="pa-0 text-right">
              <v-icon size="8" color="white">$Wifi4</v-icon>
            </v-col>
          </v-row>
          <GridLayout
              :layout.sync="grid"
              :is-draggable="false"
              :is-resizable="false"
              :is-mirrored="false"
              :col-num="3"
              :max-rows="3"
              :row-height="10">
            <GridItem
                v-for="(item, i) in grid"
                :x="item.x"
                :y="item.y"
                :w="item.w"
                :h="item.h"
                :i="i"
                :key="i">
              {{ item.data }}
            </GridItem>
          </GridLayout>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VueGridLayout from 'vue-grid-layout';

  export default {
    name: "Preview",
    components: {
      GridLayout: VueGridLayout.GridLayout,
      GridItem: VueGridLayout.GridItem
    },
    data: () => ({
        grid: [
          {"x":0,"y":0,"w":2,"h":2, data: '1'},
        ]
    })
  }
</script>

<style lang="scss">
  #preview {
    margin-bottom: 15px;
    padding: 3px;

    .cont {
      background: #252525;
      border-radius: 5px;
      padding: 2px;

      .border {
        background: #0b0b0b;
        padding: 6px;

        .screen {
          background: #2c3041;
          height: 63px;
          width: 63px;
          padding: 0 5px;
        }
      }
    }
  }
</style>