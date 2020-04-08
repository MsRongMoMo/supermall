<template>
  <div v-if="Object.keys(goods).length!==0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span >{{goods.columns[0]}}</span>
      <span >{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1]['name']}}</span>
    </div>
    <div class="info-services">
      <span class="info-services-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt />
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type:Object,
      default(){
        return {}
      }
    }
  }
};
</script>

<style scoped>
.base-info{
  margin-top:15px;
  padding:0 8px;
  color:#999;
  border-bottom:5px solid #faf5f8;
}
.info-title{
  color:rgba(0,0,0,0.7);
  font: 18px/0.9 Arial, Verdana, "\6977\4F53";
  font-weight: bolder;
}
.info-price{
  margin-top:10px;
}
.info-price .n-price{
  font-size: 24px;
  color:var(--color-high-text);

}
.info-price .o-price{
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
}
.info-price .discount{
 position: relative;
  background-color: var(--color-high-text);
  border-radius:10px;
  font-size: 14px;
  padding:1px 5px;
  color:#fff;
 left:8px;
 top:-8px;
}
.info-other{
  font-size: 14px;
  display: flex;
  margin-top:8px;

}
.info-other span{
  flex:1;
}
.info-other span:last-child,.info-services-item:last-child{
  text-align: right;
}
.info-other span:nth-child(2),.info-services-item:nth-child(2){
  text-align: center;
}
.info-services{
  font-size: 12px;
  margin-top:3px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.info-services img{
  width:12px;
}
.info-services-item{
  flex:1;
}
</style>