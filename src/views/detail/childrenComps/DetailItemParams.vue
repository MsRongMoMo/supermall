<template>
  <div class="param-info" v-if="Object.keys(itemParams).length!==0">
    <table v-for="tables in itemParams.rule.tables">
      <tr v-for="(table,index) in tables" class="info-size">
        <td v-for="(tr,indey) in table" >{{tr}}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="desc in itemParams.info.set">
        <td class="info-param-key">{{desc.key}}</td>
        <td class="param-value">{{desc.value}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props:{
    itemParams:{
      type:Object,
      default(){
        return {}
      }
    }
  }

}
</script>

<style scoped>
.param-info{
  padding:20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}
.param-info table{
  width: 100%;
  border-collapse: collapse;
}
.param-info table.table-size td{

}
.param-info table tr{
  height: 42px;
}
.param-info table tr td{
  border-bottom: 1px solid rgba(100,100,100,.1);
}
.info-param-key{
  width: 95px;
}
.info-param{
  border-top:1px solid rgba(0,0,0,0.1)
}
.param-value{
  color:#eb4868;
}
.info-img img{
  width:100%;
}

</style>