<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  props:{
    probeType:{
      type:Number,
      default:0
  },
  pullUpLoad:false
  },
  data(){
    return {
      scroll:null
    }
  },
  mounted(){

    //1.创建BScroll对象
    this.scroll=new BScroll(this.$refs.wrapper,{
      /* 
      1.无论是否设置click:false,button都可以点击
      2.必须设置click:true,那么div才能监听点击
      */
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad


    })

    //监听滚动位置,     为了更加严谨，最好加上if判断
   if(this.probeType===2||this.probeType===3){
      this.scroll.on('scroll',(position)=>{
      this.$emit('scroll',position)

    })
   }


    //监听上拉事件
    // this.scroll.on('pullingUp',()=>{
    //     this.$emit('pullingUp')
    // // this.scroll.finishPullUp()
    // })

//监听滚动事件
if(this.pullUpLoad){
  this.scroll.on('pullingUp',()=>{
    this.$emit('pullingUp')
  })
}




  },
   methods:{
    scrollTo(x,y,time=500){
      this.scroll&&this.scroll.scrollTo(x,y,time)
      
    },
    refresh(){

      this.scroll&&this.scroll.refresh()
    },

    finishPullUp(){
      this.scroll.finishPullUp()
    } ,
    getSaveY(){
     return this.scroll?this.scroll.y:0;
    }
  }
 

}
</script>

<style>

</style>