<template>
    <div id="cart">
      <nav-bar class="cart-nav">
      <template v-slot:center>
      <div>购物车({{cartLength}})</div>
      </template>     
    </nav-bar>

    <cart-list/>

    <cart-bottom-bar/>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'


import {mapGetters} from 'vuex'

export default {
  name: 'ShopCart',
  data() { 
    return {

    }
  },
  props: {

  },
  components:{
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    ...mapGetters(['cartLength'])
    // ...mapGetters({
    //   length: 'cartLength', //{{length}}
    //   list: 'cartList',
    // })
    // cartLength() {
    //   return this.$store.getters.cartLength
    // }
  },
  created() {

  },
  mounted() {

  },
  updated() {

  },
  methods:{

  },
 }
</script>

<style scoped>
  #cart{
    height: 100vh;
  }
  .cart-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>