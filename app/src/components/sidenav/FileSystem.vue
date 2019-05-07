<template>
  <v-container>
    <v-list dense class="filesystem">
      <v-subheader>
        <v-chip label @click="fsDialog = true">{{folderTitle}}</v-chip>
        <v-btn icon small @click="refreshFiles()">
          <v-icon small>sync</v-icon>
        </v-btn>
      </v-subheader>
      <v-list-tile v-for="(item, index) in files" :key="index" @click="addImageToTabs(item)">
        <v-list-tile-content>
          <v-list-tile-title v-html="item">{{ item }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-dialog v-model="fsDialog">
      <v-card>
        <v-card-title>Which Type of Filesystem Would You Like to Use?</v-card-title>
        <v-card-text>
          <v-layout justify-center>
            <v-btn @click="openFilesystem('local')">
              <v-icon>folder</v-icon>Local FileSystem
            </v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import path from "path";
import { LocalFiles } from "@/services/files/local";
import { ipcRenderer } from "electron";
import { pageIndex } from "@/services/pages";
import { ImageAnnotationPage } from "@/services/pages/AnnotationPage";

let lf = new LocalFiles();

export default {
  data() {
    return {
      fsDialog: false
    };
  },
  beforeCreate() {
    lf.watch();
  },
  computed: {
    files() {
      return this.$store.state.currentFiles;
    },
    filepath() {
      return this.$store.state.currentPath;
    },
    folderTitle() {
      if (this.$store.state.currentPath) {
        return this.$store.state.currentPath.substring(
          this.$store.state.currentPath.lastIndexOf("/") + 1
        );
      } else {
        return "No Folder Opened";
      }
    }
  },
  watch: {
    filepath(val) {
      this.title = val.substring(val.lastIndexOf("/") + 1);
    }
  },
  methods: {
    refreshFiles() {},
    openFilesystem(target) {
      if (target === "local") {
        ipcRenderer.send("open-folder-dialog");
      }
      this.fsDialog = false;
    },
    addImageToTabs(item) {
      let index = pageIndex(item);
      if (index !== -1) {
        this.$store.state.currentTab = index;
        return;
      }
      let imageAnnoPage = new ImageAnnotationPage(
        path.join("file:///" + this.filepath, item)
      );
      this.$store.state.currentTabs.push(imageAnnoPage);
    }
  }
};
</script>

<style scoped>
.filesystem {
  background-color: #616161;
}
</style>
