<template>
  <v-list>
    <v-subheader>app</v-subheader>
    <v-list-tile>
      <span>java.png</span>
    </v-list-tile>
  </v-list>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  beforeCreate() {
      ipcRenderer.on('selected-directory', (event, data) => {
          console.log(data)
      })
  }
};
</script>

<style>
</style>
