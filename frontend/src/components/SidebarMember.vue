<template>
  <div class="personal-account-wrapper">
    <div class="personal-account">
      <img src="@/assets/images/avatar-user.png" alt="avatar-user" />
      <div class="personal-identity">
        <span>Đặng Quốc Tuấn</span>
        <span>tuandang</span>
      </div>
    </div>
    <hr class="hr" />
    <div class="item-group">
      <div class="item" v-for="(item, index) in menuItems" :key="index">
        <i :class="item.icon"></i>
        <span> {{ item.title }} </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarPersonal',
  data() {
    return {
      menuItems: [
        {
          icon: 'fas fa-user',
          title: 'Thông tin cá nhân'
        },
        {
          icon: 'fas fa-clipboard-list',
          title: 'Đơn mua'
        }
      ],
      active: false
    };
  },
  methods: {
  }
};
</script>

<style scoped>
.personal-account-wrapper {
  height: 100vh;
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

.item:hover
{
  color: #fea200;
  cursor: pointer;
}
</style>
