<template>
  <div>
    <v-layout wrap>
      <v-flex>
        <div class="intellisense">
          <v-chip label color="primary" small>
            <v-progress-circular indeterminate size="12" color="white"></v-progress-circular>&nbsp;IntelliSense
          </v-chip>
        </div>
      </v-flex>

      <v-flex>
        <v-menu v-model="exifMenu" :close-on-content-click="false" :nudge-width="200" offset-x>
          <template v-slot:activator="{ on }">
            <div class="exif">
              <v-chip v-on="on" label color="primary" small>EXIF</v-chip>
            </div>
          </template>
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <img :src="imgSrc" alt="Img">
                </v-list-item-avatar>

                <v-list-item-content v-if="exifError!==''">
                  <v-list-item-title>Error</v-list-item-title>
                  <v-list-item-subtitle>{{ exifError }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import fs from "fs";
import store from "@/store";
export default {
  data: () => ({
    exifMenu: false,
    exifError: "",
    imgSrc: ""
  }),
  watch: {
    exifMenu(val) {
      if (val) {
        if (store.state.currentTabs[store.state.currentTab]) {
          let fileSrc =
            store.state.currentTabs[store.state.currentTab]["imgSrc"];
          if (fileSrc) {
            this.imgSrc = fileSrc
            this.getExif(fileSrc);
          } else {
            this.exifError = "Cannot Open " + fileSrc
          }
        } else {
          this.exifError = "No Image File Selected"
        }
      }
    }
  },
  methods: {
    getExif(fileSrc) {
      let self = this
      let realFileSrc = fileSrc.slice(5)
      let ExifImage = require("exif").ExifImage;
      fs.readFile(realFileSrc, function(err, data) {
        console.log(err)
        try {
          new ExifImage({ image: data }, function(error, exifData) {
            if (error) {
              self.exifError = error.message
              console.log("Error: " + error.message);
            }
            else console.log(exifData); // Do something with your data!
          });
        } catch (error) {
          self.exifError = error.message
          console.log("Error: " + error.message);
        }
      });
    }
  }
};
</script>

<style scoped>
.intellisense {
  height: 36px;
}
.exif {
  height: 36px;
}
</style>