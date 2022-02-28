<template>
  <div id="panels" class="text-center">
    <Types/>
    <v-spacer/>
    <div class="panel">
      <h2 class="my-3">Панель {{ getDrawerDevice['id'] }}</h2>

      <v-dialog v-model="preset_dialog" persistent max-width="410" content-class="presets_dialog">
        <v-card dark color="#232834">
          <v-card-title>Выберите разметку</v-card-title>
          <v-card-text>
            <div class="presets">
              <div
                  v-for="(preset, index) in getPanelPresets"
                  :key="index"
                  class="preset d-inline-block pointer"
                  :class="preset_selected == index ? 'selected' : null"
                  @click="preset_selected = index">
                <div class="preset_grid">
                  <grid-layout
                      :layout="preset"
                      :is-draggable="false"
                      :is-resizable="false"
                      :is-mirrored="false"
                      :prevent-collision="true"
                      :margin="[4, 4]"
                      :col-num="3"
                      :max-rows="3"
                      :row-height="15">
                    <grid-item
                        v-for="item in preset"
                        :x="item.x"
                        :y="item.y"
                        :w="item.w"
                        :h="item.h"
                        :i="item.i"
                        :key="item.i">
                      <div class="preset_area"/>
                    </grid-item>
                  </grid-layout>
                </div>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#151515" @click="preset_dialog = false">Отмена</v-btn>
            <v-btn color="#0455bf" @click="onAddPanel">Добавить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <div class="presets">
        <div v-for="(panel, index) in panels"
             :key="index"
             class="preset d-inline-block pointer"
             :class="selected_panel == index ? 'selected' : null"
             @click="selected_panel = index">
          <div class="preset_grid relative">
            <v-icon class="preset_del_icon absolute pointer" color="white" @click="onPresetDel(index)">mdi-close</v-icon>
            <grid-layout
                :layout="panel"
                :is-draggable="false"
                :is-resizable="false"
                :is-mirrored="false"
                :prevent-collision="true"
                :margin="[4, 4]"
                :col-num="3"
                :max-rows="3"
                :row-height="15">
              <grid-item
                  v-for="item in panel"
                  :x="item.x"
                  :y="item.y"
                  :w="item.w"
                  :h="item.h"
                  :i="item.i"
                  :key="item.i">
                <div class="preset_area"/>
              </grid-item>
            </grid-layout>
          </div>
        </div>
        <div class="preset d-inline-block" v-if="panels.length < 3">
          <div class="preset_grid preset_grid_add relative pointer" @click="preset_dialog = true">
            <v-icon color="white" class="center_transform">mdi-plus</v-icon>
          </div>
        </div>
      </div>

      <div class="border">
        <div class="screen">
          <v-row class="ma-0">
            <v-col class="text-right">
              <template v-if="panels.length && selected_panel > 0">
                <v-icon size="24" color="white" @click="selected_panel--">mdi-chevron-left</v-icon>
              </template>
              <template v-else>
                <v-icon size="24" color="gray">mdi-chevron-left</v-icon>
              </template>
            </v-col>
            <v-col class="text-center">{{ panels.length ? selected_panel + 1 : '-' }}</v-col>
            <v-col class="text-left">
              <template v-if="panels.length && panels.length - 1 > selected_panel">
                <v-icon size="24" color="white" @click="selected_panel++">mdi-chevron-right</v-icon>
              </template>
              <template v-else>
                <v-icon size="24" color="gray">mdi-chevron-right</v-icon>
              </template>
            </v-col>
          </v-row>
          <div id="screen_grid" class="grid" ref="gridlayout">
            <grid-layout
                v-if="panels.length && selected_panel != null"
                :layout.sync="panels[selected_panel]"
                :is-draggable="false"
                :is-resizable="false"
                :is-mirrored="false"
                :prevent-collision="true"
                :col-num="3"
                :max-rows="3"
                :row-height="120">
              <grid-item
                  v-for="item in panels[selected_panel]"
                  :x="item.x"
                  :y="item.y"
                  :w="item.w"
                  :h="item.h"
                  :i="item.i"
                  :key="item.i"
                  :data-slot="JSON.stringify(item)">
                <div class="del_cont relation hw100">
                  <template v-if="item.device != null">
                    <v-icon class="del_icon absolute pointer" color="white" @click="onDel(item.i)">mdi-close</v-icon>
                    <Sensor :gridItem="item" v-if="item.device.type === 'sensor'"/>
                    <Switcher :gridItem="item" v-if="item.device.type === 'switcher'"/>
                    <Thermostat :gridItem="item" v-if="item.device.type === 'thermostat'"/>
                    <Conditioner :gridItem="item" v-if="item.device.type === 'conditioner'"/>
                  </template>
                </div>
              </grid-item>
            </grid-layout>
          </div>
        </div>
      </div>
    </div>
    <v-spacer/>
    <div class="devices text-left">
      <h3>Доступные устройства</h3>
      <grid-layout
          :layout="getDevicesGrid"
          :is-draggable="false"
          :is-resizable="false"
          :is-mirrored="false"
          :col-num="3"
          :max-rows="3"
          :row-height="65">
        <grid-item
            v-for="item in getDevicesGrid"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            :key="item.i">
          <template v-if="uniqDev(item.i)">
            <div v-if="item.device.type === 'switcher'" @dragend="dragend(item)" class="droppable-element" draggable="true" unselectable="on">
              <Switcher/>
            </div>
            <div v-if="item.device.type === 'thermostat'" @dragend="dragend(item)" class="droppable-element" draggable="true" unselectable="on">
              <Thermostat :size="item.h" :selected='false'/>
            </div>
            <div v-if="item.device.type === 'conditioner'" @dragend="dragend(item)" class="droppable-element" draggable="true" unselectable="on">
              <Conditioner :size="item.w" :selected='false'/>
            </div>
          </template>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {GridLayout, GridItem} from "vue-grid-layout"

  import Types from "./Types";
  import Sensor from "../devices/Sensor";
  import Switcher from "../devices/Switcher";
  import Thermostat from "../devices/Thermostat";
  import Conditioner from "../devices/Conditioner";

  let mouseXY = {"x": null, "y": null};

  export default {
    name: "Screen",
    components: {
      Conditioner,
      Thermostat,
      Switcher,
      GridLayout,
      GridItem,
      Types,
      Sensor
    },
    data: () => ({
      preset_dialog: false,
      preset_selected: null,
      panels: [],
      selected_panel: 0,
    }),
    mounted() {
      document.addEventListener("dragover", function (e) {
        mouseXY.x = e.clientX;
        mouseXY.y = e.clientY;
      }, false);
    },
    watch: {
      preset_dialog() {
        this.preset_selected = null
      }
    },
    computed: {
      ...mapGetters([
        'getSize',
        'getPanelPresets',
        'getDevicesGrid',
        'getDrawerDevice',
      ]),
    },
    methods: {
      ...mapActions([
        'setSize',
        'addDevicesGridItem',
      ]),
      onAddPanel() {
        this.panels.push(this.getPanelPresets[this.preset_selected])

        this.preset_dialog = false
      },
      dragend: function (device) {
        let parentRect = document.getElementById('screen_grid').getBoundingClientRect();
        let mouseInGrid = false;
        if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
          mouseInGrid = true;
        }
        if (mouseInGrid === true) {
          if (this.$refs.gridlayout.children.length) {
            let slots = this.$refs.gridlayout.children[0].children

            if (slots.length) {
              let dropped_cel_index = null

              for (let i = 0; i < slots.length - 2; i++) {
                let slot = slots[i].getBoundingClientRect()
                if (((mouseXY.x > slot.left) && (mouseXY.x < slot.right)) && ((mouseXY.y > slot.top) && (mouseXY.y < slot.bottom))) {
                  dropped_cel_index = i
                  break
                }
              }

              if (dropped_cel_index !== null) {
                let available_types = this.panels[this.selected_panel][dropped_cel_index].devices
                if (available_types.indexOf(device.device.type) >= 0) {
                  this.panels[this.selected_panel][dropped_cel_index].device = device.device
                  this.$forceUpdate();
                }
              }
            }
          }
        }
      },
      onPresetDel(i) {
        this.panels.splice(i, 1);
      },
      onDel(i) {
        this.panels[this.selected_panel][i - 1].device = null
        this.$forceUpdate();
      },
      uniqDev(id) {
        if (this.panels.length && this.selected_panel != null) {
          for (let panel of this.panels) {
            for (let item of panel) {
              if (item.device && item.device.id === id) {
                return false
              }
            }
          }
        }
        return true
      }
    }
  }
</script>

<style lang="scss">
  .presets_dialog {
    .presets {
      .preset {
        background: #000;
        border-radius: 3px;
        margin: 0 10px;
        height: 100px;
        width: 100px;
        padding: 15px;

        &.selected {
          border: 1px solid #0455bf;
        }

        .preset_grid {
          background: #2c3041;
          height: 100%;
          width: 100%;
          padding: 8px 2px 2px;

          .vue-grid-layout {
            background: #232834;
          }

          .preset_area {
            background: #0455bf;
            border-radius: 2px;
            height: 100%;
            width: 100%;
          }
        }
      }
    }
  }

  #panels {
    display: flex;
    width: calc(100% - 100px);
    min-width: calc(100% - 100px);

    .panel {
      .presets {
        .preset {
          background: #000;
          border-radius: 3px;
          margin: 0 10px;
          height: 100px;
          width: 100px;
          padding: 15px;

          &.selected {
            border: 1px solid #0455bf;
          }

          .preset_del_icon {
            z-index: 9;
            bottom: -15px;
            right: -15px;
            font-size: 16px;
          }

          .preset_grid {
            background: #2c3041;
            height: 100%;
            width: 100%;
            padding: 8px 2px 2px;

            .vue-grid-layout {
              background: #232834;
            }

            .preset_area {
              background: #0455bf;
              border-radius: 2px;
              height: 100%;
              width: 100%;
            }
          }
        }
      }

      .border {
        background: #0b0b0b;
        border-radius: 15px;
        padding: 65px;
        height: 610px;
        width: 610px;

        .screen {
          background: #2c3041;
          height: 480px;
          width: 480px;
          padding: 16px;

          .grid {
            background: #232834;
            border-radius: 11px;
            width: 448px;
            height: 399px;

            .del_cont {
              border: 1px dashed #0455bf;
              border-radius: 9px;

              .device {
                position: absolute;
                top: 0;
                left: 0;
              }
              .del_icon {
                z-index: 9;
                bottom: 5px;
                right: 5px;
              }
            }
          }
        }
      }
    }

    .devices {
      width: 260px;
      padding: 20px;

      h3 {
        padding-left: 10px;
        font-size: 16px;
      }

      .droppable-element {
        height: 100%;
        width: 100%;
      }
    }
  }
</style>