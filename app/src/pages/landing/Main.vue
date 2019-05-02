<template>
  <v-app id="iae-app" dark>
    <multipane>
      <side-nav></side-nav>
      <pane-resizer></pane-resizer>
      <page-tab :tabs="pages" id="iae-main-tabs"></page-tab>
    </multipane>
    <iae-footer></iae-footer>
    <v-snackbar :top="true" :timeout="6000" v-model="snackbar.enable">
      {{ snackbar.text }}
      <v-btn color="pink" flat @click="closeSnackbar()">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import Multipane from "@/components/base/pane/Multipane";
import PaneResizer from "@/components/base/pane/PaneResizer";
import PageTab from "@/components/base/tabs/PageTab";
import IAEFooter from "@/components/bottom/Footer";
import SideNav from "@/components/sidenav/SideNav";
import { WelcomePage } from "@/services/pages/WelcomePage";
export default {
  components: {
    "iae-footer": IAEFooter,
    "page-tab": PageTab,
    Multipane,
    PaneResizer,
    "side-nav": SideNav
  },
  computed: {
    pages() {
      if (this.$store.state.currentTabs.length === 0) {
        return [new WelcomePage()];
      } else {
        return this.$store.state.currentTabs;
      }
    },
    snackbar() {
      return {
        enable: this.$store.state.snackbar.enable,
        text: this.$store.state.snackbar.text
      };
    }
  },
  watch: {
    snackbar: {
      handler(newVal, oldVal) {
        console.log("snackbar changed");
        console.log(newVal, oldVal);
      },
      deep: true
    }
  },
  data() {
    return {};
  },
  methods: {
    closeSnackbar() {
      this.$store.state.snackbar.enable = false;
    }
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
