<template>
  <div>
    <v-layout column>
    <div class="intellisense">
      <v-chip label color="primary" small>
        <v-progress-circular indeterminate size="12" color="white"></v-progress-circular>&nbsp;IntelliSense
      </v-chip>
    </div>
    <div class="exif">
      <v-chip label color="primary" small>
        EXIF
      </v-chip>
    </div>
    </v-layout>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.intellisense {
  height: 36px;
}
.exif {
  height: 36px;
}
</style>