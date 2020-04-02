<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <tab-control  ref="tabControl_2"  :title="['流行','新款','精选']" class="tabControl"
      @selectedClick="itemClick"  v-show="isShowTabControl"
      ></tab-control>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll"  
           :pullUpLoad='true' @pullingUp="loadMore">
      <home-swiper :banner="banner"  @homeswiperImageLoad="homeswiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control  ref="tabControl_1"  :title="['流行','新款','精选']" 
      @selectedClick="itemClick"
      ></tab-control>
      <goods-list :goods="goods[currentTpye].list"></goods-list>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from "views/home/childComps/HomeSwiper";
import RecommendView from "views/home/childComps/RecommendView";
import FeatureView from "views/home/childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
export default {
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView
  },
  data() {
    return {
      banner: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentTpye: "pop",
      isShowBackTop:false,
      offsetTopTabControl:0,
      isShowTabControl:false,
      saveY:0
    };
  },
  computed:{
    
  },
  created() {
    //函数调用--》压入函数栈（保存函数调用过程中的所有变量）
    //函数调用结束--》弹出函数栈（释放函数所有的变量）

    //1.请求多个数据
    this.getHomeMultidata();

       //2.请求商品数据
    this.getHomeGoods("pop", 0);
    this.getHomeGoods("new", 0);
    this.getHomeGoods("sell", 0);

   
 

  },
  mounted(){



     //3.监听item中图片加载完成
     const refresh=this.debounce(this.$refs.scroll.refresh)
    this.$bus.$on('itemImageLoad',()=>{
      // this.$refs.scroll&&this.$refs.scroll.refresh()
      refresh()
    })
     
  },
  activated(){
    console.log('activated')
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    this.saveY=this.$refs.scroll.getSaveY()
    console.log(this.saveY)

  },
  methods: {
    /* 
      事件监听的方法
    */
      homeswiperImageLoad(){
      this.offsetTopTabControl=this.$refs.tabControl_1.$el.offsetTop
    },
    itemClick(index) {
      switch (index) {
        case 0:
          this.currentTpye = "pop";
          break;
        case 1:
          this.currentTpye = "new";
          break;
        case 2:
          this.currentTpye = "sell";
          break;
      }
      this.$refs.tabControl_1.currentIndex=index;
      this.$refs.tabControl_2.currentIndex=index;

    },
    backTopClick(){
      // this.$refs.scroll.scroll.scrollTo(0,0,500)
      this.$refs.scroll.scrollTo(0,0)
      // console.log('backtop被点了')
    },
    contentScroll(position){
      //1.判断backtop是否显示
      this.isShowBackTop=(-position.y)>1000?true:false;
      //2.决定tabcontrol是否吸顶（position:fixed）
      this.isShowTabControl=(-position.y)>this.offsetTopTabControl?true:false;
    },

    //防抖动
    debounce(func,delay){
      let timer=null
      return function(...args){
        if(timer) clearTimeout(timer)
        timer=setTimeout(()=>{

          func.apply(this,args)
        },delay)
      }
    },



    loadMore(){
      this.getHomeGoods(this.currentTpye)
      // this.$refs.scroll.scroll.refresh()
    
      // console.log('上啦加载更多')
    },
   


  

    /* 
      网络请求相关方法
    */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banner = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // console.log(res)
        //把数据存储起来
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
//完成上拉加载更多
      this.$refs.scroll.finishPullUp()

      });
    }
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9;
}

/* .content {
  height: calc(100% - 93px);
  background-color: mistyrose;
  margin-top: 44px;
  overflow: hidden;
} */
.content{
  position:absolute;
  top:44px;
  bottom:49px;
  left: 0;
  right:0;

}
.tabControl{
  position: relative;
  left:0;
  right:0;
  top:44px;
  z-index:9;
  background-color: #fff;
  /* display: none; */
}
</style>