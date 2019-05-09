<template>
  <div>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Workplace Objects</v-list-item-title>
          <v-list-item-subtitle>Objects Annotated or Sensed</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list dense>
      <v-list-item v-for="(item, i) in objectList" :key="i">
        <v-list-item-content>
          <v-list-item-title><p style="#FF00000">{{item}}</p></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { azureAnalyzer } from "@/services/intellisense/azure";
export default {
  computed: {
    objects() {
      return azureAnalyzer.Results;
    },
    objectList() {
      return ["train"];
    }
  },
  mounted() {
    console.log(this.objects);
  }
};
</script>

<style>
</style>
