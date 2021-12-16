<template>
  <v-app>
    <Header />
    <router-view class="content"></router-view>
    <Footer></Footer>
    <v-snackbar
      v-model="snackbar.visible"
      :color="snackbar.color"
      :multi-line="snackbar.mode === 'multi-line'"
      :timeout="snackbar.timeout"
      :bottom="true"
      :right="true"
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
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'Home',
  components: {
    Header,
    Footer,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      snackbar: 'GET_SNACKBAR',
    }),
  },
};
</script>

<style scoped>
.v-application {
  background-color: #f5f5f5 !important;
  width: 100vw;
}

</style>
