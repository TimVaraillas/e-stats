<template>
  <n-config-provider :theme="darkTheme" :locale="frFR" :date-locale="dateFrFR">
    <n-layout style="height: 100vh">
      <n-layout-header style="height: 64px; padding: 24px" bordered>
        <b>E-stats</b>
      </n-layout-header>
      <n-layout position="absolute" style="top: 64px; bottom: 64px" has-sider>
        <n-layout-sider :native-scrollbar="false" bordered>
          <n-menu ref="menu" :options="options" v-model="selectedKey"/>
        </n-layout-sider>
        <n-layout :native-scrollbar="false">
          <router-view />
        </n-layout>
      </n-layout>
      <n-layout-footer
        position="absolute"
        style="height: 64px; padding: 24px"
        bordered
      >
        <span>© {{ new Date().getFullYear() }}, <b>E-Stats</b></span>
      </n-layout-footer>
    </n-layout>

  </n-config-provider>
</template>

<script>
import {
  darkTheme,
  frFR,
  dateFrFR,
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutFooter,
  NLayoutSider,
  NMenu,
} from 'naive-ui';
import { h } from 'vue';
import { RouterLink } from 'vue-router';

function renderIcon(icon) {
  return () => h('i', { class: `menu-icon fas ${icon}` });
}

const menuOptions = [
  {
    label: () => h(RouterLink, {
      to: {
        name: 'Mes matchs',
      },
    }, { default: () => 'Mes matchs' }),
    key: 'games',
    icon: renderIcon('fa-basketball'),
  },
];

export default {
  name: 'App',
  components: {
    NConfigProvider,
    NLayout,
    NLayoutHeader,
    NLayoutFooter,
    NLayoutSider,
    NMenu,
  },
  setup() {
    return {
      darkTheme,
      frFR,
      dateFrFR,
    };
  },
  data() {
    return {
      options: menuOptions,
      selectedKey: 'Mes matchs',
    };
  },

};
</script>

<style lang="scss" scoped>
::v-deep .menu-icon {
  font-size: 13px;
}
</style>
