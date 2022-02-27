<template>
  <div id="types" class="text-left">
    <div class="grid_sensors">
      <h3>Датчик</h3>
      <grid-layout
          :layout="getTypesGrid.sensors"
          :is-draggable="false"
          :is-resizable="false"
          :is-mirrored="false"
          :col-num="3"
          :max-rows="3"
          :row-height="65">
        <grid-item
            v-for="item in getTypesGrid.sensors"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            :key="item.i">
          <Sensor :selected="selected == `${item.type}_${item.w}_${item.h}`" @click.native="onSelect(item)"/>
        </grid-item>
      </grid-layout>
    </div>

    <div class="grid_sensors mt-2">
      <h3>Выключатель</h3>
      <grid-layout
          :layout="getTypesGrid.switchers"
          :is-draggable="false"
          :is-resizable="false"
          :is-mirrored="false"
          :col-num="3"
          :max-rows="3"
          :row-height="65">
        <grid-item
            v-for="item in getTypesGrid.switchers"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            :key="item.i">
          <Switcher :selected="selected == `${item.type}_${item.w}_${item.h}`" @click.native="onSelect(item)"/>
        </grid-item>
      </grid-layout>
    </div>

    <div class="grid_switchers mt-2">
      <h3>Термостат</h3>
      <grid-layout
          :layout="getTypesGrid.thermostats"
          :is-draggable="false"
          :is-resizable="false"
          :is-mirrored="false"
          :col-num="3"
          :max-rows="3"
          :row-height="65">
        <grid-item
            v-for="item in getTypesGrid.thermostats"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            :key="item.i">
          <template v-if="item.type === 'thermostat'">
            <Thermostat :size="item.h" :selected="selected == `${item.type}_${item.w}_${item.h}`" @click.native="onSelect(item)"/>
          </template>
          <template v-if="item.type === 'conditioner'">
            <Conditioner :size="item.w" :selected="selected == `${item.type}_${item.w}_${item.h}`" @click.native="onSelect(item)"/>
          </template>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {GridLayout, GridItem} from "vue-grid-layout"

  import Sensor from "../devices/Sensor";
  import Switcher from "../devices/Switcher";
  import Thermostat from "../devices/Thermostat";
  import Conditioner from "../devices/Conditioner";

  export default {
    name: "Types",
    components: {
      Conditioner,
      Thermostat,
      Switcher,
      Sensor,
      GridLayout,
      GridItem
    },
    data: () => ({
      selected: null,
    }),
    computed: {
      ...mapGetters([
        'getSelectedType',
        'getTypesGrid',
      ])
    },
    methods: {
      ...mapActions([
        'setDevicesGrid',
      ]),
      onSelect(item) {
        this.selected = `${item.type}_${item.w}_${item.h}`
        this.setDevicesGrid({type: item.type, size: {h: item.h, w: item.w}})
      }
    }
  }
</script>

<style lang="scss">
  #types {
    width: 260px;
    padding: 20px;

    h3 {
      padding-left: 10px;
      font-size: 16px;
    }
  }
</style>