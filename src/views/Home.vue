<template>
   <div class="home">
      <loading :active.sync="isLoading"></loading>
      <!-- 
         <Header/> 跟 <Footer/>
         直接在父層組件(App.vue)載入與其他同層共通
      -->

      <!-- 廣告牆 banner -->
      <carousel
         :per-page="1"
         :navigate-to="someLocalProperty"
         :mouse-drag="true"
         :autoplay="true"
         :autoplayTimeout="3000"
         :loop="true"
         :autoplayHoverPause="false"
         :speed="2000"
         paginationPosition="bottom-overlay"
         paginationActiveColor="#0486DB"
         paginationColor="#e0e0e0"
      >
         <slide v-for="(item, index) in slideContent" :key="index">
            <div class="carousel-img" :style="`background-image:url('${item.imgUrl}')`"></div>
         </slide>
      </carousel>

      <!-- 優惠活動區 -->
      <div class="container-fluid">
         <div class="row">
            <div class="col-12 col-md-7 p-5 couponArea-bg">
               <div class="h3 text-important text-center mb-4">最新優惠活動</div>
               <table class="table mb-0">
                  <tbody>
                     <!-- //串接 API 寫法 -->
                     <tr class="marquee" v-for="(item) in coupons" :key="item.id">
                        <th class="align-middle" width="120">
                           即日起到~
                           <span class="text-danger">{{item.due_date | date}}</span>
                        </th>
                        <td class="align-middle">
                           <marquee class="align-middle">『<span class="text-minor pr-0">{{item.title}}</span>』活動開跑~活動期間購買商品輸入優惠碼 : <span class="text-danger">{{item.code}}</span>即可享有活動折扣優惠!!</marquee>
                        </td>
                     </tr>

                     <tr class="marquee">
                        <th class="align-middle" width="120">
                           即日起到~
                           <span class="text-danger">2021/10/31</span>
                        </th>
                        <td class="align-middle">
                           <marquee class="align-middle">『<span class="text-minor pr-0">國慶</span>』活動開跑~活動期間購買商品輸入優惠碼 : <span class="text-danger">ten</span>即可享有活動折扣優惠!!</marquee>
                        </td>
                     </tr>
                     <tr class="marquee">
                        <th class="align-middle" width="120">
                           即日起到~
                           <span class="text-danger">2021/06/30</span>
                        </th>
                        <td class="align-middle">
                           <marquee class="align-middle">『<span class="text-minor pr-0">端午節</span>』活動開跑~活動期間購買商品輸入優惠碼 : <span class="text-danger">test</span>即可享有活動折扣優惠!!</marquee>
                        </td>
                     </tr>
                     <tr class="marquee">
                        <th class="align-middle" width="120">
                           即日起到~
                           <span class="text-danger">2021/09/30</span>
                        </th>
                        <td class="align-middle">
                           <marquee class="align-middle">『<span class="text-minor pr-0">中秋節優惠</span>』活動開跑~活動期間購買商品輸入優惠碼 : <span class="text-danger">moon</span>即可享有活動折扣優惠!!</marquee>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>

            <!-- //商品專區 -->
            <div class="col-12 col-md-5">

               <div class="row h-100">
                  <div class="col-12 col-sm-6 img_Setting parlorImg imgWall">
                     <router-link class="nav-link font-weight-bold d-flex align-items-center justify-content-center imgWall-hover" :to="`/productlist/客廳`">客廳區
                     </router-link>
                  </div>
                  <div class="col-12 col-sm-6 img_Setting beddingImg imgWall">
                     <router-link class="nav-link font-weight-bold d-flex align-items-center justify-content-center imgWall-hover" :to="`/productlist/寢具`">寢具區
                     </router-link>
                  </div>
                  <div class="col-12 col-sm-6 img_Setting officeImg imgWall">
                     <router-link class="nav-link font-weight-bold d-flex align-items-center justify-content-center imgWall-hover" :to="`/productlist/書房`">書房區
                     </router-link>
                  </div>
                  <div class="col-12 col-sm-6 img_Setting bathroomImg imgWall">
                     <router-link class="nav-link font-weight-bold d-flex align-items-center justify-content-center imgWall-hover" :to="`/productlist/浴廁`">浴廁區
                     </router-link>
                  </div>
               </div>

            </div>

         </div>
      </div>
      

      <div class="container my-5">
         <p class="h3 text-left">熱銷商品</p>

         <div class="swiper_shell mx-auto">
            <!-- 
               .swiper-button 需要從 <swiper> 拉出來，另外自訂 .swiper_shell 容器，才能調整左右按鈕的位置
            -->
            <div class="swiper-button-prev" slot="button-prev"></div>
            <swiper ref="mySwiper" class="swiper" :options="swiperOption">
               <swiper-slide v-for="(item, index) in products" :key="index">
                  <a class="card shadow-sm card-round">
                     <div class="card-cover" >
                        <div :style="{backgroundImage :`url(${item.imageUrl})`}" class="card-img"></div>
                     </div>
                     <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                           <div class="h5 card-title mb-0">{{item.title}}</div>
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

                  </a>
               </swiper-slide>
               <!-- <div class="swiper-pagination" slot="pagination"></div> -->
            </swiper>
            <div class="swiper-button-next" slot="button-next"></div>
         </div>
      </div>
      
   </div>
</template>

<script>
import $ from 'jquery';
import { Carousel, Slide } from 'vue-carousel';

import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

export default {
   name: 'swiper-example-loop-group',
   title: 'Loop mode with multiple slides per group',
   data(){
      return{
         isLoading: false,
         products: [],
         coupons: [],

         someLocalProperty: [], // Vue-Carousel Data
         slideContent: [
            // 自訂 slide v-for Data
            {
               imgUrl: 'https://tinyurl.com/y64kostp',
               title: ''
            },
            {
               imgUrl: 'https://tinyurl.com/y6756s2z',
               title: ''
            },
            {
               imgUrl: 'https://tinyurl.com/y4wfk5cg',
               title: ''
            },
            {
               imgUrl: 'https://tinyurl.com/y6fjaoty',
               title: ''
            },
            {
               imgUrl: 'https://tinyurl.com/y6cct8fm',
               title: ''
            },
         ],

         swiperOption: {
            spaceBetween: 30,
            slidesPerGroup: 3,

            //loop: true,
            //loopedSlides: 20,
            loopFillGroupWithBlank: true,
            pagination: {
               el: '.swiper-pagination',
               clickable: true
            },
            autoplay: {
               delay: 3000,

               // 手動切换之後繼續自動輪播
               disableOnInteraction: false,
            },

            //在滑動容器上可見的幻燈片數量(此為預設中斷點)
            slidesPerView: 1,

            breakpoints: {
               576: {
                  slidesPerView: 2
               },
               768: {
                  slidesPerView: 3
               },
               992: {
                  slidesPerView: 4
               }
            },
            navigation: {
               nextEl: '.swiper-button-next',
               prevEl: '.swiper-button-prev'
            }
         }
      }
   },

   methods: {
      getProducts() {
         const vm = this;
         const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/products/all`;
         vm.isLoading = true;
         // 注意：使用 get 
         this.$http.get(api).then(response => {
            console.log('getProducts',response.data.products);
            vm.products = response.data.products;
            vm.isLoading = false;
         });
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
               this.$bus.$emit('message:push', res.data.message, 'success');
            }
            vm.isLoading = false;
         });
      },

      /*getCoupon(page = 1) {
         const vm = this;
         const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/coupons?page=${page}`;
         vm.isLoading = true;
         this.$http.get(api).then(response => {
            vm.isLoading = false;
            vm.coupons = response.data.coupons;
            console.log('getCoupon',response.data.coupons);
         });
      },*/
   },

   components: {
      Carousel,
      Slide,

      swiper,
      swiperSlide
   },
   computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper;
      },
   },

   created() {
      const vm = this;
      vm.getProducts();
      //vm.getCoupon();
   },
   
}
</script>

<style lang="scss" scoped>
   
</style>