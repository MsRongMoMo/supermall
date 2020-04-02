<template>
<div class="tab-control">
  <div class="tab-controlItem" v-for="(item,index) in title" :class="{active: index==currentIndex}"  @click="itemClick(index)">
      <span>{{item}}</span>
  </div>
</div>
  
</template>

<script>
export default {
  props:{
    title:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
       this.currentIndex=index
       this.$emit('selectedClick',index)
    }
  }

}
</script>

<style>
.active {
  color:var(--color-high-text);
  padding-top: 3px;
  display: block;

}
.active span{
  padding: 5px;
  border-bottom: 3px solid var(--color-high-text);

}
.tab-control{
  display: flex;
   text-align: center;
   height: 40px;
   line-height: 40px;
font-size: 15px;
}
  .tab-controlItem{
   flex: 1;
   
  }
</style>