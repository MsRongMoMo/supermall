<template>
   <swiper>
      <swiper-item v-for="item in banner">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="ImageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  props:{
    banner:{
      type:Array,
      default(){
        return []
      }
    }

  },
  data(){
    return{
    isLoad:false

    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    ImageLoad(){
      if(!this.isLoad){
      this.$emit('homeswiperImageLoad')
      this.isLoad=true

      }
    }
  }

}
</script>

<style scoped>

</style>