<template>
<transition name="slide">
  <v-app>
    <div class="extra-header-block">
      <extra-header :title="title"></extra-header>
    </div>
    <router-view></router-view>
    <v-snackbar
      v-model="snackbar.visible"
      :color="snackbar.color"
      :multi-line="snackbar.mode === 'multi-line'"
      :timeout="snackbar.timeout"
      :bottom=true
      :right=true
    >
      <v-layout align-center pr-4>
        <v-icon class="pr-3" dark large size="20">{{ snackbar.icon }}</v-icon>
        <v-layout column>
          <div>
            <strong>{{ snackbar.title }}</strong>
          </div>
          <div>{{ snackbar.text }}</div>
        </v-layout>
      </v-layout>
    </v-snackbar>
  </v-app>
</transition>
</template>

<script>
import ExtraHeader from '@/components/ExtraHeader.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'Extra',
  components: { ExtraHeader },
  data() {
    return {
      title: '',
    };
  },

  computed: {
    ...mapGetters({
      snackbar: 'GET_SNACKBAR',
    }),
  },
  watch: {

  },
  beforeCreate() {
    const titleHeader = this.$route.name;
    switch (titleHeader) {
      case 'login':
        this.title = 'Đăng nhập';
        break;
      case 'signup':
        this.title = 'Đăng ký';
        break;
      default:
        break;
    }
  },
};
</script>
<style scoped>
.extra-header-block {
  height: 60px;
}
.extra-header {
  position: fixed;
  width: 100%;
}
.slide-fade-enter-active {
   transition: all .3s ease;
}
.slide-fade-leave-active {
   transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
   transform: translateX(10px);
   opacity: 0;
}
</style>
