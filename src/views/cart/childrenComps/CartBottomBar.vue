<template>
  <div class="cartBottomBar">
    <div class="checkbutton">
      <check-button class="button" @click.native="totalCheck" ref="allChecked" :is-check="isSelectAll"></check-button>
      <span>全选</span>
    </div>
    <div class="price">总计: &yen;{{totalPrice}}</div>
    <div class="calculate" @click="toCalculate">去计算( {{checkedLength}} )</div>
  </div>
</template>

<script>
import CheckButton from "components/common/checkButton/CheckButton";
import {mapGetters} from 'vuex'
export default {
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return this.cartList.filter(item=> item.checked===true)
      .reduce((previous,item)=>{return previous+item.price*item.count},0).toFixed(2)
    },
    checkedLength(){
      return this.cartList.filter(item=>item.checked===true).length
    },
    isSelectAll(){
      if(this.cartList.length===0) return false
      return !this.cartList.find(item=>!item.checked)

    }
  },
  methods:{
    totalCheck(){
     this.$store.dispatch('selectAllChecked')
     this.$refs.allChecked.isCheck=true
    // this.$refs.allChecked
      // if(this.$refs.allChecked)

    },
    toCalculate(){
      if(!this.checkedLength){
      return  this.$toast.show('请先添加商品')
      }
    }
  }
};
</script>

<style scoped>
.cartBottomBar {
  width: 100%;
  height: 40px;
  background-color: #eee;
  position: relative;
  z-index: 1;
  line-height: 40px;
  padding: 0 5px;
  display: flex;
}
.checkbutton {
  display: flex;
  align-items: center;
  margin-right: 30px;
  /* justify-content: center; */
}
.checkbutton .active {
  /* width:22px; */
}
.checkbutton span {
  font-size: 16px;
  margin-left: 5px;
}
.price{
  font-size: 20px;
}
.calculate{
  font-size: 18px;
  background-color: var(--color-tint);
  padding:0 10px;
  position: absolute;
  right:0;
  color:#fff;

}
</style>