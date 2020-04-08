<template>
<div class="detailSwiper">
  <swiper class="swiper-box">
    <swiper-item v-for="item in topImages">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</div>
  
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  }

}
</script>

<style scoped>
.swiper-box{
  height:260px;
  overflow: hidden;
}

</style>