<template>
  <div class="account-management-wrapper">
    <top-title :title="title"></top-title>
    <hr class="hr" />
    <div class="header__top-search-block">
      <input
        type="text"
        placeholder="Tìm kiếm tài khoản..."
        v-model="searchString"
        @keyup.enter="search"
      />
      <v-btn @click="search">Tìm kiếm</v-btn>
      <v-btn @click="openAccountForm"> Tạo tài khoản</v-btn>
    </div>
    <div class="account-table" v-if="allUsers">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Thứ tự</th>
            <th>Họ tên</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in allUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.fullname }}</td>
            <td>{{ user.phoneNumber }}</td>
            <td>{{ user.address }}</td>
            <td v-if="user.disable">Đã bị vô hiệu hóa</td>
            <td v-else>Đang hoạt động</td>
            <td>
              <v-btn icon @click="editForm(user)">
                <v-icon size="16px">fa-edit</v-icon>
              </v-btn>

              <v-btn icon @click="userAmnesty(user.id)">
                <v-icon size="20px">fa-check-circle</v-icon>
              </v-btn>

              <v-btn icon @click="userDisable(user.id)">
                <v-icon size="20px">mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="dialog-block">
       <v-dialog content-class="elevation-0"
        v-model="accountForm"
        width="27%">
        <account-detail
          :showWhileAddNew="true"
          subTitle="Thêm tài khoản"
          buttonTitle="Tạo tài khoản mới"
          @add-update-submit="addNewUser"
        >
        </account-detail>
      </v-dialog>

      <v-dialog
       content-class="elevation-0" 
       v-model="editAccountDialog"
       width="27%">
        <account-detail
          :showWhileEdit="true"
          :eachUser="oneUser"
          subTitle="Chi tiết tài khoản"
          buttonTitle="Cập nhật"
          @add-update-submit="updateUser"
        ></account-detail>
      </v-dialog>

      <v-dialog width="450px" disable v-model="amnestyDialog">
        <confirm-dialog
          :question="amnestyQuestion"
          @agree-confirm-dialog="amnestyAgree"
          @cancel-confirm-dialog="amnestyCancel"
        >
        </confirm-dialog>
      </v-dialog>

      <v-dialog v-model="disableDialog" width="450px">
        <confirm-dialog
          :question="disableQuestion"
          @agree-confirm-dialog="disableAgree"
          @cancel-confirm-dialog="disableCancel"
        >
        </confirm-dialog>
      </v-dialog>
      </div>
    </div>
    <div
      v-else
      class="d-flex justify-center align-center"
      style="width: 100wm; height: 100vh"
    >
      <no-content-form
        :showUser="true"
        Notification="Không có dữ liệu người dùng"
      ></no-content-form>
    </div>
     
  </div>
</template>

<script>
import TopTitle from '@/components/TopTitle.vue';
import AccountDetail from './AccountDetail.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import NoContentForm from '@/components/NoContentForm.vue';

export default {
  components: {
    TopTitle,
    ConfirmDialog,
    AccountDetail,
    NoContentForm,
  },

  data() {
    return {
      title: 'Quản lý tài khoản',
      accountForm: false,
      editAccountDialog: false,
      amnestyQuestion: 'Bạn có muốn ân xá cho người dùng này không',
      disableQuestion: 'Bạn có muốn vô hiệu hóa người dùng này không',
      amnestyDialog: false,
      disableDialog: false,
      searchString: '',
      oneUser: null,
    };
  },

  computed: {
    ...mapGetters({
      allUsers: 'GET_ALL_USERS',
      eachUser: 'GET_EACH_USER',
    }),
  },

  methods: {
    ...mapActions({
      getAllUsers: 'ACT_GET_ALL_USERS',
      getEachUser: 'ACT_GET_EACH_USER',
      disableUser: 'ACT_DISABLE_USER',
      enableUser: 'ACT_ENABLE_USER',
    }),
    ...mapMutations({
      setSnackbar: 'SET_SNACKBAR',
    }),

    openAccountForm() {
      this.accountForm = true;
    },

    async addNewUser() {
      await setTimeout(async () => {  
          this.accountForm = false;
          await this.getAllUsers({ name: ' ' });
      }, 3000);      
    },

    async editForm(user) {
      this.oneUser = user;
      this.editAccountDialog = true;
    },

    async updateUser() {
       await setTimeout(async () => {
          this.editAccountDialog = false;
          await this.getAllUsers({ name: ' ' });
      }, 3000);
      
    },

    async userAmnesty(userId) {
      await this.getEachUser(userId);
      this.amnestyDialog = true;
    },
    async amnestyAgree() {
      if (this.eachUser.disable == false) {
        this.setSnackbar({
          type: 'info',
          visible: true,
          text: 'Người dùng này hiện đang được hoạt động',
        });
        this.amnestyDialog = false;
        return;
      } else {
        this.enableUser({ userId: this.eachUser.id });
        await setTimeout(async () => {
          await this.getAllUsers({ name: ' ' });
        }, 800);
        this.amnestyDialog = false;
      }
    },
    amnestyCancel() {
      this.amnestyDialog = false;
    },

    async userDisable(userId) {
      await this.getEachUser(userId);
      this.disableDialog = true;
    },
    async disableAgree() {
      if (this.eachUser.disable == true) {
        this.setSnackbar({
          type: 'info',
          visible: true,
          text: 'Người dùng này đang bị vô hiệu hóa',
        });
        this.disableDialog = false;
      } else {
        this.disableUser({ userId: this.eachUser.id });
        await setTimeout(async () => {
          await this.getAllUsers({ name: ' ' });
        }, 800);
        this.disableDialog = false;
      }
    },
    disableCancel() {
      this.disableDialog = false;
    },
    async search() {
      await this.getAllUsers({ name: this.searchString });
    },
  },
  created() {
    this.getAllUsers({ name: '' });
  },
};
</script>

<style scoped>
.v-application p {
  margin-left: 0px;
}
.account-management-wrapper {
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
  width: 680px;
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

.v-dialog, .v-dialog--active {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

.v-dialog {
  width: none !important;
  box-shadow: 0px 0px 0px !important;
}

.v-dialog__content {
  width: 100% !important;
  box-shadow: none !important;
  right: 400px !important;
}

</style>
