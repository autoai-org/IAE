<template>
  <v-app id="iae-app" dark>
    <multipane>
      <side-nav></side-nav>
      <pane-resizer></pane-resizer>
      <page-tab :tabs="pages" id="iae-main-tabs"></page-tab>
    </multipane>
    <iae-footer></iae-footer>
  </v-app>
</template>

<script>
import Multipane from "@/components/base/pane/Multipane";
import PaneResizer from "@/components/base/pane/PaneResizer";
import PageTab from "@/components/base/tabs/PageTab";
import IAEFooter from "@/components/bottom/Footer";
import SideNav from "@/components/sidenav/SideNav"
import { WelcomePage } from "@/services/pages/WelcomePage";
export default {
  components: {
    "iae-footer": IAEFooter,
    "page-tab": PageTab,
    Multipane,
    PaneResizer,
    "side-nav": SideNav
  },
  data() {
    return {
      pages: [new WelcomePage()]
    };
  }
};
</script>

<style scoped>
#iae-app {
  background-color: #424242;
}
#iae-main-tabs {
  width: 100%;
}
</style>
