<template>
  <div>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Workplace</v-list-item-title>
          <v-list-item-subtitle>Objects Annotated or Sensed</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list dense>
      <v-list-item v-for="(item, i) in uniqObjectNames" :key="i">
        <v-list-item-content>
          <v-list-item-title>
            <p :style="'color: ' + colors[i]">{{item}}</p>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { COLORS } from "@/services/draw/constants";
import { azureAnalyzer } from "@/services/intellisense/azure";
export default {
  data() {
    return {
      colors: COLORS,
      uniqObjectNames: []
    };
  },
  computed: {
    objects() {
      return azureAnalyzer.Results;
    },
    annotatedObjects() {
      return this.$store.state.annotatedObjects;
    }
  },
  methods: {
    queryObjects() {
      let objectNames = [];
      this.objects.map(function(each) {
        let results = each.result.objects;
        results.map(function(each) {
          objectNames.push(each.object);
        });
      });
      // append from annotated objects
      objectNames = objectNames.concat(this.annotatedObjects);
      // remove duplicate
      this.uniqObjectNames = Array.from(new Set(objectNames));
    }
  },
  mounted() {
    this.queryObjects()
  },
  watch: {
    annotatedObjects() {
      this.queryObjects()
    }
  }
};
</script>

<style>
</style>
