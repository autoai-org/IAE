<template>
  <v-app id="iae-app" dark>
    <page-tab :tabs=pages></page-tab>
    <iae-footer></iae-footer>
  </v-app>
</template>

<script>
import PageTab from "@/components/base/PageTab";
import IAEFooter from "@/components/bottom/Footer";
import { WelcomePage } from "@/services/page";
export default {
  components: {
    "iae-footer": IAEFooter,
    "page-tab": PageTab
  },
  data() {
    return {
      pages:[ new WelcomePage ]
    };
  }
};
</script>

<style scoped>
#iae-app {
  background-color: #424242;
}
</style>
