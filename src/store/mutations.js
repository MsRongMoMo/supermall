import {ADD_COUNT,ADD_TO_CART,SELECT_ALL_CHECKED} from './mutation-type'
export default{
  [ADD_COUNT](state,payload){
     payload.count++;
  },
  [ADD_TO_CART](state,payload){
    payload.checked=true
    state.cartList.push(payload)
  },
  [SELECT_ALL_CHECKED](state){
    state.cartList[0].checked?state.cartList.forEach(item=>item.checked=false):state.cartList.forEach(item=>item.checked=true)
  }
 }