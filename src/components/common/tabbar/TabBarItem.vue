<template>
  <div class="tab-bar-item" @click="itemClick()">
    <slot v-if="!isActive" name="item_icon"></slot>
    <slot v-else name="item_icon_active"></slot>
    <!-- <div :class="{active:isActive}"> -->
    <div :style="activeStyle">
      <slot name="item_text"></slot>
    </div>

    <!-- <div class="tab-bar-item"><img src="../../assets/img/tabbar/home.svg" alt=""><div>首页</div></div>
      <div class="tab-bar-item"><img src="../../assets/img/tabbar/home.svg" alt=""><div>分类</div></div>
      <div class="tab-bar-item"><img src="../../assets/img/tabbar/home.svg" alt=""><div>购物车</div></div>
    <div class="tab-bar-item"><img src="../../assets/img/tabbar/home.svg" alt=""><div>我的</div></div>-->
  </div>
</template>

<script>
export default {
  props: {
    path: String,
   activecolor: {
      type: String,
      default: "#ff8198"
    }
  },
  data() {
    return {};
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activecolor } :{} ;
    }
  },
  methods: {
    itemClick() {
      console.log("itemclick");
      this.$router.replace(this.path);
    }
  }
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  font-size: 14px;
  padding-top: 3px;
}
.tab-bar-item img {
  height: 24px;
  width: 24px;
  vertical-align: middle;
}
.active {
  color: deeppink;
}
</style>