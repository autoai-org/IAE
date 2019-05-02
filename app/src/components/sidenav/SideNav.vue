<template>
  <v-app id="iae-side-nav">
    <file-system></file-system>
  </v-app>
</template>

<script>
import FileSystem from "@/components/sidenav/FileSystem";
export default {
  components: {
    "file-system": FileSystem
  }
};
</script>

<style>
#iae-side-nav {
  background-color: #616161;
}
</style>
