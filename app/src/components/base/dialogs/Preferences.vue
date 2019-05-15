<template>
  <v-dialog v-model="dialog" hide-overlay transition="dialog-bottom-transition">
    <v-card class="preferences-card">
      <v-toolbar
        dark
        color="primary"
        dense
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      >
        <v-btn icon dark @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="save();dialog = false">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list three-line subheader>
        <v-subheader>Controls</v-subheader>
      </v-list>
      <v-divider></v-divider>
      <v-list three-line subheader>
        <v-subheader>General</v-subheader>
      </v-list>
      <v-divider></v-divider>
      <v-list three-line subheader>
        <v-subheader>Intelligent Annotation</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>Provider</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-select
                    v-model="provider.selectedProvider"
                    :items="provider.available"
                    label="Provider Name"
                  ></v-select>
                  <div v-if="provider.selectedProvider==='Azure'">
                    <v-text-field label="Provider Key" v-model="provider.azure.key"></v-text-field>
                  </div>
                  <div v-if="provider.selectedProvider==='CVPM'">
                    <v-text-field label="Endpoint" v-model="provider.cvpm.endpoint"></v-text-field>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import { config } from "@/services/config";
export default {
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      provider: {
        selectedProvider: config.JSON.intellisense.provider || "",
        available: ["Azure", "CVPM"],
        azure: {
          key: config.JSON.intellisense.azure.key || "",
          region: "SEA",
          availableRegion: ["SEA"]
        },
        cvpm: {
          endpoint: config.JSON.intellisense.cvpm.endpoint || ""
        }
      }
    };
  },
  methods: {
    triggerDialog() {
      this.dialog = !this.dialog;
    },
    save() {
      config.JSON = {
        intellisense: {
          provider: this.provider.selectedProvider,
          azure: {
            key: this.provider.azure.key || "",
            region: this.provider.azure.region || "",
          },
          cvpm: {
            endpoint: this.provider.cvpm.endpoint || ""
          }
        }
      };
      config.write();
    }
  }
};
</script>

<style scoped>
.preferences-card {
  z-index: 999;
}
</style>
