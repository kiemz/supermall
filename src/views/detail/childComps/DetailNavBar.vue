<template>
  <div>
    <nav-bar>
      <template v-slot:left>
       <div class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
       </div>
      </template> 
      <template v-slot:center>
      <div class="title">
        <div v-for="(item,index) in titles" 
        class="title-item"
        :class="{active: index === currentIndex}"
        @click="titleClick(index)"
        @blur="positionScroll(index)">
        {{item}}
        </div>
      </div>
      </template> 
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  data() { 
    return {
      titles: ['商品','参数','评论','推荐'],
      currentIndex: 0,
    }
  },
  props: {

  },
  components:{
    NavBar,
  },
  created() {

  },
  mounted() {

  },
  updated() {

  },
  methods:{
    titleClick(index){
      this.currentIndex = index
      this.$emit('titleClick',index)
    },
    backClick(){
      this.$router.back()
    }
  },
 }
</script>

<style scoped>
.title{
  display: flex;
}
.title-item{
  flex: 1;
}
.active{
  color: var(--color-high-text);
}

.back img{
 vertical-align: middle;
}
</style>