<template>
  <div class="shop-info-form">
    <form id="shop-info-form" class="info-form-block">
      <div class="info-text">
        <ValidationProvider name="Họ tên" rules="required" v-slot="{ errors }">
          <div class="label-input">
            <div class="label-block">
              <label class="label">Tên cửa hàng</label>
            </div>
            <div class="text-block">
              <input type="text" class="input" v-model="fullname" />
              <span class="error-text">{{ errors[0] }}</span>
            </div>
          </div>
        </ValidationProvider>
        <ValidationProvider name="Địa chỉ" rules="required" v-slot="{ errors }">
          <div class="label-input">
            <div class="label-block">
              <label class="label">Địa chỉ</label>
            </div>
            <div class="text-block">
              <input type="text" class="input" v-model="address" />
              <span class="error-text">{{ errors[0] }}</span>
            </div>
          </div>
        </ValidationProvider>
        <ValidationProvider
          name="Số điện thoại"
          rules="required|phone"
          v-slot="{ errors }"
        >
          <div class="label-input">
            <div class="label-block">
              <label class="label">Số điện thoại</label>
            </div>
            <div class="text-block">
              <input type="text" class="input" v-model="phone" />
              <span class="error-text">{{ errors[0] }}</span>
            </div>
          </div>
        </ValidationProvider>
        <ValidationProvider name="Mô tả" rules="required" v-slot="{ errors }">
          <div class="label-input">
            <div class="label-block">
              <label class="label">Mô tả</label>
            </div>
            <div class="text-block">
              <textarea class="textarea input" v-model="description"></textarea>
              <span class="error-text">{{ errors[0] }}</span>
            </div>
          </div>
        </ValidationProvider>
        <div class="btn-block text-block">
          <v-btn
            class="btn-regis-shop white--text"
            height="36px"
            width="120px"
            color="#fea200"
            depressed
            @click="registerShop"
            v-if="!shopInfo"
          >
            <span class="font-size: 15px">Đăng ký</span>
          </v-btn>

          <v-btn
            class="btn-regis-shop white--text"
            height="36px"
            width="120px"
            color="#fea200"
            depressed
            @click="updateShop"
            v-if="shopInfo"
          >
            <span class="font-size: 15px">Cập nhật</span>
          </v-btn>
        </div>
      </div>
      <div class="register-ava">
        <img
          class="shop-avatar"
          :src="
            shopAvatarData.includes('storage') ? 
            'http://81b1-2402-800-6205-3e19-302d-c6f5-cab2-c66f.ngrok.io/apigateway/Shops' +
            shopAvatarData : shopAvatarData
          "
          alt="shop-avatar"
        />
        <input
          class="file-input"
          id="file"
          type="file"
          accept="image/gif,image/jpg,image/png,image/svg,image/jpeg"
          @change="chooseImage($event)"
        />
        <label class="choose-image" for="file"> Chọn ảnh nền </label>
      </div>
    </form>
    <v-dialog v-model="dialog" width="400px">
      <confirm-dialog
        :question="question"
        @agree-confirm-dialog="agree"
        @cancel-confirm-dialog="cancel"
      ></confirm-dialog>
    </v-dialog>
  </div>
</template>

<script>
import { required } from 'vee-validate/dist/rules';
import { extend, ValidationProvider, setInteractionMode } from 'vee-validate';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { mapGetters, mapActions } from 'vuex';
setInteractionMode('eager');
extend('required', {
  ...required,
  message: '{_field_} không thể trống',
});
extend('phone', (phone) => {
  if (!phone.match(/^[0-9]{10,10}$/)) {
    return 'Số điện thoại phải đủ 10 chữ số';
  }
  return '';
});
export default {
  name: 'ShopInfoForm',
  props: {
    shopInfo: { type: Object },
  },

  components: {
    ValidationProvider,
    ConfirmDialog,
  },
  data() {
    return {
      fullname: '',
      address: '',
      phone: '',
      description: '',
      dialog: false,
      question: '',
      shopAvatarData: false,
      shopAvatar: null,
      action: '',
    };
  },
  computed: {
    ...mapGetters({
      // shopInfo: 'GET_SHOP_INFO'
    }),
  },
  methods: {
    ...mapActions({
      fetchRegisterShop: 'REGISTER_SHOP',
      fetchUpdateShop: 'UPDATE_SHOP',
      getShopInfo: 'FETCH_SHOP_INFO',
    }),
    async agree() {
      if (this.action === 'register') {
        let shopInfo = new FormData();
        shopInfo.append('Name', this.fullname);
        shopInfo.append('Address', this.address);
        shopInfo.append('PhoneNumber', this.phone);
        shopInfo.append('Description', this.description);
        shopInfo.append('ImageFile', this.shopAvatar);
        await this.fetchRegisterShop(shopInfo);
        this.dialog = false;
      }
      if (this.action === 'update') {
        let shopInfo = new FormData();
        shopInfo.append('Name', this.fullname);
        shopInfo.append('Address', this.address);
        shopInfo.append('PhoneNumber', this.phone);
        shopInfo.append('Description', this.description);
        shopInfo.append('ImageFile', this.shopAvatar);
        for (var item of shopInfo.entries()) {
          console.log(item);
        }
        let res = await this.fetchUpdateShop(shopInfo);
        this.dialog = false;
        if (res) {
          await this.getShopInfo();
        }
      }
    },
    cancel() {
      this.dialog = false;
    },
    chooseImage(e) {
      let reader = new FileReader();
      this.shopAvatar = e.target.files[0];
      reader.onload = (e) => {
        this.shopAvatarData = e.target.result;
      };
      reader.readAsDataURL(this.shopAvatar);
    },
    registerShop() {
      this.question = 'Bạn chắc chắn muốn đăng ký cửa hàng?';
      this.action = 'register';
      this.dialog = true;
    },
    updateShop() {
      this.question = 'Bạn chắc chắn muốn cập nhật cửa hàng?';
      this.action = 'update';
      this.dialog = true;
    },
  },
  watch: {
    shopInfo() {
      if (this.shopInfo) {
        this.fullname = this.shopInfo.nameOfShop;
        this.address = this.shopInfo.address;
        this.phone = this.shopInfo.phoneNumber;
        this.description = this.shopInfo.description;
        this.shopAvatar = this.shopInfo.avatar;
      }
    },
  },
  created() {
    if (this.shopInfo) {
      this.fullname = this.shopInfo.nameOfShop;
      this.address = this.shopInfo.address;
      this.phone = this.shopInfo.phoneNumber;
      this.description =
        this.shopInfo.description === 'undefined'
          ? ''
          : this.shopInfo.description;
      this.shopAvatarData = this.shopInfo.avatar;
    }
  },
};
</script>

<style scoped>
.info-form-block {
  display: grid;
  grid-template-columns: 500px 200px;
  justify-self: center;
}
.label-input {
  display: grid;
  grid-template-columns: 120px 280px;
  column-gap: 10px;
}
.label-block {
  height: 32px;
  justify-self: end;
}
.label {
  font: 400 15px Roboto;
  line-height: 32px;
}
.input {
  border: solid 1px #616161;
  background-color: #ffffff;
  height: 32px;
  width: 360px;
  outline: #616161;
  padding: 8px;
  box-shadow: 0px 2px 2px 0px rgb(0 0 0 / 14%);
  font: 400 15px Roboto;
  border-radius: 4px;
}

.input:focus {
  box-shadow: 0px 0px 8px #616161;
}

.textarea {
  height: 100px;
}

.error-text {
  display: block;
  color: red;
  font: 400 13px Roboto;
  align-self: start;
  margin-left: 10px;
  height: 13px;
  margin-top: 3px;
  margin-bottom: 3px;
}

.btn-regis-shop {
  margin-top: 5px;
  text-transform: none;
  letter-spacing: 0;
  font: 400 15px Roboto !important;
  margin-left: 200px;
}

.shop-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 0px 0px 4px 1px #616161;
}

.register-ava {
  display: flex;
  flex-direction: column;
  margin-left: 80px;
  align-items: center;
}

.custom-file-input {
  margin-top: 18px;
}

input[type='file'] {
  display: none;
}

.file-input {
}

.choose-image {
  text-align: center;
  cursor: pointer;
  background-color: #fea200;
  color: #ffffff;
  font: 400 14px Roboto;
  line-height: 24px;
  padding: 5px;
  border-radius: 4px;
  margin-top: 10px;
}

.choose-image:hover {
  background-color: #f8a71a;
}
.choose-image:focus {
  background-color: #f7a20f;
}

.btn-block {
  padding: 0px 44px;
}
</style>
