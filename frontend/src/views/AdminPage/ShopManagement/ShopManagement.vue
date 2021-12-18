<template>
  <div class="shop-management-wrapper">
    <top-title :title="title"></top-title>
    <hr class="hr" />
    <div class="header__top-search-block">
      <input 
      type="text" 
      placeholder="Tìm kiếm cửa hàng"
      v-model="searchString" />
      <v-btn @click="search(searchString)">Tìm kiếm</v-btn>
    </div>
    <div class="shop-table" v-if="allShops">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Thứ tự</th>
            <th>Tên cửa hàng</th>
            <th>Tên chủ cửa hàng</th>
            <th>Trạng thái cửa hàng</th>
            <th>Ngày tạo</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(shop, index) in allShops" :key="index">
            <td>{{ shop.shopId }}</td>
            <td>{{ shop.nameOfShop }}</td>
            <td>{{ shop.nameOfUser }}</td>
            <td v-if="shop.disable">Đã bị vô hiệu hóa</td>
            <td v-else>Đang hoạt động</td>
            <td>{{ shop.dateCreated.slice(0,10) }}</td>
            <td>

              <v-btn icon @click="shopDetail(shop.shopId)">
                <v-icon size="16px">fa-edit</v-icon>
              </v-btn>

              <v-btn icon @click="shopAmnesty(shop.shopId)">
                <v-icon size="16px">fa-check-circle</v-icon>
              </v-btn>

              <v-btn icon 
               @click="shopDisable(shop.shopId)">
              <v-icon size="20px">mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </table>

      <v-dialog v-model="editShop">
        <shop-detail 
        :eachShop="eachShop">
        </shop-detail>
      </v-dialog>

      <v-dialog v-model="amnestyDialog">
        <confirm-dialog
          :question="amnestyQuestion"
          @agree-confirm-dialog="amnestyAgree(eachShop)"
          @cancel-confirm-dialog="amnestyCancel"
        ></confirm-dialog>
      </v-dialog>

      <v-dialog v-model="disableDialog">
        <confirm-dialog
          :question="disableQuestion"
          @agree-confirm-dialog="disableAgree(eachShop)"
          @cancel-confirm-dialog="disableCancel"
        ></confirm-dialog>
      </v-dialog>
    </div>
    <div v-else
    class="d-flex justify-center align-center"
      style="width: 100wm; height: 100vh">
       <no-content-form
        :showShop="true"
        Notification= "Không có cửa hàng nào cả"
      ></no-content-form>
    </div>
  </div>
</template>

<script>
import TopTitle from '@/components/TopTitle.vue';
import ShopDetail from './ShopDetail.vue';
import ConfirmDialog from '../../../components/ConfirmDialog.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import NoContentForm from '@/components/NoContentForm.vue'
//import ReasonDialog from '../../../components/ReasonDialog.vue';
export default {
  // name: 'shop-management',
  components: { 
    TopTitle,
    ShopDetail,
    ConfirmDialog,
    NoContentForm,
    //ReasonDialog,
  },
  data() {
    return {
      title: 'danh sách các cửa hàng',
      editShop: false,
      amnestyQuestion: 'Bạn có muốn ân xá cho cửa hàng này không',
      disableQuestion: 'Bạn có muốn vô hiệu hóa cửa hàng này không',
      amnestyDialog: false,
      disableDialog: false,
      searchString: '',
    };
  },
  computed: {
    ...mapGetters({
      allShops: 'GET_ALL_SHOPS',
      eachShop: 'GET_EACH_SHOP',
    }),
  },
  methods: {
    ...mapActions({
      getAllShops: 'ACT_GET_ALL_SHOPS',
      getEachShop: 'ACT_GET_EACH_SHOP',
      disableShop: 'ACT_DISABLE_SHOP',
      enableShop: 'ACT_ENABLE_SHOP',
    }),
    ...mapMutations({
      setSnackbar: 'SET_SNACKBAR',
    }),
    search(searchString) {
      this.getAllShops({name: searchString});
    },
    // Edit Shop
    async shopDetail(shopId) {
      await this.getEachShop(shopId);  
      console.log(this.eachShop);    
      this.editShop = true;
    },
     // Amnesty
    async shopAmnesty(shopId) {
      await this.getEachShop(shopId);
      this.amnestyDialog = true;
    },
    async amnestyAgree(eachShop) {
    console.log(eachShop);
      if (eachShop.disable == false) {
        this.setSnackbar({
          type: 'info',
          visible: true,
          text: 'Cửa hàng này hiện đang được hoạt động',
        });
        this.amnestyDialog = false;
        return;
      } else {
        console.log(eachShop.shopId);
        this.enableShop({shopId: eachShop.shopId});
        await setTimeout( async () => {
           await this.getAllShops({name: ' '});
        }, 800);
        this.amnestyDialog = false;
        return;
      }
    },
    amnestyCancel() {
      this.amnestyDialog = false;
    },
    // Disable 
    async shopDisable(shopId) {
      await this.getEachShop(shopId);
      this.disableDialog = true;
    },
    async disableAgree(eachShop) {
      console.log(eachShop);
      if (eachShop.disable == true) {
        this.setSnackbar({
          type: 'info',
          visible: true,
          text: 'Cửa hàng này đang bị vô hiệu hóa',
        });
        this.disableDialog = false;
        return;
      } else {
        console.log(eachShop.shopId);
        this.disableShop({
          shopId: eachShop.shopId,
          disableReason: '',
        });
        await setTimeout( async () => {
           await this.getAllShops({name: ' '});
        }, 800);
        this.disableDialog = false;
        return;
      }
    },
    disableCancel() {
      this.disableDialog = false;
    },
  },
  created() {
    this.getAllShops({name: ''});
  },
};
</script>

<style scoped>
.v-application p {
  margin-left: 0px;
}
.shop-management-wrapper {
  background-color: #ffffff;
  width: 940px;
  padding: 0px 20px;
}

.title-block {
  margin-top: 0px;
  margin-left: 0px;
}
.top-title {
  height: 44px;
  color: #616161;
  border-bottom: 1px solid #616161 !important;
}

.title-block .title p {
  margin-left: 0px !important;
}

.hr {
  margin-bottom: 5px;
  border-width: 0;
  padding-top: 1px;
  background-color: #616161;
}

.header__top-search-block {
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__top-search-block input {
  border: solid 2px #fea200;
  background-color: #ffffff;
  height: 36px;
  width: 900px;
  margin-left: 0;
  outline: #fea200;
  padding: 8px;
  box-shadow: 0px 2px 2px 0px rgb(0 0 0 / 14%);
  font: 400 15px Roboto;
  border-radius: 4px;
}

.header__top-search-block input:focus {
  box-shadow: 0px 0px 8px #fea200;
}

.header__top-search-block .v-btn {
  height: 36px;
  color: #ffffff !important;
  margin-left: 8px;
  background-color: #fea200 !important;
  text-transform: none;
  font: 400 14px Roboto;
  letter-spacing: 0;
  box-shadow: none !important;
}
/* .shop-table {
  display: flex;
  flex-direction: column;
  column-gap: 20px;
  height: 32px;
  width: 100%;
}

.shop-table table th {
    border-collapse: collapse;
    margin: 25px 0;
    font: 500 14px Roboto;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
} */

.styled-table {
  border-collapse: collapse;
  margin: 25px 0;
  font: 400 15px Roboto;
  width: 900px;
}

.styled-table thead tr {
  background-color: #fea200;
  color: #ffffff;
  text-align: left;
}

.styled-table th {
  padding: 12px 15px;
}

.styled-table td {
  padding: 3px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
  font: 400 14px Roboto;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #fea200;
}

.styled-table tbody tr.active-row {
  font-weight: bold;
  color: #fea200;
}
</style>
