<template>
  <div>
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
   
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from 'views/home/childComps/HomeSwiper'
import RecommendView from 'views/home/childComps/RecommendView'
import {getHomeMultidata} from 'network/home'
export default {
  components:{
    NavBar,
    HomeSwiper,
    RecommendView
  },
  data(){
    return {
      banner:[],
      recommends:[]
    }
  },
  created(){

    //函数调用--》压入函数栈（保存函数调用过程中的所有变量）
    //函数调用结束--》弹出函数栈（释放函数所有的变量）
    getHomeMultidata().then(res=>{
    this.banner=res.data.banner.list
    this.recommends=res.data.recommend.list

    
      })
  }

}
</script>

<style>
.home-nav{
  background-color: var(--color-tint);
  color:#fff
}
</style>