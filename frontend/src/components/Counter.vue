<template>
  <div class="wrapper">
    <button class="sub" @click="sub" :disabled="disable"
      :class="{'disable': disable}"
    >-</button>
    <input type="text" class="result" v-model="result" :disabled="disable" :class="{'disable': disable}" />
    <button class="add" @click="add" :disabled="disable" :class="{'disable': disable}">+</button>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    disable: {type: Boolean, default: false},
    quantity: {type: Number, default: 1},
  },
  data() {
    return {
      result: 1
    };
  },
  methods: {
    sub() {
      if (this.result == 1) {
        return;
      }
      if (this.result > 1) {
        this.result = this.result - 1;
      }
    },
    add() {
      this.result = this.result + 1;
    }
  },
  watch: {
    result() {
      this.$emit('chooseQuantity', this.result);
      if (this.result < 1) {
        this.result = 1;
      }
    },
    quantity() {
      this.result = this.quantity;
    }
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
}

.sub,
.add {
  width: 28px;
  height: 28px;
  border: 1px solid #e8e8e8;
  font: 400 18px Roboto;
  padding: 2px;
  color: #616161;
}

.sub:hover,
.add:hover {
  color: #fea200;
  background-color: #fcf6f6;
}

.sub {
  margin-right: -1px;
}

.add {
  margin-left: -1px;
}

.result {
  width: 36px;
  height: 28px;
  padding-left: 4px;
  padding-right: 4px;
  text-align: center;
  border: 1px solid #e8e8e8;
  font: 400 13px Roboto;
  color: #616161;
  outline: none;
}

.result:focus {
  box-shadow: 0px 0px 4px #fea200;
  border: 1px solid #fea200;
}

.disable {
  background-color: #F8F8F8;
  pointer-events: none;
  color: #d3d2d2;
}

</style>
