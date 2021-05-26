<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick" :positionY="positionY" :themeTopYs="themeTopYs"/>


    <scroll class="content" 
    ref="scroll" 
    :probe-type="2"
    @scroll="contentScroll">
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
    <detail-param-info ref="params" :param-info="paramInfo"/>
    <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
    <goods-list ref="recommend" :goods="recommendList"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

    <toast :message="message" :show="show"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailRecommendInfo from './childComps/DetailRecommendInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import {getDetail, Goods, Shop, GoodsParam,getRecommend} from "network/detail";
import {debounce} from "common/utils"
import {itemListenerMixin} from 'common/mixin'

import {mapActions} from 'vuex'
import Toast from 'components/common/toast/Toast'

export default {
  name: 'Detail',
  mixins: [itemListenerMixin],
  data() { 
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      itemListener: null,
      isShowBackTop: false,
      themeTopYs: [],
      getThemeTopY: null,
      positionY: 0,
      currentIndex: null,
      message: '',
      show: false,
    }
  },
  props: {

  },
  components:{
    Scroll,
    BackTop,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,  
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar,
    GoodsList,
    Toast,
  },
  created() {
    //传入iid
    this.iid = this.$route.params.iid

    //根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      // 获取数据
      const data = res.result

      // 获取轮播图数据
      this.topImages = data.itemInfo.topImages

      // 获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // 创建店铺信息
      this.shop = new Shop(data.shopInfo)
   
      // 保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
   
      // 取出评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }

      // 请求推荐数据
      getRecommend().then(res => {
        this.recommendList = res.data.list
      })

      this.getThemeTopY = debounce(() => {
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      })
      // this.$nextTick(() => {
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // })
   })
  },
  unmounted() {
    // 取消全局事件的监听
    this.$bus.off('itemImageLoad',this.itemListener)
  }, 
  updated() {

  },
  methods:{
    ...mapActions(['addCart']),
    imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
    backClick() {
        this.$refs.scroll.scrollTo(0, 0)
        this.isShowBackTop = 0
      },
    contentScroll(position) {
        //1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000

        this.positionY = position.y

        for(let i in this.themeTopYs){
        i=parseInt(i)
        length = this.themeTopYs.length
        // if(this.currentIndex !== i && ((i<length-1 && -this.positionY >= this.themeTopYs [i] && -this.positionY < this.themeTopYs [i+1])
        // || (i === length-1 && -this.positionY >= this.themeTopYs [i]))){
        //   this.currentIndex = i
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }      
        if(this.currentIndex !== i && (-this.positionY >= this.themeTopYs [i] && -this.positionY < this.themeTopYs [i+1])){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }   
      }
      },
    titleClick(index) {
      switch (index) {
          case 0:
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[0],500)
            break
          case 1:
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[1],500)
            break
          case 2:
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[2],500)
            break
          case 3:
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[3],500)
            break
        }
    },
    addToCart() {
      // 1.创建对象
        const product = {}
        // 2.对象信息
        product.iid = this.iid;
        product.imgURL = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc;
        product.nowPrice = this.goods.realPrice;
        // 3.添加到Store中
        // this.$store.commit('addToCart', product)
        this.addCart(product).then(res => {
          // this.show = true
          // this.message = res
          
          // setTimeout(() => {
          //   this.show = false
          //   this.message = ''
          // },1500)

          this.$toast.show(res)
        })
        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res);
        // })
    }
  },
 }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 93px);
  } 
</style>