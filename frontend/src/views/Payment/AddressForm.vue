<template>
  <div class="wrapper">
    <form>
      <ValidationProvider name="Họ tên" rules="required" v-slot="{ errors }">
        <div class="name-input-block">
          <span>Họ và tên: </span>
          <input
            type="text"
            class="input name-input"
            v-model="fullname"
          />
        </div>

        <span class="error-text">{{ errors[0] }}</span>
      </ValidationProvider>
      <ValidationProvider
        name="Số điện thoại"
        rules="required|phone"
        v-slot="{ errors }"
      >
        <div class="phone-input-block">
          <span>Số điện thoại: </span>
          <input
            type="text"
            class="input phone-input"
            v-model="phone"
          />
        </div>

        <span class="error-text">{{ errors[0] }}</span>
      </ValidationProvider>
      <ValidationProvider name="Địa chỉ" rules="required" v-slot="{ errors }">
        <div class="address-input-block">
          <span>Địa chỉ: </span>
          <input
            type="text"
            class="input phone-input"
            v-model="address"
          />
        </div>

        <span class="error-text">{{ errors[0] }}</span>
      </ValidationProvider>
      <div class="button-group">
        <div></div>
        <div class="button-confirm-cancel">
          <v-btn class="btn-confirm" @click="confirm">Xác nhận</v-btn>
          <v-btn class="btn-cancel" @click="cancel">Hủy</v-btn>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required } from 'vee-validate/dist/rules';
import { extend, ValidationProvider, setInteractionMode } from 'vee-validate';
setInteractionMode('eager');
extend('required', {
  ...required,
  message: '{_field_} không thể trống'
});
extend('phone', phone => {
  if (!phone.match(/^[0-9]{10,10}$/)) {
    return 'Số điện thoại phải đủ 10 chữ số';
  }
  return '';
});
export default {
  name: 'AddressForm',
  components: {
    ValidationProvider
  },
  props: {
    addressInfo: { type: Object }
  },
  data() {
    return {
      fullname: '',
      phone: '',
      address: ''
    };
  },
  methods: {
    confirm() {
      let addressInfo = {
        fullname: this.fullname,
        phone: this.phone,
        address: this.address
      };
      this.$emit('processAddressForm', addressInfo);
    },
    cancel() {
      this.$emit('processAddressForm', null);
    }
  },
  beforeMount() {
    this.fullname = this.addressInfo.fullname;
    this.phone = this.addressInfo.phone;
    this.address = this.addressInfo.address;
  }
};
</script>

<style scoped>
form {
  background-color: #ffffff;
  width: 400px;
  padding: 25px 40px 25px 40px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.name-input-block,
.phone-input-block,
.address-input-block {
  display: grid;
  grid-template-columns: 100px 400px;
  align-items: center;
  justify-items: end;
  column-gap: 10px;
}

.name-input-block span,
.phone-input-block span,
.address-input-block span {
  font: 400 15px Roboto;
}
.input {
  border: solid 2px #fea200;
  background-color: #ffffff;
  height: 36px;
  width: 400px;
  outline: #fea200;
  padding: 8px;
  box-shadow: 0px 2px 2px 0px rgb(0 0 0 / 14%);
  font: 400 15px Roboto;
  border-radius: 4px;
}

.input:focus {
  box-shadow: 0px 0px 8px #fcb800;
}

.error-text {
  display: block;
  color: red;
  font: 400 13px Roboto;
  align-self: start;
  margin-left: 120px;
  height: 13px;
  margin-top: 3px;
  margin-bottom: 3px;
}

.button-group {
  display: grid;
  grid-template-columns: 100px 400px;
  align-items: center;
  justify-items: end;
  column-gap: 10px;
}

.button-confirm-cancel{
  display: flex;
  justify-self: center;
  column-gap: 10px;
}

.button-confirm-cancel .v-btn {
  letter-spacing: 0;
  text-transform: none;
  font: 400 15px Roboto;
  width: 100px;
}

.btn-confirm {
  background-color: #fea200 !important;
  color: #ffffff !important;
}

.btn-cancel {
  background-color: rgb(187, 185, 185) !important;
  color: #ffffff !important;
}
</style>
