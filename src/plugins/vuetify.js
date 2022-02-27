import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import HeaderLogo from '@/components/icons/HeaderLogo'
import UpgradeLogo from '@/components/icons/UpgradeLogo'
import Lamp from '@/components/icons/Lamp'

import Fun0 from '@/components/icons/Fun0'
import Fun1 from '@/components/icons/Fun1'
import Fun2 from '@/components/icons/Fun2'
import Fun3 from '@/components/icons/Fun3'
import Fun4 from '@/components/icons/Fun4'
import Fun5 from '@/components/icons/Fun5'

import Wifi0 from '@/components/icons/Wifi0'
import Wifi1 from '@/components/icons/Wifi1'
import Wifi2 from '@/components/icons/Wifi2'
import Wifi3 from '@/components/icons/Wifi3'
import Wifi4 from '@/components/icons/Wifi4'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    values: {
      HeaderLogo: {component: HeaderLogo},
      UpgradeLogo: {component: UpgradeLogo},
      Lamp: {component: Lamp},
      Fun0: {component: Fun0},
      Fun1: {component: Fun1},
      Fun2: {component: Fun2},
      Fun3: {component: Fun3},
      Fun4: {component: Fun4},
      Fun5: {component: Fun5},
      Wifi0: {component: Wifi0},
      Wifi1: {component: Wifi1},
      Wifi2: {component: Wifi2},
      Wifi3: {component: Wifi3},
      Wifi4: {component: Wifi4},
    },
  },
});
