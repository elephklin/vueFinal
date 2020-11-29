<template>
   <div>
      <loading :active.sync="isLoading"></loading>
      <div class="container mt-5">
         <div class="row">
            <div class="col-md-3">
               <ul class="list-category">
                  <li :class="{'active':category==='all'}" @click.prevent="changeCategory('all')">
                     <router-link class="h5" :to="`/productlist/all`">全部商品</router-link>
                  </li>

                  <li v-for="(item, index) in filterCategory" :key="index" :class="{'active':category===item}" @click.prevent="changeCategory(item)">
                     <router-link class="h5" :to="`/productlist/${item}`">{{item}}</router-link>
                  </li>
               </ul>
            </div>
            
            <div class="col-md-9">
               <div class="row">
                  <div class="col-md-6 col-lg-4 mb-4" v-for="item in filterProducts" :key="item.id">
                     <div class="card">
                        <div class="card-cover">
                           <div :style="{backgroundImage: `url(${item.imageUrl})`}" class="card-img"></div>
                        </div>
                        <div class="card-body">
                           <!-- <h4 class="card-title">{{item.title}}</h4> -->

                           <div class="d-flex justify-content-between align-items-center">
                              <div class="h4 card-title mb-0">{{item.title}}</div>
                              <span class="badge badge-minor">{{item.category}}</span>
                           </div>

                           <div class="d-flex justify-content-between align-items-baseline mt-2">
                              <div class="h5 text-danger">{{item.price|currency}}</div>
                              <del class="h6 text-secondary">{{item.origin_price|currency}}</del>
                           </div>
                        </div>
                        <div class="card-footer">
                           <div class="d-flex justify-content-between align-items-baseline">
                              <router-link class="btn btn-sm btn-other" :to="`/product/${item.id}`">查看更多</router-link>
                              <a href="#" class="btn btn-sm btn-other" @click.prevent="addCart(item.id)">購物車</a>
                           </div>
                        </div>

                     </div>
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
         products: [],
         isLoading: false,
         // 載入讀取效果
         category: "all",
         categoryItem: [],
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
            //console.log('getProducts()',vm.products);
         });
      },
      // 商品種類動態加上 active
      changeCategory(item) {
         const vm = this;
         vm.category = item;
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
            if(res.data.success) {
               vm.$bus.$emit("upDateCart");
               vm.$bus.$emit('messsage:push', res.data.message, 'success');
            }
            vm.isLoading = false;
         });
      },
   },
   
   computed: {
      filterCategory() {
         const vm = this;
         // 抓出所有商品的種類
         vm.products.forEach(item=> {
            vm.categoryItem.push(item.category);
         });
         // 過濾掉重複的商品種類
         return vm.categoryItem.filter((item, index, ary)=> {
            return ary.indexOf(item) === index;
         })
      },

      // 商品種類動態路由 router-link 抓取路由 id 來此過濾商品呈現
      filterProducts() {
         const vm = this;
         let selectCategory = vm.$route.params.category;
         //console.log('filterProducts',vm.$route);

         // Header.vue 動態路由 id 改變 active
         vm.category = selectCategory;

         if(selectCategory === 'all') {
            return vm.products;
         } 
         else {
            return vm.products.filter(item => {
               return item.category === selectCategory;
            })
         }
         
      },

   },

   created() {
      const vm = this;
      vm.getProducts();
   },
}
</script>