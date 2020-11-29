<template>
   <div>
      <loading :active.sync="isLoading"></loading>
      <div class="container my-5">
         <div class="row justify-content-center">
            <div class="col-md-10">
               <div class="row justify-content-around process_style">
                  <div class="col-md-3 p-2 rounded-pill process_now text-center">1.購物車內容</div>
                  <div
                  class="col-md-3 p-2 rounded-pill process_undone text-center my-3 my-md-0"
                  >2.訂單填寫</div>
                  <div class="col-md-3 p-2 rounded-pill process_undone text-center">3.結帳</div>
               </div>

               <table class="table table-hover my-5 cart_table">
                  <thead class="">
                     <tr class="">
                        <th width="250">商品資訊</th>
                        <th width="80" class="text-center">單價</th>
                        <th width="80" class="text-center">數量</th>
                        <th width="80" class="text-center">小計</th>
                        <th width="60" class="text-center">操作</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr v-for="item in cart.carts" :key="item.id">
                        <td class="align-middle">
                           <div class="d-flex justify-content-start">
                              <div class="imgSize" :style="`background-image:url('${item.product.imageUrl}');`">
                              </div>
                              <div class="align-self-center ml-4">
                                 <span class="">{{item.product.title}}</span>
                                 <div class="text-success" v-if="item.coupon">已套用優惠券</div>
                              </div>
                           </div>
                        </td>
                        <td class="align-middle text-right">{{ item.product.price | currency }}</td>
                        <td class="align-middle">
                           <div class="d-flex justify-content-start text-center">
                              <select id="cartNum" class="form-control" 
                              v-model="item.qty" 
                              @change="changeCart(item.id, item.qty, item.product_id)">
                                 <option :value="num" v-for="num in 20" :key="num">{{num}}</option>
                              </select>
                              <div class="align-self-center ml-3">{{ item.product.unit }}</div>
                           </div>
                        </td>
                        <td class="align-middle text-right">
                           <span class>{{item.product.price * item.qty |currency}}</span>
                        </td>
                        <td class="align-middle text-center">
                           <button type="button" class="btn btn-outline-danger btn-sm" @click.prevent="removeCart(item.id)">
                              <i class="far fa-trash-alt"></i>
                           </button>
                        </td>
                     </tr>
                  </tbody>

                  <tfoot>
                     <tr v-if="cart.final_total === cart.total">
                        <td colspan="6" class="text-right">
                           合計：
                           <span>{{ cart.total|currency }}</span>
                        </td>
                     </tr>
                     <tr v-if="cart.final_total !== cart.total">
                        <td colspan="6" class="text-right text-secondary">
                           折扣前合計：<span>{{ cart.total|currency }}</span>
                        </td>
                     </tr>
                     <tr v-if="cart.final_total !== cart.total">
                        <td colspan="6" class="h5 text-right">
                           折扣後合計：<span class="h4 text-danger">{{ cart.final_total|currency }}</span>
                        </td>
                     </tr>
                  </tfoot>

               </table>

               <div class="input-group mb-3">
                  <input type="text" class="form-control" v-model="coupons.code" placeholder="請輸入優惠碼" @keyup.enter="useCoupon" />
                  <div class="input-group-append">
                     <button class="btn btn-outline-minor" @click.prevent="useCoupon" type="button"
                     >套用優惠碼</button>
                  </div>
               </div>

               <div class="d-flex justify-content-end mt-4">
                  <router-link class="btn btn-minor" to="/order">下一步</router-link>
               </div>

            </div>
         </div>
         
      </div>
   </div>
</template>

<script>
import $ from 'jquery';

export default {
   data() {
      return {
         isLoading: false,
         quantity: 1,
         cart: {
            carts: {}
         },

         coupons: {
            code: ""
         },
      }
   },
   methods: {
      getCart() {
         const vm = this;
         const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart`;
         vm.isLoading = true;
         vm.$http.get(api).then(res => {
            if (res.data.success) {
               vm.cart = res.data.data;
               console.log('getCart',vm.cart);
               vm.isLoading = false;
            }
         });
      },
      removeCart(id) {
         const vm = this;
         const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart/${id}`;
         vm.isLoading = true;
         vm.$http.delete(api).then((res) => {
            console.log('removeCart',res.data);
            vm.$bus.$emit("upDateCart");
            vm.isLoading = false;
            vm.getCart();
         });
      },

      useCoupon () {
         const vm = this;
         vm.isLoading = true;
         const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/coupon`;
         vm.$http.post(api, { data: vm.coupons }).then(response => {
            // console.log("套用Coupon：", response);
            if (response.data.success) {
               vm.getCart();
               vm.isLoading = false;
            } else {
               vm.coupons.code = "";
               vm.isLoading = false;
            }
         })
      },

      changeCart(orderId, num, id) {
         const vm = this;
         const removeUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart/${orderId}`;

         vm.isLoading = true;
         this.$http.delete(removeUrl).then((res) => {

            const changeData = {
               product_id: id,
               qty: num
            };
            const addUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart`;

            this.$http.post(addUrl, {data: changeData}).then(res => {
               if(res.data.success) {
                  vm.$bus.$emit("upDateCart");
                  vm.getCart();
               }
            });
            vm.isLoading = false;
         });
      }
   },

   created() {
      const vm = this;
      vm.getCart();
   },
}
</script>

<style scoped lang="scss">
   //@import "@/assets/elements/_Cart.scss";
</style>