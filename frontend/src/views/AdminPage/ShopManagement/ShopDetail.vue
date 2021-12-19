<template>
  <div class="shop-management-wrapper">
    <p class="top-title">Chi tiết Shop</p>
    <div class="form-block">
      <form>
        <div class="grid-container">
          <label>Id cửa hàng: </label>
          <ValidationProvider name="Tên Shop:">
            <input type="text" 
            class="input name-input" readonly v-model="id" />
          </ValidationProvider>
        </div>
        <div class="grid-container">
          <label>Tên cửa hàng: </label>
          <ValidationProvider name="Tên cửa hàng">
            <input type="text" class="input name-input" v-model="name" />
          </ValidationProvider>
        </div>
        <div class="grid-container">
          <label>Địa chỉ: </label>
          <ValidationProvider name="Địa chỉ">
            <input type="text" class="input address-input" v-model="address" />
          </ValidationProvider>
        </div>
        <div class="grid-container">
          <label>Số điện thoại: </label>
          <ValidationProvider name="Số điện thoại">
            <input
              type="text"
              class="input phone-input"
              v-model="phoneNumber"
            />
          </ValidationProvider>
        </div>
        <div class="grid-container">
          <label>Mô tả: </label>
          <textarea class="textarea" v-model="description" />
        </div>
        <div class="grid-container">
          <label>Ngày tạo: </label>
          <ValidationProvider name="Ngày tạo">
            <input
              name="dateCreate"
              type="text"
              class="input dateCreate-input"
              readonly
              v-model="dateCreated"
            />
          </ValidationProvider>
        </div>
        <!-- <div class="grid-container">
          <label>Lý do bị vô hiệu hóa: </label>
          <ValidationProvider name="Lý do bị vô hiệu hóa">
            <input
              name="disableReson"
              type="text"
              class="input disableReson-input"
        

              v-model="disableReson"
            />
          </ValidationProvider>
        </div> -->

        <div class="grid-container">
          <label>Số lượng sản phẩm: </label>
          <ValidationProvider name="Số lượng sản phẩm: ">
            <input
              name="productAmount"
              type="text"
              class="input productAmount-input"
              v-model="productAmount"
            />
          </ValidationProvider>
        </div>

        <div class="grid-container">
          <label>Tồn kho:</label>
          <ValidationProvider name="Tồn kho:">
            <input
              name="allProductAmount"
              type="text"
              class="input allProductAmount-input"
              v-model="allProductAmount"
            />
          </ValidationProvider>
        </div>

        <div class="grid-container">
          <label>Số lượng đơn hàng:</label>
          <ValidationProvider name="Số lượng đơn hàng:">
            <input
              name="OrderAmount"
              type="text"
              class="input OrderAmount-input"
              v-model="OrderAmount"
            />
          </ValidationProvider>
        </div>

        <v-btn
          @click="submit"
          class="btn-signup white--text mt-4 mb-4"
          width="100%"
          height="42px"
          color="#fea200"
          depressed
        >
          <span class="font-size: 15px">Cập nhật</span>
        </v-btn>
      </form>

      <form class="rigth-content">
        <label>Ảnh shop</label>
        <v-img
          v-model="avatar"
          :src="avatar"
          max-width="100px"
          max-height="100px"
        ></v-img>
        <input type="file" id="fileUpload" hidden />
        <v-btn @click="chooseFiles()"> Chọn ảnh </v-btn>
      </form>
    </div>
  </div>
</template>

<script>
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

extend('password', (password) => {
  if (!password.match(/^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)) {
    return 'Mật khẩu chứa ít nhất 8 ký tự, 1 chữ cái, 1 chữ số';
  }
  return '';
});

extend('confirmed', (confirmPassword, [password]) => {
  if (confirmPassword != password) {
    return 'Mật khẩu xác nhận không trùng khớp';
  }
  return '';
});

export default {
  // name: 'shop-management',
  components: {
    ValidationProvider,
    //FunctionUndevelopForm
  },
  props: {
    eachShop: Object,
  },
  data() {
    return {
      title: 'Chi tiết shop',
      name: '',
      address: '',
      phoneNumber: '',
      description: '',
      dateCreate: '',
      dayModifier: '',
      productAmount: '',
      allProductAmount: '',
      OrderAmount: '',
      avatar: '',
      valid: '',
      show: false,
      undevAlert: false,
    };
  },
  methods: {
    chooseFiles() {
      document.getElementById('fileUpload').click();
    },
    submit() {
      if (this.eachShop.shopId != null) {
        this.$store.dispatch('ACT_UPDATE_SHOP', {
          shopId: this.id,
          shopInfo: {
            nameOfShop: this.name,
            address: this.address,
            phoneNumber: this.phoneNumber,
            description: this.description,
            dateCreated: this.dateCreated,
            avatar: 'http://c64e-2402-800-6205-3e19-cd35-9f68-4158-e6ba.ngrok.io/apigateway/Shops' + this.avatar,
          },
        });
      }
    },
  },
  watch: {
    eachShop() {
      console.log(this.eachShop);
      if (this.eachShop != null) {
        this.id = this.eachShop.shopId;
        this.name = this.eachShop.nameOfShop;
        this.address = this.eachShop.address;
        this.phoneNumber = this.eachShop.phoneNumber;
        this.description = this.eachShop.description;
        this.dateCreated = this.eachShop.dateCreated;
        this.avatar =
          'http://c64e-2402-800-6205-3e19-cd35-9f68-4158-e6ba.ngrok.io/apigateway/Shops' + this.eachShop.avatar;
      }
    },
  },
  created() {
    console.log(this.eachShop);
    if (this.eachShop != null) {
      this.id = this.eachShop.shopId;
      this.name = this.eachShop.nameOfShop;
      this.address = this.eachShop.address;
      this.phoneNumber = this.eachShop.phoneNumber;
      this.description = this.eachShop.description;
      this.dateCreated = this.eachShop.dateCreated;
      this.avatar =
        'http://c64e-2402-800-6205-3e19-cd35-9f68-4158-e6ba.ngrok.io/apigateway/Shops' + this.eachShop.avatar;
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
