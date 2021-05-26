<template>
  <div class="cart-list">
    <scroll class="content"
            ref="scroll">
  <cart-list-item 
      v-for="(item,index) in cartList" 
      :key="index" 
      :itemInfo="item"/>
  </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

import {mapGetters} from 'vuex'


export default {
  name: 'CartList',
  data() { 
    return {

    }
  },
  props: {

  },
  components:{
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
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
.cart-list{
  height: calc(100% - 133px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>