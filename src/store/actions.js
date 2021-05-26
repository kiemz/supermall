import {
  ADD_COUNTER,
  ADD_CART
} from './mutations-type'
export default {
  addCart(context, payload) {
    return new Promise((resolve,reject) => {
      // 1.查看是否添加过
    const oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    // 2.+1或者新添加
    if (oldProduct) {
      // oldProduct.count += 1
      context.commit(ADD_COUNTER,oldProduct)
      resolve('当前的商品数量+1')
    } else {
      payload.count = 1
      payload.checked = true
      // context.state.cartList.push(payload)
      context.commit(ADD_CART,payload)
      resolve('添加了新商品')
    }
  })
    // // 1.查看是否添加过
    // const oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    // // 2.+1或者新添加
    // if (oldProduct) {
    //   // oldProduct.count += 1
    //   context.commit(ADD_COUNTER,oldProduct)
    // } else {
    //   payload.count = 1
    //   payload.checked = true
    //   // context.state.cartList.push(payload)
    //   context.commit(ADD_CART,payload)
    // }
  }
}