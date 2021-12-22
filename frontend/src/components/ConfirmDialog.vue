<template>
      <div class="confirm-dialog">
      <div class="content">
        <p> {{ question }}</p>
      </div>
      <div class="btn-confirm-dialog">
        <v-btn class="btn" @click="agree">Đồng ý</v-btn>
        <v-btn class="btn btn-cancel" @click="cancel">Hủy</v-btn>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: {
    question: {
      type: String,
      default: ''
    }
  },
  methods: {
    agree() {
      this.$emit('agree-confirm-dialog');
    },
    cancel() {
      this.$emit('cancel-confirm-dialog');
    }
  }
}
</script>

<style scoped>
.confirm-dialog {
  border-radius: 4px;
  text-align: center;
  padding: 30px 20px 20px 20px ;
  box-shadow: 0px 0px 4px 1px #616161;
  background-color: #ffffff;
}

.btn-confirm-dialog {
  margin-top: 24px;
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
</style>