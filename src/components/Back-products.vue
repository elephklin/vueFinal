<template>
   <div>
      <!-- 載入效果 -->
      <loading :active.sync="isLoading"></loading>

      <div class="text-right my-4">
         <button class="btn btn-minor" @click="openModal(true)">建立新的產品</button>
      </div>
      <table class="table table-hover mb-5 backProducts_table">
         <thead>
            <tr class="">
               <th class="text-center" width="">分類</th>
               <th class="text-center">產品名稱</th>
               <th class="text-center" width="">原價</th>
               <th class="text-center" width="">售價</th>
               <th class="text-center RWD_view" width="100">是否啟用</th>
               <th class="text-center" width="120">操作</th>
            </tr>
         </thead>
         <tbody>
            <tr class="" v-for="(item) in products" :key="item.id">
               <td class="text-center">{{ item.category }}</td>
               <td class="text-center">{{ item.title }}</td>
               <td class="text-right">
                  {{ item.origin_price | currency }}
               </td>
               <td class="text-right">
                  {{ item.price | currency }}
               </td>
               <td class="text-center RWD_view">
                  <span v-if="item.is_enabled" class="text-success">啟用</span>
                  <span v-else>未啟用</span>
               </td>
               <td class="text-center">
                  <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
                  <button class="btn btn-outline-danger btn-sm" @click="openDelProductModal(item)">刪除</button>
               </td>
            </tr>
         </tbody>
      </table>

      <!-- 組件寫法 -->
      <page-tool :sendPage="pagination" @changePage="getProducts"></page-tool>

      <!-- <nav aria-label="Page navigation example">
         <ul class="pagination">
            <li class="page-item" :class="{'disabled': !pagination.has_pre}">
               <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProducts(pagination.current_page - 1)">
                  <span aria-hidden="true">&laquo;</span>
               </a>
            </li>

            <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{'active':pagination.current_page === page}">
               <a class="page-link" href="#" @click.prevent="getProducts(page)">{{page}}</a>
            </li>
            
            <li class="page-item" :class="{'disabled': !pagination.has_next}">
               <a class="page-link" href="#" aria-label="Next" @click.prevent="getProducts(pagination.current_page + 1)">
                  <span aria-hidden="true">&raquo;</span>
               </a>
            </li>
         </ul>
      </nav> -->

      <!-- 建立新產品 Modal -->
      <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content border-0">
               <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                     <span>新增產品</span>
                  </h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">x</span>
                  </button>
               </div>
               <div class="modal-body w-100">
                  <div class="row">
                     <div class="col-sm-4">
                        <div class="form-group">
                           <label for="image">輸入圖片網址</label>
                           <input type="text" class="form-control" id="image" v-model="tempProduct.imageUrl"
                           placeholder="請輸入圖片連結">
                        </div>
                        <div class="form-group">
                           <label for="customFile">或 上傳圖片
                              <i class="fas fa-spinner fa-spin" v-if="status"></i>
                           </label>
                           <input type="file" id="customFile" class="form-control"
                           ref="files" @change="uploadFile">
                        </div>
                        <img class="img-fluid" :src="tempProduct.imageUrl">
                     </div>
                     <div class="col-sm-8">
                        <div class="form-group">
                           <label for="title">標題</label>
                           <input type="text" class="form-control" id="title"
                           v-model="tempProduct.title" placeholder="請輸入標題">
                        </div>

                        <div class="form-row">
                           <div class="form-group col-md-6">
                              <label for="category">分類</label>
                              <input type="text" class="form-control" id="category"
                                 v-model="tempProduct.category" placeholder="請輸入分類">
                           </div>
                           <div class="form-group col-md-6">
                              <label for="price">單位</label>
                              <input type="unit" class="form-control" id="unit" v-model="tempProduct.unit" placeholder="請輸入單位">
                           </div>
                        </div>

                        <div class="form-row">
                           <div class="form-group col-md-6">
                              <label for="origin_price">原價</label>
                              <input type="number" class="form-control" id="origin_price" v-model="tempProduct.origin_price" placeholder="請輸入原價">
                           </div>
                           <div class="form-group col-md-6">
                              <label for="price">售價</label>
                              <input type="number" class="form-control" id="price" v-model="tempProduct.price" placeholder="請輸入售價">
                           </div>
                        </div>
                        <hr>
                        <div class="form-group">
                           <label for="description">產品描述</label>
                           <textarea type="text" class="form-control" id="description" v-model="tempProduct.description" placeholder="請輸入產品描述"></textarea>
                        </div>
                        <div class="form-group">
                           <label for="content">說明內容</label>
                           <textarea type="text" class="form-control" id="content" v-model="tempProduct.content" placeholder="請輸入產品說明內容"></textarea>
                        </div>
                        <div class="form-group">
                           <div class="form-check">
                              <!-- 注意此處寫法 -->
                              <input class="form-check-input" type="checkbox"
                                 v-model="tempProduct.is_enabled" :true-value="1" :false-value="0" id="is_enabled">
                              <label class="form-check-label" for="is_enabled">
                                 是否啟用
                              </label>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="modal-footer">
                  <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                  <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
               </div>
            </div>
         </div>
      </div>

      <!-- 刪除產品 Modal -->
      <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog" role="document">
            <div class="modal-content border-0">
               <div class="modal-header bg-danger text-white">
                  <h5 class="modal-title" id="exampleModalLabel">
                     <span>刪除產品</span>
                  </h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                  </button>
               </div>
               <div class="modal-body">
                  是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
               </div>
               <div class="modal-footer">
                  <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                  <button type="button" class="btn btn-danger"
                  @click="delProduct">確認刪除</button>
               </div>
            </div>
         </div>
      </div>

   </div>
</template>

<script>
import $ from 'jquery';
import pageTool from './Pagination';

export default {
   data() {
      return {
         products: [], // 物件陣列
         // tempProduct 已綁定 modal 各欄位，透過 post 將新增的資料傳到後端
         tempProduct: {},
         pagination: {},
         isNew: false,
         isLoading: false,
         // 載入讀取效果
         status: false,
      }
   },
   components: {
      pageTool,
   },
   methods: {
      // page = 1  使用 ES6 參數預設值
      getProducts(page = 1) {
         const vm = this;
         const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/products?page=${page}`;
         vm.isLoading = true;
         // 注意：使用 get 
         this.$http.get(api).then(response => {
            //console.log('1',response.data.products);
            vm.isLoading = false;
            vm.products = response.data.products;
            vm.pagination = response.data.pagination;
         });
      },
      openModal(isNew, item) {
         $('#productModal').modal('show');

         // if(isNew) 代表新增時
         if(isNew) {
            this.tempProduct = {};
            this.isNew = true;
         } else {
            // 避免物件傳參考，使用 Object.assign() item 可以寫入一個空物件
            this.tempProduct = Object.assign({}, item);
            this.isNew = false;
         }
      },


      /*
         updateProduct() 函式傳送新增資料到後端出現："驗證錯誤, 請重新登入"

         1. [#main.js] 加入 axios.defaults.withCredentials = true;

         2. [#Header.vue] 調整登入 API  `${process.env.VUE_APP_API}/admin/signin`;

         3. 調整 Chrome cookie 設定

            * 教學網址方法二：https://paper.dropbox.com/doc/Vue-API-28OrjdvBouPMjspZUM7h7

            * 什麼是 SameSite？https://docs.microsoft.com/zh-tw/azure/active-directory/develop/howto-handle-samesite-cookie-changes-chrome-browser?tabs=dotnet
         
         4. 使用 chrome 無痕模式來測試
      */

      updateProduct() {
         let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/product`;
         let httpMethod = 'post';
         const vm = this;

         // 注意：此處 isNew 是由 openModal 傳過來的值
         if(!vm.isNew) {
            api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/product/${vm.tempProduct.id}`;
            httpMethod = 'put';
         }
         this.$http[httpMethod](api, {data: vm.tempProduct}).then(response => {
            console.log(response.data);
            if(response.data.success){
               $('#productModal').modal('hide');
               vm.getProducts();
            } else {
               $('#productModal').modal('hide');
               vm.getProducts();
               console.log("新增失敗");
            }
         });
      },

      openDelProductModal(item) {
         const vm = this;
         $('#delProductModal').modal('show');
         vm.tempProduct = Object.assign({}, item);
      },
      delProduct() {
         const vm = this;
         const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/product/${vm.tempProduct.id}`;

         this.$http.delete(url).then((response) => {
            console.log('delProduct', vm.tempProduct);
            $('#delProductModal').modal('hide');
            //vm.isLoading = false;
            this.getProducts();
         });
      },

      // formData 模擬傳統表單送出資料的形式，有別於一般使用 ajax 
      uploadFile() {
         console.log(this);
         const vm = this;
         const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/upload`;
         const uploadedFile = vm.$refs.files.files[0];
         const formData = new FormData();
         formData.append('file-to-upload', uploadedFile);

         vm.status = true;
         this.$http.post(url, formData, {
            headers: {
               'Content-Type': "multipart/form-data",
            }
         }).then((response) => {
            //console.log(response.data);
            vm.status = false;
            if(response.data.success) {
               // vm.tempProduct.imageUrl = response.data.imageUrl;
               vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
            } else {
               this.$bus.$emit('messsage:push', response.data.message, 'danger');
            }
         });
      }
   },
   created() {
      const vm = this;
      vm.getProducts();
   },
}
</script>