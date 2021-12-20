<template>
  <div class="no-content-wrapper">
    <div class="icon" v-show="showProduct">
        <v-icon width="40px" height="40px">fas fa-tshirt</v-icon>
    </div>
    <div class="icon" v-show="showOrder">
        <v-icon width="40px" height="40px">fas fa-paste</v-icon>
    </div>
    <div class="icon" v-show="showUser">
        <v-icon width="40px" height="40px">fas fa-user-circle</v-icon>
    </div>
    <div class="icon" v-show="showShop">
        <v-icon width="40px" height="40px">fas fa-store</v-icon>
    </div>
    <div class="content">
      {{ Notification }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoContent',
  props: {
    Notification: String,
    showProduct: {
     type: Boolean,
     default: false,
    },
    showOrder: {
        type: Boolean,
        default: false,
    },
    showUser: {
        type: Boolean,
        default: false,
    },
    showShop: {
        type: Boolean,
        default: false,
    },
  },  
};
</script>

<style>
.no-content-wrapper {
  width: 940x;
  border-radius: 4px;
  text-align: center;
  padding: 30px 20px 20px 20px;
  display: flex;
  flex-direction: column;
}


.content {
  font: 400 24px Roboto;
  color: #616161;
}
</style>
