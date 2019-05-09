<template>
  <div class="canvas-container">
    <canvas
      :id="'iae-current-img-' + imgName"
      class="image-anno-main"
      style="z-index:0;"
    >Sorry, we no longer support your browser, please upgrade to latest Chrome, Firefox, Safari or any modern browser.</canvas>
    <!--
    <canvas
      :id="'iae-intellisense-' + imgName"
      class="image-anno-main"
      style="z-index:10;"
    >Sorry, we no longer support your browser, please upgrade to latest Chrome, Firefox, Safari or any modern browser.</canvas>
    -->
    <div
      :id="'iae-intellisense-' + imgName"
    ></div>
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
  computed: {
    imgName() {
      return this.imgPath.substring(this.imgPath.lastIndexOf("/") + 1);
    }
  },
  methods: {
    drawImage() {
      let drawer = new Drawer(this.imgName);
      drawer.drawBackgroundImage(this.imgPath);
      let results = azureAnalyzer.Results;
      for (let i in results) {
        if (results[i].path === this.imgPath.slice(5)) {
          drawer.drawIntellisense(results[i]);
        }
      }
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
.intellisense-object:hover{
  box-shadow: 0 0 0 99999px rgba(0, 0, 0, .8);
}
</style>
