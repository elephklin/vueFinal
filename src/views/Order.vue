<template>
   <div>
      <div class="container my-5">

         <div class="row justify-content-center">
            <div class="col-md-10">
               <div class="row justify-content-around process_style">
                  <div class="col-md-3 p-2 rounded-pill process_undone text-center">1.購物車內容</div>
                  <div
                  class="col-md-3 p-2 rounded-pill process_now text-center my-3 my-md-0"
                  >2.訂單填寫</div>
                  <div class="col-md-3 p-2 rounded-pill process_undone text-center">3.結帳</div>
               </div>
            </div>
            <div class="col-md-9">
               <!-- 訂單 -->
               <form class="my-5" @submit.prevent="creatOrder">
                  <div class="form-group">
                     <label for="username">
                        收件人姓名 <span class="text-danger">*必填</span>
                     </label>
                     <input
                        type="text"
                        class="form-control"
                        name="name"
                        id="username"
                        :class="{'is-invalid':errors.has('name')}"
                        v-validate="'required'"
                        v-model="form.user.name"
                        placeholder="輸入姓名"
                     />
                     <span class="text-danger" v-if="errors.has('name')">必須輸入姓名</span>
                  </div>
                  <div class="form-group">
                     <label for="usertel">
                        收件人手機號碼<span class="text-danger">*必填</span>
                     </label>
                     <input
                        type="tel"
                        class="form-control"
                        id="usertel"
                        name="tel"
                        :class="{'is-invalid':errors.has('tel')}"
                        v-validate="'required|digits:10'"
                        v-model="form.user.tel"
                        placeholder="請輸入手機號碼"
                     />
                     <span class="text-danger" v-if="errors.has('tel')">請輸入 10 位數手機號碼</span>
                  </div>
                  <div class="form-group">
                     <label for="userEmail">
                        Email <span class="text-danger">*必填</span>
                     </label>
                     <input
                        :class="{'is-invalid':errors.has('email')}"
                        type="email"
                        v-model="form.user.email"
                        class="form-control"
                        name="email"
                        id="userEmail"
                        v-validate="'required|email'"
                        placeholder="請輸入 Email"
                     />
                     <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
                  </div>
                  <div class="form-group">
                     <label for="useraddress">
                        收件人地址<span class="text-danger">*必填</span>
                     </label>
                     <input
                        type="text"
                        class="form-control"
                        name="address"
                        id="useraddress"
                        :class="{'is-invalid':errors.has('address')}"
                        v-validate="'required'"
                        v-model="form.user.address"
                        placeholder="請輸入地址"
                     />
                     <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
                  </div>

                  <div class="payments my-5">
                     <div class="h6">
                        付款方式：
                        <span class="text-danger mt-2" v-if="errors.has('payment')">(尚未選擇付款方式)</span>
                     </div>
                     <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="payment" id="shopPay" value="shopPay" :class="{'is-invalid':errors.has('payment')}" v-model="form.payment_method" v-validate="'required'">
                        <label class="form-check-label" for="shopPay">超商代碼繳費</label>
                     </div>
                     <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="payment" id="cardPay" value="cardPay" :class="{'is-invalid':errors.has('payment')}" v-model="form.payment_method" v-validate="'required'">
                        <label class="form-check-label" for="cardPay">信用卡刷卡</label>
                     </div>
                     <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="payment" id="cashPay" value="cashPay" :class="{'is-invalid':errors.has('payment')}" v-model="form.payment_method" v-validate="'required'">
                        <label class="form-check-label" for="cashPay">郵局貨到付款</label>
                     </div>
                     
                  </div>

                  <div class="form-group">
                     <label for="comment">留言</label>
                     <textarea name id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                  </div>
                  <div class="text-right">
                     <button class="btn btn-danger">送出訂單</button>
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
         cart: {
            carts: {}
         },
         form: {
            user: {
               name: "",
               email: "",
               tel: "",
               address: ""
            },
            message: "",
            payment_method: "",
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
      creatOrder() {
         const vm = this;
         //vm.isLoading = true;
         const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/order`;
         vm.$validator.validate().then(res => {
            if (res) {
               vm.$http.post(api, { data: vm.form }).then(res => {
                  if(res.data.success) {
                     console.log('送出訂單',res.data);
                     // 注意 EventBus 觸發事件名稱要正確
                     vm.$bus.$emit("upDateCart");
                     //vm.getCart();

                     // orderId 對應 path:'/checkout/:orderId',
                     vm.$router.push(`/checkout/${res.data.orderId}`);
                  } else {
                     console.log('欄位不得為空');
                     vm.$bus.$emit("message:push", `欄位不得為空`, "danger");
                  }
               });
            } 
            
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
// 有時候載入 scss 沒效，必須重新 npm run serve
   //@import "@/assets/elements/_Order.scss";
</style>