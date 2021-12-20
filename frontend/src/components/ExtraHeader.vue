<template>
  <div class="extra-header">
    <div class="ecommerce-name ml-5">
      <a href="/">
        <img
          class="logo-header"
          src="../assets/images/logo_header.svg"
          alt="logo_header"
        />
      </a>
      <span>{{ title }}</span>
    </div>
    <div class="personal-account-block" v-if="userInfo">
      <v-menu offset-y open-on-hover :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <div class="personal-account" v-bind="attrs" v-on="on">
            <img src="@/assets/images/avatar-user.png" alt="avatar-user" />
            <div class="personal-identity">
              <span> {{ userInfo.fullname }}</span>
            </div>
          </div>
        </template>
        <div class="account-menu">
          <v-list>
            <v-list-item
              v-for="(item, index) in accountMenu"
              :key="index"
              class="menu"
              @click="selectPersonalOption(item)"
            >
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </v-menu>
    </div>
  </div>
</template>

<script>
import localStorageUtils from '@/utils/utils-local-storage.js'
import { mapGetters, mapActions, mapMutations } from 'vuex';
export default {
  props: {
    title: {
      type: String,
      default: 'Title',
    },
  },
  data() {
    return {
      loginStatus: false,
      accountMenu: ['Đăng xuất'],
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'GET_USER_INFO',
    }),
  },
  methods: {
    ...mapMutations({
      setSnackbar: 'SET_SNACKBAR',
      setUserInfo: 'SET_USER_INFO'
    }),
    ...mapActions({
      fetchUserInfo: 'FETCH_USER_INFO',
    }),
      selectPersonalOption(option) {
      if (option === 'Đăng xuất') {
        localStorageUtils.clearToken();
        this.setUserInfo('');
        this.$router.push('/');
      }
    },
  },
  watch: {
    userInfo() {
      if (this.userInfo) {
        this.loginStatus = true;
      } else {
        this.loginStatus = false;
      }
    },
  },
  async created() {
    if (localStorageUtils.getToken()) {
      this.loginStatus = true;
      await this.fetchUserInfo();
    }
  },
};
</script>

<style scoped>
.extra-header {
  background-color: #ffffff;
  box-shadow: #616161;
  height: 60px !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 1px 1px 2px #616161;
  position: fixed;
  z-index: 20;
}

.logo-header {
  height: 44px;
  margin-top: 6px;
}

.ecommerce-name {
  display: flex;
  align-items: center;
}

.ecommerce-name span {
  color: #616161;
  font: 500 22px Roboto;
  margin-left: 5px;
  margin-top: 7px;
}

.personal-account-block {
  margin-right: 20px;
}

.personal-account:hover {
  text-decoration: underline;
  cursor: pointer;
}
.personal-account {
  display: flex;
  column-gap: 5px;
  align-items: center;
}
.personal-account img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #fea200;
}
.personal-identity {
  display: flex;
  flex-direction: column;
}
.personal-identity span {
  color: #616161;
  font: 400 12px Roboto;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.account-menu {
  background-color: #ffffff;
  box-shadow: none !important;

}
.account-menu .v-list {
  height: 54px;
  box-shadow: none !important;
}

.v-list-item {
  min-height: 36px !important;
  padding: 0px !important;
}
.account-menu .v-list-item__title {
  font: 400 14px Roboto;
  color: #616161;
  padding: 0px 20px;
}

</style>
