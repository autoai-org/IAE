<template>
  <div>
    <v-dialog v-model="dialog" hide-overlay transition="dialog-bottom-transition">
      <v-card class="preferences-card">
        <v-toolbar
          dark
          color="primary"
          dense
          src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
        >
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Export</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="save();dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-card-text>
          <json-viewer :value="annotationObject" theme="jv-dark" boxed></json-viewer>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbarTrigger" bottom vertical>{{ text }}</v-snackbar>
  </div>
</template>

<script>
import JsonViewer from "vue-json-viewer";

import annotationCache from "@/services/cache/annotation";
import store from "@/store";
export default {
  data() {
    return {
      dialog: false,
      annotationObject: {},
      snackbarTrigger: false,
      text:
        "The Annotation file has been saved to " +
        store.state.currentPath +
        "/.iae/annotation.json"
    };
  },
  components: {
    "json-viewer": JsonViewer
  },
  methods: {
    triggerDialog() {
      this.dialog = !this.dialog;
    },
    load() {
      annotationCache.load(store.state.currentPath);
      this.annotationObject = annotationCache.result;
    },
    save() {
      this.snackbarTrigger = true;
    }
  }
};
</script>

<style scoped>
</style>
