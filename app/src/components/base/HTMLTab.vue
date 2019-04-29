<template>
  <div v-html="content"></div>
</template>

<script>
export default {
  props: { 
      content: {
          type: String,
          default: ""
      }
  }
};
</script>

<style>
</style>
