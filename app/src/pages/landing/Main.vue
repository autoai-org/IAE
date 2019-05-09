<template>
  <v-app id="iae-app" dark>
    <v-navigation-drawer app permanent>
      <side-nav></side-nav>
    </v-navigation-drawer>
    <v-navigation-drawer permanent right absolute class="right-navigation">
      <iae-objects-nav></iae-objects-nav>
    </v-navigation-drawer>

    <v-content>
      <page-tab :tabs="pages" id="iae-main-tabs"></page-tab>
    </v-content>

    <v-footer color="primary" fixed dark id="iae-footer" height="36px;">
      <iae-footer></iae-footer>
    </v-footer>
    
    <div id="iae-other-global-components">
    <v-snackbar :top="true" :timeout="6000" v-model="snackbar.enable">
      {{ snackbar.text }}
      <v-btn color="pink" flat @click="closeSnackbar()">Close</v-btn>
    </v-snackbar>
    <iae-preferences ref="iae-preferences"></iae-preferences>
    </div>
  </v-app>
</template>

<script>
import PageTab from "@/components/base/tabs/PageTab";
import IAEFooter from "@/components/bottom/Footer";
import SideNav from "@/components/sidenav/SideNav";
import ObjectsNav from "@/components/sidenav/ObjectsNav"
import Preferences from '@/components/base/dialogs/Preferences'
import { WelcomePage } from "@/services/pages/WelcomePage";
import { ipcRenderer } from 'electron'

export default {
  components: {
    "iae-footer": IAEFooter,
    "page-tab": PageTab,
    "side-nav": SideNav,
    "iae-preferences": Preferences,
    "iae-objects-nav": ObjectsNav
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
    return {
      preferences: false
    };
  },
  methods: {
    closeSnackbar() {
      this.$store.state.snackbar.enable = false;
    },
    initListeners () {
      let self = this
      ipcRenderer.on('open-preferences', () => {
        self.$refs["iae-preferences"].triggerDialog()
      })
    }
  },
  created () {
    this.initListeners()
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
#iae-footer {
  z-index: 999;
}
.right-navigation {
  padding-top: 36px;
}
</style>
