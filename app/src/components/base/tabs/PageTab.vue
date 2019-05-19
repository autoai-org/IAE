<template>
  <div id="iae-pagetab">
    <div class="main-tabs-title">
      <v-tabs
        v-model="active"
        color="primary"
        dark
        show-arrows
        slider-color="teal lighten-3"
        :change="onTabsChange()"
      >
        <v-tab v-for="(item, index) in tabs" :key="index" :ripple="false" fixed>
          {{ item.title }}
          <v-btn small rounded :ripple="false" icon @click.stop="closeTab(index)" right>
            <v-icon small>close</v-icon>
          </v-btn>
        </v-tab>
      </v-tabs>
    </div>
    <v-tabs-items v-model="active" class="main-tabs-content">
      <v-tab-item v-for="(item, index) in tabs" :key="index">
        <iae-html-tab v-if="item.type==='iae-html-page'" :content="item.content"></iae-html-tab>
        <iae-image-annotation-tab
          ref = "iae-image-annotation-tab"
          v-if = "item.type==='iae-image-annotation-page'"
          :imgPath = "item.imgSrc"
        ></iae-image-annotation-tab>
      </v-tab-item>
    </v-tabs-items>
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
      active: 0
    };
  },
  computed: {
    currentTab() {
      return this.$store.state.currentTab;
    }
  },
  watch: {
    currentTab: {
      handler(newVal) {
        this.$nextTick(() => {
          this.active = parseInt(newVal);
        });
      }
    },
    active: {
      handler(newVal) {
        if (newVal !== parseInt(this.currentTab)) {
          this.$store.state.currentTab = newVal.toString();
        }
      }
    }
  },
  methods: {
    closeTab(index) {
      this.$store.state.currentTabs.splice(index, 1);
    },
    onTabsChange() {}
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
.main-tabs-title {
  position: fixed;
  width: 100%;
  background-color: #424242;
  z-index: 500;
}
.main-tabs-content {
  padding-top: 48px;
  padding-left: 16px;
  padding-right: 16px;
}
</style>
