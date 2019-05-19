<template>
  <div class="canvas-container">
    <canvas
      :id="'iae-current-img-' + imgName"
      class="image-anno-main"
      style="z-index:0;"
    >Sorry, we no longer support your browser, please upgrade to latest Chrome, Firefox, Safari or any modern browser.</canvas>
    <div :id="'iae-annotation-' + imgName"></div>
    <div :id="'iae-intellisense-' + imgName"></div>
    <v-dialog dark eager persistent v-model="dialogTrigger" class="finishing-annotating-dialog">
      <v-card>
        <v-card-title primary-title>Finish Annotating</v-card-title>
        <v-card-text>
        <v-flex xs12 sm6 md3>
          <v-text-field
            v-model="nameLabel"
            label="Label"
          ></v-text-field>
        </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="white" text @click="dialogTrigger = false">Cancel</v-btn>

          <v-btn color="white" text @click="drawNameLabel();dialogTrigger = false">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Drawer } from "@/services/draw";
import { azureAnalyzer } from "@/services/intellisense/azure";
export default {
  props: {
    imgPath: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialogTrigger: false,
      nameLabel: "",
      drawer: {}
    };
  },
  computed: {
    imgName() {
      return this.imgPath.substring(this.imgPath.lastIndexOf("/") + 1);
    },
    finishingAnnotatingObject() {
      return this.$store.state.finishingAnnotatingObject;
    }
  },
  watch: {
    finishingAnnotatingObject(val) {
      if (val) {
        this.dialogTrigger = true;
      }
    }
  },
  methods: {
    drawImage() {
      let drawer = new Drawer(this.imgName);
      this.drawer = drawer
      drawer.drawBackgroundImage(this.imgPath);
      let results = azureAnalyzer.Results;
      for (let i in results) {
        if (results[i].path === this.imgPath.slice(5)) {
          drawer.drawIntellisense(results[i]);
        }
      }
    },
    drawNameLabel () {
      this.drawer.drawName(this.nameLabel)
    }
  },
  mounted() {
    this.drawImage();
  }
};
</script>

<style scoped>
.canvas-container {
  position: relative;
}
.canvas-container canvas {
  position: absolute;
  left: 0;
  top: 0;
}
.canvas-container div {
  position: absolute;
  left: 0;
  top: 0;
}
.image-anno-main {
  padding-bottom: 48px;
}
.intellisense-object:hover {
  box-shadow: 0 0 0 99999px rgba(0, 0, 0, 0.8);
}
.finishing-annotating-dialog {
  z-index: 999999;
}
</style>
