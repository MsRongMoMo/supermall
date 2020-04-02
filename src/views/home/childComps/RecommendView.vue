<template>
  <div class="recommend">
    <div class="recommendItem" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <p>{{item.title}}</p>
      </a>
    </div>

  </div>
</template>

<script>
export default {
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  }

}
</script>

<style scoped>
.recommend{
  width: 100%;
  display: flex;
  padding:10px 0 20px;
  border-bottom:10px solid #eee;
}
.recommendItem{
  flex: 1;

}
.recommendItem a{
 
  display: block;
  text-align: center;
  font-size: 14px;
}
.recommendItem a img{
  vertical-align: middle;
  margin-bottom: 10px;
   width: 80px;
  height: 80px;
}
</style>