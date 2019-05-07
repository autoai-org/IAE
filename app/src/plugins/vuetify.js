import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  iconfont: 'md',
  theme: {
    primary: colors.blue.darken3, // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base,
    background: colors.grey.darken - 3
  }
})
