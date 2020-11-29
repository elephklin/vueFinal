<template>
   <div>
      <loading :active.sync="isLoading"></loading>
      <div class="container pt-5">
         <div class="row justify-content-center">
            <div class="col-md-10">
               <div class="row justify-content-around process_style">
                  <div class="col-md-3 p-2 rounded-pill process_undone text-center">1.購物車內容</div>
                  <div
                  class="col-md-3 p-2 rounded-pill process_undone text-center my-3 my-md-0"
                  >2.訂單填寫</div>
                  <div class="col-md-3 p-2 rounded-pill process_now text-center">3.結帳</div>
               </div>
            </div>

            <div class="col-md-8 my-5">
               <form class="" @submit.prevent="">
                  <table class="table table-hover checkout_table">
                     <thead>
                        <tr class="">
                           <th width="">商品資訊</th>
                           <th width="" class="text-center">單價</th>
                           <th width="" class="text-center">數量</th>
                           <th width="" class="text-center">小計</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr v-for="item in order.products" :key="item.id">
                           <td class="align-middle">
                              <div class="d-flex justify-content-start">
                                 <div class="imgSize" :style="`background-image:url('${item.product.imageUrl}');`">
                                 </div>
                                 <div class="align-self-center ml-4">
                                    <span class="">{{item.product.title}}</span>
                                 </div>
                              </div>
                           </td>
                           <td class="align-middle text-right">{{ item.product.price | currency }}</td>

                           <td class="align-middle text-center">{{ item.qty }} / {{ item.product.unit }}</td>

                           <td class="align-middle text-right">{{ item.final_total | currency }}</td>
                        </tr>
                     </tbody>
                     <tfoot>
                        <tr>
                           <td colspan="3" class="text-right">合計</td>
                           <td class="text-right">{{ order.total | currency }}</td>
                        </tr>
                     </tfoot>
                  </table>

                  <table class="table my-5 checkout_table">
                     <thead>
                        <tr class="">
                           <th colspan="2">訂單資訊</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <th class="" width="">購買日期</th>
                           <td class="">{{order.create_at | date}}</td>
                        </tr>
                        <tr>
                           <th>訂單編號</th>
                           <td>{{order.id}}</td>
                        </tr>
                        <tr>
                           <th width="">Email</th>
                           <td>{{ order.user.email }}</td>
                        </tr>
                        <tr>
                           <th>姓名</th>
                           <td>{{ order.user.name }}</td>
                        </tr>
                        <tr>
                           <th>收件人電話</th>
                           <td>{{ order.user.tel }}</td>
                        </tr>
                        <tr>
                           <th>收件人地址</th>
                           <td>{{ order.user.address }}</td>
                        </tr>
                        <tr>
                           <th>付款狀態</th>
                           <td>
                              <span v-if="!order.is_paid">尚未付款</span>
                              <span v-else class="text-success">付款完成</span>
                           </td>
                        </tr>
                     </tbody>
                  </table>
                  <div class="text-right" v-if="order.is_paid === false">
                     <button class="btn btn-danger" @click="payFinish">確認付款去</button>
                  </div>
               </form>
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
         orderId: '',
         order: {
            user: {},
         },
         isPaid: false,
      }
   },
   methods: {
      getOrder() {
         const vm = this;
         const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/order/${vm.orderId}`;
         vm.isLoading = true;
         vm.$http.get(api).then(res => {
            if (res.data.success) {
               vm.order = res.data.order;
               console.log('getOrder',vm.order);
               vm.isPaid = res.data.order.is_paid;
               vm.isLoading = false;
            }
         });
      },

      payFinish() {
         const vm = this;
         let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/pay/${vm.orderId}`;
         vm.isLoading = false,
         vm.$http.post(api).then(response => {
            if (response.data.success) {
               vm.isPaid = true;
               vm.getOrder();
               vm.isLoading = true;
            } else {
               vm.$bus.$emit('message:push', '付款失敗', 'danger');
               vm.isLoading = true;
            }
         });
      }
   },
   created() {
      this.orderId = this.$route.params.orderId;
      this.getOrder();
   },
}
</script>

<style scoped lang="scss">
   //@import "@/assets/elements/_Checkout.scss";
</style>