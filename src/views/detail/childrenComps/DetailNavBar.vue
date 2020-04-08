<template>
  <div id="detailNavBar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot='center' class="navbar">
        <div v-for="(item,index) in titles" class="navbar-item" :class="{active:currentIndex===index}" @click="titleClick(index)">{{item}}</div>
      </div>
    </nav-bar>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  components:{
    NavBar
  },
  data(){
      return {
          titles:['商品','参数','评论','推荐'],
          currentIndex:0
      }
  },
  methods:{
    backClick(){
      this.$router.go(-1)
    },
    titleClick(index){
        this.currentIndex=index
        this.$emit('titleClick',index)
    }

  }

}
</script>

<style scoped>
.back img{
  display: block;
margin:0 auto; 
  padding-top:11px;
}
.navbar{
  display: flex;
  font-size: 14px;
}
.navbar-item{
  flex: 1;
}
.active{
  color:var(--color-high-text)
}



</style>