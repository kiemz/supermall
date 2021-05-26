<template>
      <!-- :class="{'selector-active': checked}" @click="selectItem" -->
      <div class="check-selector" :class="{check: isChecked}">
        <img src="~assets/img/shopcart/tick.svg" alt="">
      </div>
</template>
<script>
	export default {
		name: "CheckButton",
    props: {
		  isChecked: {
		    type: Boolean,
        default: false,
      }
    },
    data: function () {
		  return {
		    checked: this.value
      }
    },
    methods: {
      selectItem: function () {
        this.$emit('checkBtnClick')
      }
    },
    // watch: {
		//   value: function (newValue) {
    //     this.checked = newValue;
    //   }
    // }
	}
</script>

<style scoped>
  .check-selector {
      position: relative;
      margin: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid #ccc;
      cursor: pointer;
      text-align: center;
  }
  .check-selector img{
    width: 90%;
  }

  .check {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>