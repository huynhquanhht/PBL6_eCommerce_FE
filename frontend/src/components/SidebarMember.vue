<template>
  <div class="personal-account-wrapper">
    <div class="personal-account">
      <img src="@/assets/images/avatar-user.png" alt="avatar-user" />
      <div class="personal-identity">
        <span> {{ userInfo.fullname }}</span>
        <span class="email"> {{ userInfo.email }}</span>
      </div>
    </div>
    <hr class="hr" />
    <div class="item-group">
      <div  v-for="(item, index) in menuItems" :key="index">
        <router-link :to="item.url" class="item">
          <i :class="item.icon"></i>
          <span> {{ item.title }} </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'SidebarPersonal',
  data() {
    return {
      menuItems: [
        {
          icon: 'fas fa-user',
          title: 'Thông tin cá nhân',
          url: '/member-info/personal-identity'
        },
        {
          icon: 'fas fa-clipboard-list',
          title: 'Đơn mua',
          url: '/member-info/purchase-order'
        },
      ],
      active: false,
    };
  },
  methods: {
    ...mapActions({
      fetchUserInfo: 'FETCH_USER_INFO',
    }),
  },
  computed: {
    ...mapGetters({
      userInfo: 'GET_USER_INFO',
    }),
  },
  async created() {
    await this.fetchUserInfo();
  },
};
</script>

<style scoped>
.personal-account-wrapper {
  min-height: 100vh;
  height: 100%;
  width: 250px;
  padding: 20px 20px;
  background-color: #ffffff;
}
.personal-account {
  display: flex;
  column-gap: 10px;
  align-items: center;
}
.personal-account img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #fea200;
}
.personal-identity {
  display: flex;
  flex-direction: column;
}

.personal-identity span {
  color: #616161;
}

.personal-identity span:first-child {
  font: 600 15px Roboto;
}

.personal-identity span:last-child {
  font: 400 15px Roboto;
}

.email {
  font: 300 12px Roboto !important;
}

.hr {
  margin: 10px 0px;
  border-width: 0;
  padding-top: 1px;
  background-color: #b6b4b4;
}

.item {
  display: grid;
  grid-template-columns: 20px 120px;
  column-gap: 5px;
  color: #616161;
  text-decoration: none;
}

.item-group {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  row-gap: 10px;
  justify-content: center;
  margin-left: 20px;
}

.item i {
  font-size: 20px;
}

.item span {
  font: 400 15px Roboto;
  line-height: 24px;
}

.item:hover {
  color: #fea200;
  cursor: pointer;
}
</style>
