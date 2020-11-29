<template>
   <div>
      <loading :active.sync="isLoading"></loading>
      <div class="container my-5">
         <div class="row">
            <div class="col-md-3">
               <div class="relatedGoods">
                  <h4 class="mb-5 border-bottom-0">相關產品</h4>
                  <ul>
                     <li class="mb-4" v-for="(item) in filterRelated" :key="item.id">
                        <div class="d-flex justify-content-start">
                           <a href="#" @click.prevent="goOtherGoods(item.id)">
                              <div :style="{backgroundImage: `url(${item.imageUrl})`}" class="goodsImg"></div>
                           </a>
                           <div class="goodsData my-auto">
                              <a href="#" @click.prevent="goOtherGoods(item.id)">
                                 {{item.title}}
                              </a>
                              <div class="goodsData_price">NT ${{item.price}}</div>
                           </div>
                        </div>
                     </li>
                  </ul>
               </div>
            </div>
            <div class="col-md-9 single_product">
               <div class="row">
                  <div class="col-sm-12 col-md-7">
                     <img class="img-fluid rounded" :src="product.imageUrl"/>
                  </div>
                  <div class="col-sm-12 col-md-5">
                     <div class="h2 text-minor mb-4">{{product.title}}</div>

                     <div class="row justify-content-between align-items-baseline mb-3">
                        <div class="col-md-12 col-lg-7">
                           <div class="h4 text-danger">NT {{product.price|currency}} 元</div>
                        </div>
                        <div class="col-md-12 col-lg-5">
                           <del class="h6 text-secondary">NT {{product.origin_price|currency}} 元</del>
                        </div>
                     </div>

                     <form>
                        <div class="form-group">
                           <label for="exampleFormControlSelect1">顏色：</label>
                           <select class="form-control" id="exampleFormControlSelect1">
                              <option>黑色</option>
                              <option>白色</option>
                              <option>灰色</option>
                           </select>
                        </div>
                        <div class="mt-3 mb-2">數量：</div>
                        <div class="input-group mb-3">
                           <div class="input-group-prepend">
                              <a href="#" id="button-addon1"
                                 class="btn btn-outline-secondary"
                                 :class="{'disabled':quantity ===1}"
                                 @click.prevent="quantity = quantity - 1"
                              >−</a>
                           </div>
                           <input type="number" min="1" class="form-control text-center" v-model.number="quantity" />
                           <div class="input-group-append">
                              <a href="#" id="button-addon2"
                                 class="btn btn-outline-secondary"
                                 :class="{'disabled':quantity ===99}"
                                 @click.prevent="quantity = quantity + 1"
                              >+</a>
                           </div>
                        </div>
                     </form>

                     <a class="btn btn-minor w-100 mt-3" href="#" role="button" @click.prevent="addCart(product.id, quantity)">
                        <i class="fas fa-cart-plus"></i> 加入購物車
                     </a>
                  </div>
               </div>

               <nav class="mt-5">
                  <div class="nav nav-tabs" id="nav-tab" role="tablist">

                     <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">商品說明</a>

                     <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">購買資訊</a>

                     <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">物流說明</a>
                  </div>
               </nav>

               <div class="tab-content" id="nav-tabContent">

                  <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                     <table class="table">
                        <tbody>
                           <tr>
                              <th>商品材質</th>
                              <td>{{goods.material}}</td>
                           </tr>
                           <tr>
                              <th>製造方式</th>
                              <td>{{goods.makeMethod}}</td>
                           </tr>
                           <tr>
                              <th>商品產地</th>
                              <td>{{goods.originPlace}}</td>
                           </tr>
                           <tr>
                              <th>庫存</th>
                              <td>剩餘  {{goods.inventory}}  件</td>
                           </tr>
                           <tr>
                              <th>商品熱門度</th>
                              <td>已售出  {{goods.saleHot}}  件</td>
                           </tr>
                           <tr>
                              <th>商品特色</th>
                              <td>{{goods.itemFeature}}</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>

                  <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                     <table class="table">
                        <tbody>
                           <tr>
                              <th>付款方式</th>
                              <td>{{buyData.payMethod}}</td>
                           </tr>
                           <tr>
                              <th>退換貨須知</th>
                              <td>{{buyData.goodsReturnChange}}</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>

                  <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                     <table class="table">
                        <tbody>
                           <tr>
                              <th>配送注意</th>
                              <td>{{logistics.deliveryNotice}}</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
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
         products: [],  //所有商品的 API 欄位
         productId: "", //單一商品的 id
         product: {},  //單一商品的 API 各項欄位
         isLoading: false,
         // 載入讀取效果
         status: false,

         // 這邊綁定使用者增加的數量，注意在DOM上的v-model要添加修飾符.number，否則預設會將值轉成string，導致自行輸入數字再利用btn添加時數字錯亂
         quantity: 1,

         goods: {
            material: '塑膠、金屬、不織布、木材',
            makeMethod: '機器',
            originPlace: '台灣',
            inventory: '5',
            saleHot: '30',
            itemFeature: '方便、實用',
         },

         buyData: {
            payMethod: '信用卡/分期, 7-11 ibon 繳費, ATM 轉帳繳費, 全家代碼繳費, LINE Pay',
            goodsReturnChange: '退款申請須於收到商品後隔日起算 7 日內提出若申請逾時或不符合退貨政策條件範圍，本公司有權拒絕退貨，敬請見諒!',
         },

         logistics: {
            deliveryNotice: '假日快遞休息不配送，運費將依購買總金額及配送地點不同而有所差異。',
         }
      }
   },
   components: {
      
   },
   methods: {
      getProducts() {
         const vm = this;
         const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/products/all`;
         vm.isLoading = true;
         // 注意：使用 get 
         this.$http.get(api).then(response => {
            vm.products = response.data.products;
            vm.isLoading = false;
         });
      },
      getProductId() {
         const vm = this;
         const id = vm.$route.params.productId;

         vm.isLoading = true;
         const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/product/${id}`;
         this.$http.get(api).then(res => {
            vm.product = res.data.product;
            vm.isLoading = false;
         });
      },
      goOtherGoods(id){
         const vm = this;
         vm.$router.push(`/product/${id}`);
         vm.getProductId();
      },

      // 加入購物車
      addCart(id, qty=1) {
         const vm = this;
         const cart = {
            product_id: id,
            qty,
         }
         vm.isLoading = true;
         const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart`;
         this.$http.post(api, {data: cart}).then(res => {
            console.log(res);
            if(res.data.success) {
               vm.$bus.$emit("upDateCart");
               vm.$bus.$emit('messsage:push', res.data.message, 'success');
            }
            vm.isLoading = false;
         });
      },
   },
   computed: {
      // 過濾同種類商品
      filterRelated() {
         const vm = this;
         return vm.products.filter(item => {
            if(item.id !== vm.product.id) {
               // 回傳該筆單一商品其他同種類的產品
               return item.category === vm.product.category;
            }
         })
      }
   },
   created() {
      const vm = this;
      vm.getProductId();
      vm.getProducts();
   }
}
</script>