<template>
  <div>
    <img :src="imgPath" class="image-anno-main">
  </div>
</template>

<script>
export default {
  props: {
    imgPath: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.image-anno-main {
    width: 100%;
    height: auto;
}
</style>
