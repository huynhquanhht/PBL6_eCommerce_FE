<template>
  <div class="add-product-form">
    <top-title :title="topTitle"></top-title>
    <div class="product-name">
      <div class="label-input">
        <div class="label-block">
          <label class="label">Mã cửa Hàng: </label>
        </div>
        <div class="text-block">
          <input readonly type="text" class="input" v-model="shopId" />
        </div>
      </div>
    </div>
    <div class="product-name">
      <div class="label-input">
        <div class="label-block">
          <label class="label">Tên cửa hàng: </label>
        </div>
        <div class="text-block">
          <input readonly type="text" class="input" v-model="shopName" />
        </div>
      </div>
    </div>
    <div class="product-name">
      <div class="label-input">
        <div class="label-block">
          <label class="label">Tên sản phẩm: </label>
        </div>
        <div class="text-block">
          <input readonly type="text" class="input" v-model="productName" />
        </div>
      </div>
    </div>
    <div class="product-category">
      <p class="label product-category-title">Danh mục sản phẩm</p>
      <div class="gender-block">
        <label class="label">Giới tính: </label>
        <div class="gender-male">
          <input readonly type="radio" value="Nam" id="male" name="gender" />
          <label class="label" for="male"> Nam</label>
        </div>
        <div class="gender-female">
          <input readonly type="radio" value="Nữ" id="female" name="gender" />
          <label class="label" for="female"> Nữ</label>
        </div>
      </div>
      <div class="category">
        <div class="product-name">
          <div class="label-input">
            <div class="label-block">
              <label class="label">Phân loại: </label>
            </div>
            <div class="text-block">
              <input readonly type="text" class="input" v-model="productCategory" />
            </div>
          </div>
        </div>
        <div class="description label-input">
          <div class="label-block">
            <label class="label">Mô tả sản phẩm: </label>
          </div>
          <div class="product-description-block">
            <textarea readonly v-model="description" class="textarea input"></textarea>
          </div>
        </div>
        <div class="color-size">
          <p class="label">Màu và kích thước</p>
          <table class="styled-table">
            <thead>
              <tr>
                <th>Màu</th>
                <th>Kích thước</th>
                <th>Tồn kho</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(productDetail, index) in productDetails" :key="index">
                <td style="width: 108px">
                  <input
                    type="text"
                    v-model="productDetail.color"
                    placeholder="Nhập..."
                    @change="setColor(productDetail, index)"
                  />
                </td>
                <td style="width: 108px">
                  <input
                    readonly
                    type="text"
                    v-model="productDetail.size"
                    placeholder="Nhập..."
                  />
                </td>
                <td style="width: 108px">
                  <input
                   readonly
                    type="text"
                    v-model="productDetail.stock"
                    placeholder="Nhập..."
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div>
          </div>
        </div>
        <div class="color-image">
          <p class="label">Màu và hình ảnh</p>
          <table class="styled-table">
            <thead>
              <tr>
                <th>Màu</th>
                <th>Hình ảnh</th>
                <th>Loại hình</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in productImage" :key="index">
                <td style="width: 108px">
                  <span> {{ product.colorName }}</span>
                </td>
                <td class="product-name-img" >
                  <img 
                   :src="'http://localhost:55000/apigateway/Products' + product.imagePath" alt=""
                   width="100px"
                  height="100px" />
                </td>
                <td v-if="product.isDefault" style="width: 108px">
                  <span>Ảnh bìa</span>
                </td>
                <td v-else style="width: 108px">
                  <span>Ảnh</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="origin-price">
          <div class="label-input">
            <div class="label-block">
              <label class="label">Giá gốc: </label>
            </div>
            <div class="text-block">
              <input type="text" class="input" v-model="originPrice" />
            </div>
          </div>
        </div>
        <div class="sell-price">
          <div class="label-input">
            <div class="label-block">
              <label class="label">Giá bán: </label>
            </div>
            <div class="text-block">
              <input type="text" class="input" v-model="sellPrice" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import ConfirmDialog from '@/components/ConfirmDialog.vue';
import TopTitle from '@/components/TopTitle.vue';
export default {
  name: 'ProductDetail',
  components: { 
    //ConfirmDialog, 
    TopTitle },
  props: {
    eachProduct: Object,
  },
  data() {
    return {
      topTitle: 'Chi tiết sản phẩm',
      productName: '',
      question: 'Bạn chắc chắn muốn xóa phân loại này?',
      dialog: false,
      rowNum: 1,
      originPrice: null,
      sellPrice: null,
      gender: 0,
      productDetails: [],
      productImage: [],
      colorSize: [
        {
          color: '',
          size: '',
          stock: null,
        },
      ],
      colorImage: [
        {
          color: 'Không',
          image: '',
          imageType: 'Ảnh bìa',
        },
        {
          color: '',
          image: '',
          imageType: 'Ảnh màu',
        },
      ],
    };
  },
  methods: {
    addCategory() {
      this.colorSize.push({
        color: null,
        size: null,
        stock: null,
      });
      this.colorImage.push({
        color: '',
        image: '',
        imageType: 'Ảnh màu',
      });
    },
    agree() {
      this.dialog = false;
    },
    cancel() {
      this.dialog = false;
    },
    deleteColorSize(item, index) {
      if (index > 0) {
        if (item.color && item.size && item.stock) {
          this.dialog = true;
        } else {
          this.colorSize.pop(index);
          this.colorImage.pop(index);
        }
      }
    },
    setColor(item, index) {
      this.colorImage[index + 1].color = item.color;
    },
    readURL(url, index) {
      this.colorImage[index].image = url;
    },
  },
  watch: {
    eachProduct() {
      console.log(this.eachProduct);
      if (this.eachProduct != null) {
        this.shopId = this.eachProduct.shopId;
        this.shopName = this.eachProduct.shopName;
        this.productName = this.eachProduct.name;
        this.gender = this.eachProduct.gender;
        if (this.gender == 1) {
          document.getElementById('male').checked = true;
        } else {
          document.getElementById('female').checked = true;
        }
        this.productCategory = this.eachProduct.categoryName;
        this.description = this.eachProduct.description;
        this.productDetails = this.eachProduct.details;
        this.productImage = this.eachProduct.images;
        this.originPrice = this.eachProduct.originalPrice;
        this.sellPrice = this.eachProduct.price;
      }
    },
  },
  created() {
    console.log(this.eachProduct);
    if (this.eachProduct != null) {
      this.shopId = this.eachProduct.shopId;
      this.shopName = this.eachProduct.shopName;
      this.productName = this.eachProduct.name;
      setTimeout(() => {
        if (this.gender == 1) {
          document.getElementById('male').checked = true;
        } else {
          document.getElementById('female').checked = true;
        }
      }, 100);
      this.productCategory = this.eachProduct.categoryName;
      this.description = this.eachProduct.description;
      this.productDetails = this.eachProduct.details;
      this.productImage = this.eachProduct.images;
      this.originPrice = this.eachProduct.originalPrice;
      this.sellPrice = this.eachProduct.price;
      this.gender = this.eachProduct.gender;
      
    }
  },
};
</script>

<style scoped>
.add-product-form {
  background-color: #ffffff;
  justify-items: center;
}
.product-name {
  margin-bottom: 10px;
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
.product-category-title {
  font: 600 15px Roboto;
  margin-top: 10px;
  color: #616161;
}

.gender-block {
  display: grid;
  grid-template-columns: 120px 60px 40px;
  column-gap: 10px;
}

.gender-block label {
  justify-self: end;
}
.input {
  border: solid 2px #fea200;
  background-color: #ffffff;
  height: 32px;
  width: 100%;
  outline: #fea200;
  padding: 8px;
  box-shadow: 0px 2px 2px 0px rgb(0 0 0 / 14%);
  font: 400 15px Roboto;
  border-radius: 4px;
}

.select-box {
  background-color: #ffffff !important;
  border-style: solid !important;
  -webkit-appearance: auto !important;
  border: solid 1px #616161;
  background-color: #ffffff;
  height: 32px;
  width: 100%;
  outline: #616161;
  box-shadow: 0px 2px 2px 0px rgb(0 0 0 / 14%);
  font: 400 15px Roboto;
  border-radius: 4px;
  cursor: pointer;
}

.input:focus,
.select-box:focus {
  box-shadow: 0px 0px 8px #616161;
}

.textarea {
  height: 100px;
}

.category-select {
  -webkit-appearance: initial;
  outline: #616161;
}

.detail {
  margin-top: 10px;
}

.description {
  margin-top: 10px;
}

.color-size {
  margin-left: 50px;
}

.color-size > p {
  font: 600 14px Roboto;
  color: #616161;
  margin: 5px 0px 3px 0px;
}

.color-image {
  margin-top: 10px;
  margin-left: 50px;
}

.color-image > p {
  font: 600 14px Roboto;
  color: #616161;
  margin: 5px 0px 3px 0px;
}

.styled-table {
  border-collapse: collapse;
  margin: 0 0;
  font-size: 0.9em;
  font-family: sans-serif;
}

.styled-table th {
  background-color: #fea200;
  color: #ffffff;
  padding: 5px 0px;
  border: 1px solid #616161;
}
.styled-table td {
  padding: 5px 0px;
  border: 1px solid #616161;
  text-align: center;
}

.product-name-img {
  display: flex;
  align-items: center;
  gap: 10px;
}

.styled-table td > input {
  width: 100%;
  height: 100%;
  outline: none;
  text-align: center;
  font: 400 14px Roboto !important;
}

.styled-table td:nth-child(4) {
  text-align: center;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.icon-delete {
  color: #616161;
}

.icon-delete:hover {
  color: #fea200;
}

.btn {
  background-color: #fea200 !important;
  color: #ffffff !important;
  letter-spacing: 0 !important;
  text-transform: none !important;
  width: 108px !important;
  box-shadow: none !important;
}

.btn-add-color-size {
  width: 434px;
  outline: none;
  border: 1px dashed #fea200;
  border-radius: 4px;
  margin-top: 4px;
  color: #fea200;
}

.btn-add-color-size i {
  font: 16px;
}

.btn-add-color-size span {
  font: 400 15px Roboto;
  margin-left: 5px;
}

.btn-add-color-size:hover {
  color: #df8f05;
  cursor: pointer;
  border: 1px dashed #df8f05;
}

input[type='file'] {
  display: none;
}

.choose-image {
  cursor: pointer;
}

.origin-price {
  margin-top: 20px;
}

.sell-price {
  margin-top: 10px;
  margin-bottom: 20px;
}

.button-block {
  display: flex;
  column-gap: 20px;
  margin-left: 140px;
}

.btn-reset,
.btn-cancel {
  background-color: #b4b1b1 !important;
}
</style>
