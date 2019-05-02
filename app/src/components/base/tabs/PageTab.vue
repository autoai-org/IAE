<template>
  <div id="iae-pagetab">
    <v-tabs v-model="active" color="primary" dark slider-color="yellow" height="36px;">
      <v-tab v-for="(item, index) in tabs" :key="index" :ripple="false">
        {{ item.title }}
        <span class="tab-close">
          <v-btn small round :ripple="false" icon @click.stop="closeTab(index)">
            <v-icon small>close</v-icon>
          </v-btn>
        </span>
      </v-tab>
      <v-tab-item v-for="(item, index) in tabs" :key="index">
        <v-card flat>
          <v-card-text>
            <iae-html-tab v-if="item.type==='iae-html-page'" :content="item.content"></iae-html-tab>
            <iae-image-annotation-tab v-if="item.type==='iae-image-annotation-page'" :imgPath="item.imgSrc"></iae-image-annotation-tab>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import HTMLtab from "@/components/base/tabs/HTMLTab";
import ImageAnnotationTab from "@/components/base/tabs/ImageAnnotationTab";
export default {
  props: ["tabs"],
  components: {
    "iae-html-tab": HTMLtab,
    "iae-image-annotation-tab": ImageAnnotationTab
  },
  data() {
    return {
      active: null
    };
  },
  methods: {
    next() {
      const active = parseInt(this.active);
      this.active = active < 2 ? active + 1 : 0;
    },
    closeTab(index) {
      this.$store.state.currentTabs.splice(index,1)
    }
  }
};
</script>

<style scoped>
#iae-pagetab {
  background-color: #424242;
}
.tab-close {
  float: right;
}
.tab-close:hover {
  transform: rotate(7deg);
}
</style>
