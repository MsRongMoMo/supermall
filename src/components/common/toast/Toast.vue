<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  // props:{
  //   message:{
  //     type:String,
  //     default:''
  //   }
  // },
  data(){
    return {
      message:'',
      isShow:false

    }
  },
  methods:{
   show(res,delay=1500){
      this.message=res
        this.isShow=true
        setTimeout(()=>{
          this.isShow=false
          this.message=''
        },delay)
   }
  }
}
</script>

<style scoped>
.toast{
  position: fixed;
  z-index:3;
  top:50%;
  left:50%;
  padding:7px 10px;
  font-size: 16px;
  border-radius: 15px;
  transform: translate(-50%,-50%);
  background-color: rgba(0,0,0,0.6);
  color:#fff;
}

</style>