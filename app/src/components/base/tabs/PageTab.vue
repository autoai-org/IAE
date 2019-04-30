<template>
  <div id="iae-pagetab">
    <v-tabs v-model="active" color="primary" dark slider-color="yellow" height="36px;">
      <v-tab v-for="(item, index) in tabs" :key="index" :ripple="false">
          {{ item.title }}
        <span class="tab-close">
          <v-btn small round :ripple="false" icon @click.stop="closeTab()">
            <v-icon small>close</v-icon>
          </v-btn>
        </span>
      </v-tab>
      <v-tab-item v-for="(item, index) in tabs" :key="index">
        <v-card flat>
          <v-card-text v-if="item.type==='iae-html-page'">
            <iae-html-tab :content="item.content"></iae-html-tab>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import HTMLtab from '@/components/base/tabs/HTMLTab'
export default {
  props: ["tabs"],
  components: {
    'iae-html-tab' : HTMLtab
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
    closeTab() {}
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
