<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length!==0" >
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">更多 
        <i>&gt;</i>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | getTime}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs" v-if="commentInfo.images&&commentInfo.images.length!==0">
        <img :src="image" alt="" v-for="(image,index) in commentInfo.images" :key="index">
      </div>
    </div>

  </div>
</template>

<script>
import {formatDate}from 'common/utils'
export default {
  props:{
    commentInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  filters:{
    getTime(num){
       let date = new Date(num * 1000);
      return formatDate(date, "yyyy-MM-dd");
    }

  }

}
</script>

<style scoped>
.comment-info{
  padding:5px 12px;
  color:#333;
  border-bottom: 5px solid #f2f5f8;
}
.info-header{
  height:50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(0,0,0,.1);
}
.header-title{
  float:left;
font-size: 15px;
}
.header-more{
  float:right;
  margin-right:10px;
  font-size:13px;
}
.header-more i{
  font-size: 18px;
  vertical-align: middle;
}
.info-user{
  padding:10px 0 5px;
}
.info-user img{
  width: 42px;
  height: 42px;
  border-radius: 50%;
  
}
.info-user span{
  font-size: 15px;
  margin-left: 10px;
  position: relative;
  top:-13px;

}
.info-detail{
  padding:0 5px 15px;
}
.info-detail p{
  font-size:14px;
  color:#777;
  line-height: 1.5;
}
.infno-detail , .info-other{
  font-size:12px;
  color:#999;
  margin-top:10px;
}
.info-other .date{
  margin-right:8px;
}
.info-imgs{
  margin-top:10px;
}
.info-imgs img{
  width:70px;
  height: 70px;
  margin-right:5px;
}

</style>