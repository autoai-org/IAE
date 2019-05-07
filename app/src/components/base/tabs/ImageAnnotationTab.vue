<template>
  <div>
    <canvas
      id="iae-current-img"
      class="image-anno-main"
    >Sorry, we no longer support your browser, please upgrade to Chrome, Firefox, Safari or any modern browser.</canvas>
  </div>
</template>

<script>
import { Drawer } from "@/services/draw";
export default {
  props: {
    imgPath: {
      type: String,
      required: true
    }
  },
  mounted() {
    console.log(this.imgPath)
    let drawer = new Drawer("iae-current-img");
    drawer.drawBackgroundImage(this.imgPath);
  }
};
</script>

<style scoped>
.image-anno-main {
  width: 50vw;
  height: 100vh;
  display: block;
}
</style>
