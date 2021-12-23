<template>
  <div class="reason-dialog">
    <div class="content">
      <p>Nhập lý do:</p>
      <textarea class="textarea input" v-model="reason"></textarea>
    </div>
    <div class="btn-reason-dialog">
      <v-btn class="btn" @click="agree">Xác nhận</v-btn>
      <v-btn class="btn btn-cancel" @click="cancel">Hủy</v-btn>
    </div>

  </div>
</template>
<script>

export default {
  name: 'ReasonDialog',
  props: {
    question: {
      type: String,
      default: '',
      reason: '',
    },
  },
  data() {
    return {
      reason: ''
    };
  },
  methods: {
    agree() {
      this.$emit('agree-reason-dialog', this.reason);
    },
    cancel() {
      this.$emit('cancel-reason-dialog');
    },
  },
};
</script>

<style scoped>
.v-application p {
  margin-bottom: 0px;
}
.reason-dialog {
  border-radius: 4px;
  text-align: center;
  padding: 30px 20px 20px 20px;
  background-color: #ffffff;
}

.btn-reason-dialog {
  margin-top: 12px;
  display: flex;
  justify-content: center;
  column-gap: 10px;
}

.btn {
  background-color: #fea200 !important;
  color: #ffffff !important;
  letter-spacing: 0 !important;
  text-transform: none !important;
  width: 80px !important;
  box-shadow: none !important;
}

.btn-cancel {
  background-color: #b4b1b1 !important;
}

.textarea {
}

.input {
  border: solid 1px #616161;
  background-color: #ffffff;
  height: 100px;
  width: 300px;
  outline: #616161;
  padding: 8px;
  box-shadow: 0px 2px 2px 0px rgb(0 0 0 / 14%);
  font: 400 15px Roboto;
  border-radius: 4px;
}

.input:focus {
  box-shadow: 0px 0px 8px #616161;
}
</style>
