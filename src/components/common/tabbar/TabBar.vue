<template>
  <div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
export default {
  components:{
  }

}
</script>

<style>
#tab-bar {
  display: flex;
  height:49px;
  background-color: #f6f6f6;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  box-shadow: 0px -2px 2px rgba(100,100,100,0.1);
}

</style>