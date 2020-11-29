<template>
   <div>
      <!-- router-link 好像不能搭配 :class -->
      <div class="container mt-4">
         <div class="row">
            <div class="col-md-3 mt-4">
               <div class="list-group backList" id="myList" role="tablist">

                  <!-- <a class="list-group-item list-group-item-action" data-toggle="list" href="#myData" role="tab">個人資料</a> -->

                  <a class="list-group-item list-group-item-action active" data-toggle="list" href="#myOrder" role="tab">我的訂單</a>

                  <!-- <a class="list-group-item list-group-item-action" data-toggle="list" href="#delivery" role="tab">配送資訊</a> -->

                  <a class="list-group-item list-group-item-action" data-toggle="list" href="#products" role="tab">商品列表</a>
                  
                  <a class="list-group-item list-group-item-action" data-toggle="list" href="#coupon" role="tab">優惠券</a>
               </div>
            </div>
            <main class="col-md-9">
               <div class="tab-content back_table">
                  <!-- <div class="tab-pane" id="myData" role="tabpanel">
                     <backMyData></backMyData>
                  </div> -->
                  <div class="tab-pane active" id="myOrder" role="tabpanel">
                     <backMyOrder></backMyOrder>
                  </div>
                  <!-- <div class="tab-pane" id="delivery" role="tabpanel">
                     <backDelivery></backDelivery>
                  </div> -->
                  <div class="tab-pane active" id="products" role="tabpanel">
                     <backProducts></backProducts>
                  </div>
                  <div class="tab-pane" id="coupon" role="tabpanel">
                     <backCoupon></backCoupon>
                  </div>
               </div>
            </main>
         </div>
      </div>
   </div>
</template>

<script>
import backProducts from '../components/Back-products.vue';
//import backMyData from '../components/Back-myData.vue';
//import backDelivery from '../components/Back-delivery.vue';
import backMyOrder from '../components/Back-myOrder.vue';
import backCoupon from '../components/Back-coupon.vue';

export default {
   name: '',
   data () {
      return {
         
      }
   },
   components: {
      backProducts,
      //backMyData,
      //backDelivery,
      backMyOrder,
      backCoupon,
   }
}
</script>


<style lang="scss" scoped>

</style>