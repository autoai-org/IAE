<template>
  <router-view></router-view>
</template>

<script>
import bootstrap from '@/services/binding/key'
export default {
  name: "App",
  data() {
    return {};
  },
  created () {
    bootstrap()
  }
};
</script>

<style>
html {
  overflow-y:hidden;
  background-color: #424242;
}
</style>
