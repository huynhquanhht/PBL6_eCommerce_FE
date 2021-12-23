<template>
  <div class="shop-management-wrapper">
    <top-title :title="title"></top-title>
    <hr class="hr" />
    <div class="form-block">
      <form>
        <div class="grid-container">
          <label>Họ tên </label>
          <ValidationProvider 
          name="Họ và Tên" 
          rules="required"
           >
            <input
              type="text"
              class="input name-input"
              v-model="fullname"
            />
            
          </ValidationProvider>
        </div>
        <div class="grid-container">
          <label>Email </label>
          <ValidationProvider 
          name="Email"
          rules="required|email"
         
          >
            <input type="text" 
            class="input name-input" 
            v-model="email" />
            
          </ValidationProvider>
        </div>

        <div class="grid-container">
          <label>Số điện thoại </label>
          <ValidationProvider 
          name="Số điện thoại"
          rules="required|phone"
         >
            <input
              type="text"
              class="input phone-input"
              v-model="phoneNumber"
            />
           
          </ValidationProvider>
        </div>

        <div class="grid-container">
          <label>Địa chỉ </label>
          <ValidationProvider name="Địa chỉ"
          rules="required"
         >
            <input type="text" 
            class="input address-input" 
            v-model="address" />
            
          </ValidationProvider>
        </div>

        <div class="button-group">
             <v-btn 
          @click="reset"
          class="btn-signup white--text mt-4 mb-4"
          width="25%"
          height="42px"
          color="#fea200"
          depressed>
          <span class="font-size: 15px">Hủy Thay đổi</span>
        </v-btn>

           <v-btn
          @click="submit"
          class="btn-signup white--text mt-4 mb-4"
          width="25%"
          height="42px"
          color="#fea200"
          depressed
        >
          <span class="font-size: 15px">Lưu Thông tin</span>
        </v-btn>
     
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import localStorageUtils from '@/utils/utils-local-storage.js'
import TopTitle from '@/components/TopTitle.vue'
import { required } from 'vee-validate/dist/rules';
import { extend, ValidationProvider, setInteractionMode } from 'vee-validate';
setInteractionMode('eager');

extend('required', {
  ...required,
  message: '{_field_} không thể trống',
});

extend('email', (email) => {
  if (!email.match(/.+@.+\..+/)) {
    return 'Email không đúng định dạng';
  }
  return '';
});

extend('phone', (phone) => {
  if (!phone.match(/^[0-9]{10,10}$/)) {
    return 'Số điện thoại phải đủ 10 chữ số';
  }
  return '';
});


export default {
  // name: 'shop-management',
  components: {
    ValidationProvider,
    TopTitle,
    //FunctionUndevelopForm
  },
  props: {
    currentUser: {
      type: Object,
    },
  },
  data() {
    return {
      title: 'Thông tin cá nhân',
      fullname: '',
      email: '',
      address: '',
      phoneNumber: '',
    };
  },
  computed: {
    ...mapGetters({
      userInfo: 'GET_USER_INFO',
    }),
  },
  methods: {
    ...mapActions({
      fetchUserInfo: 'FETCH_USER_INFO',
    }),
    ...mapMutations({
      setSnackbar: 'SET_SNACKBAR'
    }),
    async submit() {
      if( this.fullname !== '' &&
          this.email.match(/.+@.+\..+/) &&
          this.phoneNumber.match(/^[0-9]{10,10}$/) &&
          this.address !== ''
        ) {
          await this.$store.dispatch('ACT_UPDATE_MEMBER_INFO', {
            memberInfo: {
              fullname: this.fullname,
              phoneNumber: this.phoneNumber,
              email: this.email,
              address: this.address,
            }
          })
          await this.fetchUserInfo();
          return;
        }
      this.setSnackbar({
        type: 'error',
        visible: true,
        text: 'Dữ liệu không hợp lệ'
      });
    },
    reset() {
      this.fullname = this.userInfo.fullname;
      this.email = this.userInfo.email;
      this.address = this.userInfo.address;
      this.phoneNumber = this.userInfo.phoneNumber;
    },
  },
  async created() {
    if(localStorageUtils.getToken()) {
      await this.fetchUserInfo();
      if(this.userInfo != null) {
        this.fullname = this.userInfo.fullname;
        this.email = this.userInfo.email;
        this.phoneNumber = this.userInfo.phoneNumber;
        this.address = this.userInfo.address;
      }
    }
  },
};
</script>

<style scoped>
.v-application p {
  margin-left: 0px;
}
.shop-management-wrapper {
  background-color: #ffffff;
  width: 800px;
  padding: 0px 20px;
}

.top-title {
  color: #616161;
  font: 400 24px Rotobo;
  border-bottom: 1px solid #616161 !important;
}

.form-block {
  display: flex;
}

form {
  background-color: #ffffff;
  width: 500px;
  padding: 25px 40px 25px 40px;
  border-radius: 12px;
  align-items: center;
}

.grid-container {
  display: grid;
  grid-template-columns: 150px 240px;
  justify-items: end;
  column-gap: 10px;
  align-items: center;
}

.button-group {
  display: flex;
  justify-content: flex-end;
}

.label {
  font: 400 15px Roboto;
  color: #616161;
  height: 20px;
  width: 150px;
  margin-top: 10px;
  margin-left: 10px;
  text-align: right;
  clear: both;
  float: right;
}

.input {
  border: solid 2px #fea200;
  background-color: #ffffff;
  height: 36px;
  width: 220px;
  outline: #fea200;
  padding: 8px;
  box-shadow: 0px 2px 2px 0px rgb(0 0 0 / 14%);
  font: 400 15px Roboto;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.textarea {
  border: solid 2px #fea200;
  background-color: #ffffff;
  height: 100px;
  width: 220px;
  outline: #fea200;
  padding: 8px;
  box-shadow: 0px 2px 2px 0px rgb(0 0 0 / 14%);
  font: 400 15px Roboto;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.input:focus {
  box-shadow: 0px 0px 8px #fcb800;
}

.error-text {
  display: block;
  color: red;
  font: 400 13px Roboto;
  align-self: end;
  margin-left: 10px;
  height: 13px;
  margin-top: 3px;
  margin-bottom: 3px;
}

.v-btn {
  height: 36px;
  color: #ffffff !important;
  margin-left: 8px;
  background-color: #fea200 !important;
  text-transform: none;
  font: 400 14px Roboto;
  letter-spacing: 0;
  box-shadow: none !important;
  margin-top: 20px;
  margin-bottom: 20px;
}

.rigth-content {
  flex-direction: column;
  width: 200px;
  justify-content: center;
}
</style>
