<template>
  <div class="bottom-bar">
   <div class="check-content">
    <check-button 
        :isChecked="isSelectAll" 
        class="check-button"
        @click.native="checkClick"/>
    <!-- <CheckButton class="select-all" @checkBtnClick="checkBtnClick" v-model="isSelectAll"></CheckButton> -->
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product" @click="calClick">去结算({{checkLength}})</span>
   </div>
  </div>
</template>

<script>
import CheckButton from './CheckButton'
import {mapGetters} from 'vuex'

export default {
  name: 'CartBottomBar',
   components: {
		  CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
		  totalPrice() {
        return this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.nowPrice
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        if(this.checkLength===0) return false
        return this.cartList.find(item => item.checked === false) === undefined;
        // return !(this.$store.getters.cartList.filter(item => !item.checked).length)
      }
    },
    methods: {
      checkClick() {
        // 1.判断是否有未选中的按钮
        // 2.有未选中的内容, 则全部选中
        if (this.isSelectAll) {
          this.cartList.forEach(item => {
            item.checked = false;
          });
        } else {
          this.cartList.forEach(item => {
            item.checked = true;
          });
        }
      },
      calClick() {     
        if(!this.isSelectAll){
          this.$toast.show('请选择购买的商品')
        }
      }
    }
 }
</script>

<style scoped>
  .bottom-bar {
    height: 44px;
    background-color: #eee;
    position: relative;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #666;
    box-sizing: border-box;
  }
  .check-content {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .check-button {
    margin: auto 8px
  }
  .total-price {
    margin-left: 25px;
    color: #666;
    flex: 1;
  }
  .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
 
</style>