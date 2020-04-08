import {ADD_COUNT,ADD_TO_CART,SELECT_ALL_CHECKED} from './mutation-type'
export default{
  addCart(context,payload){
    // for(let item of state.cartList){
    //   let oldProduct=null
    //     if(item.iid===payload.iid){
    //         oldProduct=item
    //     }
    // }
return new Promise((resolve,reject)=>{
  //1.查找之前数组是否有该商品
  let oldProduct=context.state.cartList.find(item=>item.iid===payload.iid)
  //2.判断oldProduct
  if(oldProduct){
    // oldProduct.count+=1
    context.commit(ADD_COUNT,oldProduct)
    resolve('商品数量+1')
  }else{
    payload.count=1
    // state.cartList.push(payload)
    context.commit(ADD_TO_CART,payload)
    resolve('添加购物车成功！')
  }
})
  },
  selectAllChecked(context){
    context.commit(SELECT_ALL_CHECKED)
  }
}