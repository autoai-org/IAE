<template>
    <html-tab :html=welcomeMsg></html-tab>
</template>

<script>
import HTMLTab from "@/components/base/HTMLTab";
export default {
  components: {
    "html-tab": HTMLTab
  },
  data() {
    return {
      welcomeMsg: ``
    };
  }
};
</script>

<style>
</style>
