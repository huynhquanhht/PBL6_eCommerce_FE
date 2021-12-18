<template>
  <div class="product-form-block">
    <div class="product-form" v-if="productDetail">
      <div class="product-name">
        <div class="product-name-block">
          <div class="label-block">
            <label class="label">Tên sản phẩm: </label>
          </div>
          <div class="text-block">
            <input type="text" class="input" v-model="name" />
          </div>
        </div>
      </div>
      <div class="product-category">
        <p class="label product-category-title">Danh mục sản phẩm</p>
        <div class="gender-block">
          <label class="label">Giới tính: </label>
          <div class="gender-male">
            <input
              type="radio"
              :value="male"
              id="male"
              name="gender"
              v-model="gender"
              checked
            />
            <label class="label" for="male"> Nam</label>
          </div>
          <div class="gender-female">
            <input
              type="radio"
              :value="female"
              id="female"
              name="gender"
              v-model="gender"
            />
            <label class="label" for="female"> Nữ</label>
          </div>
        </div>
        <div class="category">
          <div class="label-input">
            <div class="label-block">
              <label class="label">Phân loại: </label>
            </div>
            <div class="category-select-block">
              <select class="select-box" v-model="categoryName">
                <option v-for="(item, index) in type" :key="index">
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
          <div class="detail label-input">
            <div class="label-block">
              <label class="label">Chi tiết: </label>
            </div>
            <div class="category-select-block">
              <select class="select-box" v-model="categoryDetail">
                <option v-for="(item, index) in detail" :key="index">
                  {{ item.name + ' - ' + categoryDetail }}
                </option>
              </select>
            </div>
          </div>
          <div class="description label-input">
            <div class="label-block">
              <label class="label">Mô tả sản phẩm: </label>
            </div>
            <div class="product-description-block">
              <textarea class="textarea input" v-model="description"></textarea>
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
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in details" :key="index">
                  <td style="width: 108px">
                    <input
                      type="text"
                      v-model="item.color"
                      placeholder="Nhập..."
                      @change="setColor(item, index)"
                    />
                  </td>
                  <td style="width: 108px">
                    <input
                      type="text"
                      v-model="item.size"
                      placeholder="Nhập..."
                    />
                  </td>
                  <td style="width: 108px">
                    <input
                      type="text"
                      v-model="item.stock"
                      placeholder="Nhập..."
                    />
                  </td>
                  <td style="width: 108px">
                    <v-btn icon @click="deleteColor">
                      <i
                        class="icon-delete fas fa-trash"
                        @click="deleteColorSize(item, index)"
                      ></i>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <button class="btn-add-color-size" @click="addCategory">
                <i class="fas fa-plus-circle"></i>
                <span>Thêm phân loại mới</span>
              </button>
            </div>
          </div>
          <div class="color-image">
            <p class="label">Màu và hình ảnh</p>
            <table class="styled-table">
              <thead>
                <tr>
                  <th>Màu</th>
                  <th style="width: 130px">Hình ảnh</th>
                  <th>Loại hình</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in newImages" :key="index">
                  <td style="width: 108px">
                    <span>
                      {{
                        item.colorName === 'null' ? 'Trống' : item.colorName
                      }}</span
                    >
                  </td>
                  <td class="img-product-block">
                    <input
                      class="file-input"
                      :id="'file' + index"
                      type="file"
                      accept="image/gif,image/jpg,image/png,image/svg,image/jpeg"
                      placeholder="Nhập..."
                      @change="readURL($event, index)"
                    />
                    <img
                      v-if="!productDetail"
                      class="img-product"
                      v-show="newImages[index].imageData"
                      :src="newImages[index].imageData"
                      alt=""
                    />
                    <img
                      v-if="productDetail"
                      class="img-product"
                      v-show="
                          newImages[index].imageData
                      "
                      :src="
                        'http://81b1-2402-800-6205-3e19-302d-c6f5-cab2-c66f.ngrok.io/apigateway/Products' +
                        newImages[index].imageData
                      "
                      alt=""
                    />
                    <label class="choose-image" :for="'file' + index">
                      <v-icon>mdi-image-plus</v-icon>
                    </label>
                  </td>
                  <td style="width: 108px">
                    <span>{{ item.imageType }}</span>
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
                <input type="text" class="input" v-model="originalPrice" />
              </div>
            </div>
          </div>
          <div class="sell-price">
            <div class="label-input">
              <div class="label-block">
                <label class="label">Giá bán: </label>
              </div>
              <div class="text-block">
                <input type="text" class="input" v-model="price" />
              </div>
            </div>
          </div>
          <div class="button-block">
            <v-btn
              class="btn btn-save"
              v-if="actionType === 'Create'"
              @click="create"
              >Tạo mới</v-btn
            >
            <v-btn
              class="btn btn-reset"
              v-if="actionType === 'Update'"
              @click="update"
              >Lưu sản phẩm</v-btn
            >
            <v-btn class="btn btn-cancel">Hủy</v-btn>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="d-flex justify-center align-center"
      style="width: 100wm; height: 100vh"
    >
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
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
import ConfirmDialog from '@/components/ConfirmDialog.vue';
export default {
  name: 'AddProductForm',
  components: { ConfirmDialog },
  props: {
    actionType: {
      type: String,
    },
    productDetail: {
      type: Object,
    },
  },
  data() {
    return {
      id: null,
      productInfo: null,
      name: '',
      description: '',
      gender: null,
      male: 1,
      female: 2,
      originalPrice: null,
      price: null,
      categoryId: null,
      categoryName: '',
      categoryDetail: '',
      imageInfos: null,
      question: 'Bạn chắc chắn muốn xóa?',
      dialog: false,
      isVisbleButton: null,
      type: [],
      detail: [],
      rowNum: 1,
      maleSelection: {
        gender: 'Nam',
        category: [
          {
            type: 'Áo',
            detail: [
              { id: 1, name: 'Áo thun' },
              { id: 2, name: 'Áo sơ mi' },
              { id: 3, name: 'Áo Hoodie' },
              { id: 12, name: 'Áo khoác' },
            ],
          },
          {
            type: 'Quần',
            detail: [
              { id: 4, name: 'Quần Jean' },
              { id: 8, name: 'Quần tây' },
              { id: 9, name: 'Quần đùi' },
            ],
          },
          {
            type: 'Phụ kiện',
            detail: [
              { id: 5, name: 'Đồ lót' },
              { id: 10, name: 'Thắt lưng' },
              { id: 11, name: 'Mũ/Nón' },
            ],
          },
        ],
      },
      femaleSelection: {
        gender: 'Nữ',
        category: [
          {
            type: 'Áo',
            detail: [
              { id: 1, name: 'Áo thun' },
              { id: 2, name: 'Áo sơ mi' },
              { id: 3, name: 'Áo Hoodie' },
              { id: 12, name: 'Áo khoác' },
            ],
          },
          {
            type: 'Quần',
            detail: [
              { id: 4, name: 'Quần Jean' },
              { id: 8, name: 'Quần tây' },
              { id: 9, name: 'Quần đùi' },
            ],
          },
          {
            type: 'Váy',
            detail: [
              { id: 6, name: 'Váy' },
              { id: 7, name: 'Đầm' },
            ],
          },
          {
            type: 'Phụ kiện',
            detail: [
              { id: 5, name: 'Đồ lót' },
              { id: 10, name: 'Thắt lưng' },
              { id: 11, name: 'Mũ/Nón' },
            ],
          },
        ],
      },
      details: [
        {
          color: '',
          size: '',
          stock: null,
        },
      ],
      newImages: [
        {
          colorName: null,
          imageFile: '',
          imageType: 'Ảnh bìa',
          imageData: null,
          isDefault: true,
          sortOrder: 0,
          isSizeDetail: false,
        },
        {
          colorName: '',
          imageFile: '',
          imageType: 'Ảnh màu',
          imageData: null,
          isDefault: false,
          sortOrder: 1,
          isSizeDetail: false,
        },
      ],
      updateImages: [],
    };
  },
  methods: {
    addCategory() {
      this.details.push({
        color: null,
        size: null,
        stock: null,
      });
      this.newImages.push({
        colorName: '',
        imageFile: '',
        imageType: 'Ảnh màu',
        isDefault: false,
        sortOrder: 2,
        isSizeDetail: false,
      });
    },
    agree() {
      // this.$emit('create-product', productInfo);
      this.dialog = false;
    },
    cancel() {
      this.dialog = false;
    },
    deleteColor() {
      this.dialog = true;
    },
    create() {
      let productInfo = new FormData();
      productInfo.append('name', this.name);
      productInfo.append('description', this.description);
      productInfo.append('gender', this.gender);
      productInfo.append('price', this.price);
      productInfo.append('originalPrice', this.originalPrice);
      productInfo.append('categoryId', this.categoryId);

      this.details.forEach((item, index) => {
        productInfo.append(`details[${index}].color`, item.color);
        productInfo.append(`details[${index}].size`, item.size);
        productInfo.append(`details[${index}].stock`, item.stock);
      });
      this.newImages.forEach((item, index) => {
        productInfo.append(`newImages[${index}].isDefault`, item.isDefault);
        productInfo.append(`newImages[${index}].sortOrder`, item.sortOrder);
        productInfo.append(`newImages[${index}].colorName`, item.colorName);
        productInfo.append(
          `newImages[${index}].isSizeDetail`,
          item.isSizeDetail
        );
        productInfo.append(`newImages[${index}].imageFile`, item.imageFile);
      });
      this.$emit('create-product', productInfo);
    },
    update() {
      let productInfo = new FormData();
      productInfo.append('id', this.id);
      productInfo.append('name', this.name);
      productInfo.append('description', this.description);
      productInfo.append('gender', this.gender);
      productInfo.append('price', this.price);
      productInfo.append('originalPrice', this.originalPrice);
      productInfo.append('categoryId', this.categoryId);
      this.details.forEach((item, index) => {
        productInfo.append(`details[${index}].color`, item.color);
        productInfo.append(`details[${index}].size`, item.size);
        productInfo.append(`details[${index}].stock`, item.stock);
      });
      this.newImages.forEach((item, index) => {
        console.log('image - file', item.imageFile);
        if (item.imageFile) {
          console.log('Hello - ', item.imageFile)
          productInfo.append(`updateImages[${index}].isDefault`, item.isDefault);
          productInfo.append(`updateImages[${index}].sortOrder`, 2);
          productInfo.append(`updateImages[${index}].colorName`, item.colorName);
          productInfo.append(
            `updateImages[${index}].isSizeDetail`,
            item.isSizeDetail
          );
          productInfo.append(`updateImages[${index}].imageFile`, item.imageFile);
          productInfo.append(`updateImages[${index}].id`, 0);
        }
      });
      this.$emit('update-product', productInfo);
    },
    deleteColorSize(item, index) {
      if (index > 0) {
        if (item.color && item.size && item.stock) {
          this.dialog = true;
        } else {
          this.colorSize.pop(index);
          this.newImages.pop(index);
        }
      }
    },
    setColor(item, index) {
      this.newImages[index + 1].colorName = item.color;
    },
    readURL(e, index) {
      let reader = new FileReader();
      this.newImages[index].imageFile = e.target.files[0];
      reader.onload = (e) => {
        this.newImages[index].imageData = e.target.result;
      };
      reader.readAsDataURL(this.newImages[index].imageFile);
    },
  },
  watch: {
    productDetail() {
      if (this.productDetail != null) {
        console.log(this.productDetail);
        this.productDetail.resultObj.images.forEach((item) => {
          if (item.isDefault === true) {
            item.imageType = 'Ảnh bìa';
          } else {
            item.imageType = 'Ảnh màu';
          }
          item.imageData = item.imagePath;
        });
        this.id = this.productDetail.resultObj.id;
        this.name = this.productDetail.resultObj.name;
        this.description = this.productDetail.resultObj.description;
        this.gender = this.productDetail.resultObj.gender;
        this.price = this.productDetail.resultObj.price;
        this.originalPrice = this.productDetail.resultObj.originalPrice;
        this.categoryName =
          this.productDetail.resultObj.categoryName.split(' ')[0];
        console.log(
          'categoryNAme - ',
          this.productDetail.resultObj.categoryName
        );
        this.categoryDetail = this.productDetail.resultObj.categoryName;
        // this.categoryId = this.productDetail.resultObj.categoryId;
        this.details = this.productDetail.resultObj.details;
        this.newImages = this.productDetail.resultObj.images;
        console.log('productDetail - ', this.productDetail);
      }
    },
    gender(value) {
      if (value === 1) {
        this.type = [];
        this.maleSelection.category.forEach((item) => {
          this.type.push(item.type);
        });

        this.maleSelection.category.forEach((item) => {
          if (item.type === this.categoryName) {
            this.detail = item.detail;
          }
        });
      }
      if (value === 2) {
        this.type = [];
        this.femaleSelection.category.forEach((item) => {
          this.type.push(item.type);
        });

        this.femaleSelection.category.forEach((item) => {
          if (item.type === this.categoryName) {
            this.detail = item.detail;
          }
        });
      }
      this.categoryDetail = this.productDetail.resultObj.categoryName;
    },
  },
};
</script>

<style scoped>
.product-form-block {
  background-color: #ffffff;
}
.product-name-block {
  display: grid;
  grid-template-columns: 120px 400px;
  column-gap: 10px;
  justify-items: left;
}

.product-name-block .text-block > input {
  width: 300px;
}
/* .product-name-block .label-block {
  justify-self: left;
} */
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
  border: solid 1px #616161;
  background-color: #ffffff;
  height: 32px;
  width: 100%;
  outline: #616161;
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

.img-product-block {
  display: inline-grid;
  grid-template-columns: 90px 40px;
  height: 100px;
  justify-self: center;
  align-items: center;
  position: sticky;
}

.img-product {
  max-width: 80px;
  max-height: 80px;
  place-self: center;
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

.btn-cancel {
  background-color: #b4b1b1 !important;
}
</style>
