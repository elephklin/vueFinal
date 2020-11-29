<template>
   <div>
      <loading :active.sync="isLoading"></loading>
      <header class="">
         <div class="navTop">
            <nav class="nav justify-content-between align-items-center container py-1">
               <div class="d-flex">
                  <a class="nav-link" href="#" @click.prevent="openLoginModal" v-if="!isLogin">登入</a>
                  <a class="nav-link" href="#" @click.prevent="logout" v-if="isLogin">登出</a>
                  <!-- 登入 Modal -->
                  <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                     <div class="modal-dialog" role="document">
                        <div class="modal-content">
                           <div class="modal-header mb-3">
                              <h5 class="modal-title mx-auto" id="exampleModalLabel">會員登入</h5>

                              <button type="button" class="close p-0 m-0" data-dismiss="modal" aria-label="Close">
                                 <span aria-hidden="true">&times;</span>
                              </button>
                           </div>
                           <div class="modal-body mx-auto">
                              <form class="" @submit.prevent="login">
                                 <div class="form-group user d-flex">
                                    <i class="fas fa-user user_icon"></i>
                                    <input type="email" v-model="user.username" class="form-control py-3 rounded-sm placeholder_site user_mail" id="" placeholder="帳號">
                                 </div>
                                 <div class="form-group key">
                                    <i class="fas fa-key key_icon"></i>
                                    <input type="password" v-model="user.password" class="form-control py-3 rounded-sm placeholder_site" id="" placeholder="密碼">
                                 </div>
                                    
                                 <button type="submit" class="btn btn-minor d-block w-100 border-0 rounded-sm mb-3">登入帳號</button>

                                 <div class="form-row">
                                    <div class="col form-group text-center">
                                       <a class="" href="#">忘記密碼</a>
                                    </div>
                                    <div class="col form-group text-center border-left border-primary">
                                       <a class="" href="#" data-dismiss="modal" data-toggle="modal" data-target="#registerModal">註冊會員</a>
                                    </div>
                                 </div>
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>

                  <a class="nav-link" href="#" @click.prevent="openRegisterModal" v-if="!isLogin">註冊</a>
                  <!-- 註冊 Modal -->
                  <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                     <div class="modal-dialog" role="document">
                        <div class="modal-content">
                           <div class="modal-header mb-3">
                              <h5 class="modal-title mx-auto" id="exampleModalLabel">會員註冊</h5>
                              <button type="button" class="close p-0 m-0" data-dismiss="modal" aria-label="Close">
                                 <span aria-hidden="true">&times;</span>
                              </button>
                           </div>
                           <div class="modal-body mx-auto">
                              <form class="" @submit.prevent="">
                                 <div class="form-group user d-flex">
                                    <i class="fas fa-user user_icon"></i>
                                    <input type="email" v-model="user.username" class="form-control py-3 rounded-sm placeholder_site user_mail" id="" placeholder="Email">
                                 </div>
                                 <div class="form-group key">
                                    <i class="fas fa-key key_icon"></i>
                                    <input type="password" v-model="user.password" class="form-control py-3 rounded-sm placeholder_site" id="" placeholder="密碼">
                                 </div>
                                    
                                 <button type="submit" class="btn btn-minor d-block w-100 border-0 rounded-sm mb-3">註冊帳號</button>

                                 <div class="form-group text-center">
                                    <span>已有會員？ </span>
                                    <a class="" href="#" data-dismiss="modal" data-toggle="modal" data-target="#loginModal">直接登入</a>
                                 </div>
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div class="d-flex">
                  <a class="nav-link active align-self-center" href="#" @click.prevent="memberCenter">
                     <i class="fas fa-user"></i>
                     會員中心
                  </a>
                  <div class="dropdown">
                     <button class="btn btn-lg dropdown-toggle cartButton" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="badge badge-pill badge-danger" v-if="cart.carts.length !== 0">{{cart.carts.length}}</span>
                     </button>
                     <div class="dropdown-menu dropdown-menu-right px-2 mt-2" aria-labelledby="dropdownMenuButton">
                        <div v-if="cart.final_total !== 0">
                           <p class="h5 text-center">選購商品</p>
                           <table class="table">
                              <tbody>
                                 <tr v-for="item in cart.carts" :key="item.id">
                                    <td class="align-middle text-center">
                                       <button class="btn btn-outline-danger btn-sm" @click="removeCart(item.id)">
                                          <i class="far fa-trash-alt "></i>
                                       </button>
                                    </td>
                                    <td class="align-middle text-center">{{item.product.title}}</td>
                                    <td class="align-middle text-center">{{item.qty}}/{{item.product.unit}}</td>
                                    <td class="align-middle text-right" v-if="item.product.price">{{item.total |currency}}</td>
                                 </tr>
                                 <tr>
                                    <td colspan="3" class="text-right">總計</td>
                                    <td class="text-right">{{cart.total |currency}}</td>
                                 </tr>
                              </tbody>
                           </table>
                           <router-link href="#" class="btn btn-minor btn-block" to="/cart">
                              結帳去
                           </router-link>
                        </div>
                        <div v-else class="py-2">
                           <p class="h2 text-center">尚未選購商品</p>
                           <router-link href="#" class="btn btn-minor btn-block" to="/productlist/all">
                              來去逛逛
                           </router-link>
                        </div>
                     </div>
                  </div>
               </div>
            </nav>
         </div>

         <nav class="navbar navbar-expand-lg container">
            <router-link class="navbar-brand nav_logo" to="/">LOGO</router-link>
            <button class="navbar-toggler p-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <!-- <span class="navbar-toggler-icon"></span> -->
               <i class="navbar-toggler-icon mt-2 fas fa-bars"></i>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
               <ul class="navbar-nav flex-fill justify-content-around">
                  <li class="nav-item mx-3">
                     <router-link class="nav-link font-weight-bold" :to="`/productlist/客廳`">客廳</router-link>
                  </li>
                  <li class="nav-item mx-3">
                     <router-link class="nav-link font-weight-bold" :to="`/productlist/浴廁`">浴廁</router-link>
                  </li>
                  <li class="nav-item mx-3">
                     <router-link class="nav-link font-weight-bold" :to="`/productlist/書房`">書房</router-link>
                  </li>
                  <li class="nav-item mx-3">
                     <router-link class="nav-link font-weight-bold" :to="`/productlist/寢具`">寢具</router-link>
                  </li>
                  <li class="nav-item mx-3">
                     <router-link class="nav-link font-weight-bold" :to="`/productlist/廚房`">廚房</router-link>
                  </li>
               </ul>
               <!--  v-model="searchText" v-on:keyup.enter="sendSearch" -->
               <!-- <form class="form-inline my-2 my-lg-0 searchBar ml-auto">
                  <input type="text" class="form-control rounded-0 border-0" placeholder="搜尋">
                  <div class="input-group-append searchBar_icon">
                     <i class="fas fa-search"></i>
                  </div>
               </form> -->
            </div>
         </nav>

      </header>
   </div>
</template>

<script>
import $ from 'jquery';

export default {
   name: '',
   data(){
      return{
         isLoading: false,
         isLogin: false,
         user: {
            "username": "",
            "password": ""
         },
         cart: {
            carts: {}
         },
      }
   },
   methods: {
      openLoginModal() {
         $('#loginModal').modal('show');
      },
      openRegisterModal() {
         $('#registerModal').modal('show');
      },
      login() {
         // cookie 儲存
         const api = `${process.env.VUE_APP_API}/admin/signin`;
         const vm = this;
         vm.isLoading = true;
         this.$http.post(api, vm.user).then(response => {
            if(response.data.success) {
               console.log('login',response.data);
               $('#loginModal').modal('hide');
               
               // 注意 isLogin 狀態
               vm.isLogin = true;
               vm.isLoading = false;
            } else {
               console.log('請重新登入');
               vm.isLoading = false;
               
               vm.$bus.$emit('messsage:push', response.data.message, 'danger');
            }
         });
      },
      logout() {
         const vm = this;
         const api = `${process.env.VUE_APP_API}/logout`;
         vm.isLoading = true;
         this.$http.post(api).then(response => {
            if(response.data.success) {
               console.log(response.data);
               vm.isLogin = !this.isLogin;
               vm.$router.push('/');
               vm.isLoading = false;
            }
         });
      },

      checklogin() {
         const vm = this;
         const api = `${process.env.VUE_APP_API}/api/user/check`;
         this.$http.post(api).then(response => {
            if(response.data.success === true) {
               vm.isLogin = true;
            } else {
               vm.isLogin = false;
            }
         });
      },

      memberCenter() {
         const vm = this;
         if(vm.isLogin === true) {
            vm.$router.push('/admin');
         }
         else {
            $('#loginModal').modal('show');
         }
      },

      getCart() {
         const vm = this;
         const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart`;
         vm.$http.get(api).then(res => {
            if (res.data.success) {
               vm.cart = res.data.data;
               console.log('getCart',vm.cart);
            }
         });
      },

      removeCart(id) {
         const vm = this;
         const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart/${id}`;
         vm.isLoading = true;
         vm.$http.delete(api).then((res) => {
            //console.log('removeCart',res.data);
            vm.$bus.$emit("upDateCart");
            vm.getCart();
            vm.isLoading = false;
         });
      },
   },

   created() {
      const vm = this;
      vm.checklogin();
      vm.getCart();
      vm.$bus.$on('upDateCart', ()=>{
         vm.getCart();
      })
   },

   beforeDestroy: function() {
      this.$bus.$off();
   },

   components: {
      
   },
   computed: {
      
   },
};
</script>

<style lang="scss">

</style>