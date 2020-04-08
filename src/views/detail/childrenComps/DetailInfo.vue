<template>
  <div class="detailInfo">
    <div class="desc">{{detailInfo.desc}}</div>
    <div v-for="(item,index) in detailInfo.detailImage" :key="index">
      <div class="image-key">{{item['key']}}</div>
      <div class="image-list" v-for="index in item['list'].length">
        <img :src="item['list'][index-1]" alt @load="imgLoad" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailInfo: {
      type: Object
    }
  },

  data() {
    return {
      counter: 0,
      imagesLength: 0
    };
  },
  methods: {
    imgLoad() {
      //判断所有的图片都加载完了，进行一次回调
      if (++this.counter === this.imagesLength) {
        this.$emit("imagesload");
      }
    }
  },

  //watch 监听属性的变化
  watch: {
    detailInfo() {
      //获取图片的个数
      this.imagesLength = this.detailInfo.detailImage[0]["list"].length;
    }
  }
};
</script>

<style>
.desc,
.image-key {
  font-size: 18px;
  padding: 5px;
}
.image-list img {
  display: block;
  width: 100%;
}
</style>