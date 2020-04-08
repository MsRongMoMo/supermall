<template>
  <div id="cart">
      <nav-bar class="navbar"><div slot="center">购物车({{cartLength}})</div></nav-bar>
      <cart-list></cart-list>
      <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'


import CartList from 'views/cart/childrenComps/CartList'
import CartBottomBar from 'views/cart/childrenComps/CartBottomBar'


import {mapGetters} from 'vuex'
export default {
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    // cartLength(){
    //   return this.$store.getters.cartLength
    // }
    ...mapGetters(['cartLength'])
  }

}
</script>

<style scoped>

.navbar{
  background-color: var(--color-tint);
  color:#fff;
}



</style>