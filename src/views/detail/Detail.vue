<template>
  <div id="detail">
    <detail-nav-bar class="nav_bar" @titleClick="titleClick" ref="navbar" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-info :detailInfo="detailInfo" @imagesload="imagesLoad"></detail-info>
      <detail-item-params ref="params" :item-params="itemParams"></detail-item-params>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
      <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" v-show="isShow"></toast> -->

  </div>
</template>

<script>
import DetailNavBar from "views/detail/childrenComps/DetailNavBar";
import DetailSwiper from "views/detail/childrenComps/DetailSwiper";
import DetailBaseInfo from "views/detail/childrenComps/DetailBaseInfo";
import DetailShopInfo from "views/detail/childrenComps/DetailShopInfo";
import DetailInfo from "views/detail/childrenComps/DetailInfo";
import DetailItemParams from "views/detail/childrenComps/DetailItemParams";
import DetailCommentInfo from "views/detail/childrenComps/DetailCommentInfo";
import DetailBottomBar from "views/detail/childrenComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
// import Toast from 'components/common/toast/Toast'

import { getDetail, Goods, Shop, getRecommend } from "network/detail";
import { deBounce } from "common/utils";
import { itemImgListener,backTop } from "common/itemImgListenerMixins";

import {mapActions} from 'vuex'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailInfo,
    DetailItemParams,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    // Toast
  },
  props: {},
  data() {
    return {
      iid: "",
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommends: [],
      themeTopYs:{},
      getThemeTopYs:{},
      currentIndex:0,
      // message:'',
      // isShow:false
     
    };
  },
  methods: {
    ...mapActions(['addCart']),
    imagesLoad() {
        this.newRefresh()
        this.getThemeTopYs()
    },
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
     contentScroll(position){
       //this.themeTops:[-44, 12677, 13606, 14005]
        //1.获取y值
        const positionY=-position.y;
        //2.positionY和主题中的值进行对比
        let length=this.themeTopYs.length
        // console.log(positionY)

        //方式一：普通的方式
        // for(let i=0;i<length;i++){
        //   if(this.currentIndex!==i&&(i<length-1&&positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])||(i===length-1&&positionY>=this.themeTopYs[i])){
        //         this.currentIndex=i;
        //         this.$refs.navbar.currentIndex=this.currentIndex
        //   }
        // }


        //方式二：在this.themeTopYs数组的最后添加一个最大值Number.MAX_VALUE
        for(let i=0;i<length-1;i++){
        if(this.currentIndex!==i&&(positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])){
                  this.currentIndex=i;
                  this.$refs.navbar.currentIndex=this.currentIndex
        }

        }
      this.listenBackTop(position)

        
        
     },
     addToCart(){
       //1.获取购物车需要展示的信息
       const product={}
       product.image=this.topImages[0];
       product.title=this.goods.title;
       product.desc=this.goods.desc;
       product.price=this.goods.realPrice;
       product.iid=this.iid;

       
       //2.将商品添加到购物车里
      //  this.$store.dispatch('addCart',product)
      this.addCart(product).then(res=>{
        // this.message=res
        // this.isShow=true
        // setTimeout(()=>{
        //   this.isShow=false
        //   this.message=''
        // },1500)
        // console.log(this.$toast)
        this.$toast.show(res)
      })
     }
    

  },
 

  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid;
    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      //1.获取顶部的图片轮播数据
      const data = res.result;

      this.topImages = data.itemInfo.topImages;
      console.log(this.topImages)
      //2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      console.log(this.goods);
      //3.创建商品信息
      this.shop = new Shop(data.shopInfo);
      console.log(this.shop);

      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
      //5.取出参数信息
      this.itemParams = data.itemParams;
      //6.取出评论信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0];
      }

      //1.尝试失败，值不对的原因：this.$refs.params.$el压根没有渲染
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

      //2.第二次获取：值不对原因：图片没有计算在内
      //根据最新的数据，对应的DOM是已经渲染出来的
      //但是图片依然是没有加载完（目前获取offsetTop不包含其中的图片）
      //offsetTop值不对的时候，都是因为图片的问题
      //       this.$nextTick(()=>{
      //    this.themeTopYs.push(0)
      //     this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // })
    });
    //3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
    // console.log(themeTopYs)

//  this.$nextTick(()=>{
      this.getThemeTopYs = deBounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs)
      this.themeTopYs=this.themeTopYs.map(item=>{
        return item-this.$refs.navbar.$el.offsetHeight
      })
      // console.log(this.themeTopYs)


    }, 100);
  // })
    
  },
  mounted() {
  // this.$nextTick(()=>{
  //     this.getThemeTopYs = deBounce(() => {
  //     this.themeTopYs = [];
  //     this.themeTopYs.push(0);
  //     this.themeTopYs.push(this.$refs.params.$el.offsetTop);
  //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
  //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
  //     console.log(this.themeTopYs);
  //   }, 100);
  // })

  },
destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImageListener);
  },
  mixins: [itemImgListener,backTop]
  
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 1;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 93px);
  background-color: #fff;
  overflow: hidden;
}
/* .nav_bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
} */
</style>