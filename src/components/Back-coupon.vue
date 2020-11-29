<template>
   <div>
      <loading :active.sync="isLoading"></loading>
      <div class="text-right mt-4">
         <button class="btn btn-minor" @click.prevent="openCouponModal(true)">新增優惠券</button>
      </div>
      <div class="table-responsive mb-5">
         <table class="table table-hover mt-4">
            <thead>
               <tr class="">
                  <th class="text-center text-nowrap">名稱</th>
                  <th class="text-center text-nowrap">優惠碼</th>
                  <th class="text-center text-nowrap" width="80">折扣</th>
                  <th class="text-center text-nowrap" width="100">到期日</th>
                  <th class="text-center text-nowrap" width="120">是否啟用</th>
                  <th class="text-center text-nowrap" width="120">編輯</th>
               </tr>
            </thead>
            <tbody>
               <tr class="" v-for="(item) in coupons" :key="item.id">
                  <td class="text-center align-middle text-nowrap">{{item.title}}</td>
                  <td class="text-center align-middle text-nowrap">{{item.code}}</td>
                  <td class="text-center align-middle">{{item.percent}}%</td>
                  <td class="text-center align-middle">{{item.due_date | date}}</td>
                  <td v-if="item.is_enabled" class="text-center align-middle text-success">已啟用</td>
                  <td v-if="!item.is_enabled" class="text-center align-middle text-danger">未啟用</td>
                  <td class="text-center align-middle">
                     <button class="btn btn-sm btn-outline-primary" @click.prevent="openCouponModal(false, item)">編輯</button>
                     <button class="btn btn-sm btn-outline-danger" @click.prevent="removeCouponModal(item)">刪除</button>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>


      <!-- 優惠券 Modal -->
      <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog" role="document">
            <div class="modal-content border-0">
               <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">優惠券</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                  </button>
               </div>
               <div class="modal-body w-100">
                  <div class="form-group">
                     <label for="couponTitle">活動標題</label>
                     <input type="text" class="form-control" id="couponTitle" aria-describedby="emailHelp" placeholder="請輸入標題" v-model="tempCoupon.title">
                  </div>
                  <div class="form-group">
                     <label for="couponCode">優惠碼</label>
                     <input type="password" class="form-control" id="couponCode" placeholder="請輸入優惠碼" v-model="tempCoupon.code">
                  </div>

                  <div class="form-group">
                     <label for="percent">折扣比例</label>
                     <input type="number" class="form-control" id="percent" placeholder="請輸入折扣比例" v-model.number="tempCoupon.percent">
                  </div>

                  <div class="form-group">
                     <label for="due_date">到期日</label>
                     <input type="date" class="form-control" id="due_date" v-model="due_date" />
                  </div>

                  <div class="form-group form-check">
                     <input type="checkbox" class="form-check-input" id="exampleCheck1" :true-value="1" :false-value="0" v-model="tempCoupon.is_enabled">
                     <label class="form-check-label" for="exampleCheck1">是否啟用</label>
                  </div>
               </div>
               <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                  <button type="button" class="btn btn-primary" @click="updateCoupon">確認</button>
               </div>
            </div>
         </div>
      </div>

      <!-- 刪除優惠券 Modal -->
      <div class="modal fade" id="delCoupon" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog" role="document">
            <div class="modal-content border-0">
               <div class="modal-header bg-danger text-white">
                  <h5 class="modal-title" id="exampleModalLabel">
                     <span>刪除優惠活動</span>
                  </h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                  </button>
               </div>
               <div class="modal-body">
                  是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠活動(刪除後將無法恢復)。
               </div>
               <div class="modal-footer">
                  <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                  <button type="button" class="btn btn-danger"
                  @click="removeCouponModal">確認刪除</button>
               </div>
            </div>
         </div>
      </div>

   </div>
</template>

<script>
import $ from "jquery";

export default {
   data() {
      return {
         isLoading: false,
         isNew: false,
         coupons: [],
         tempCoupon: {},
         pagination: {},

         due_date: '',
      }
   },
   watch: {
      due_date() {
         const vm = this;
         const timestamp = Math.floor(new Date(vm.due_date) / 1000);
         vm.tempCoupon.due_date = timestamp;
      }
   },
   methods: {
      openCouponModal(isNew, item) {
         const vm = this;
         $("#couponModal").modal("show");
         // if(isNew) 代表新增時
         if(isNew) {
            this.isNew = true;
            this.tempCoupon = {};
         }
         else {
            this.isNew = false;
            this.tempCoupon = Object.assign({}, item);

            const dateAndTime = new Date(vm.tempCoupon.due_date * 1000)
            .toISOString()
            .split("T");
            vm.due_date = dateAndTime[0];
         }
      },

      removeCouponModal(item) {
         const vm = this;
         $('#delCoupon').modal('show');
         vm.tempCoupon = Object.assign({}, item);
      },

      updateCoupon() {
         let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/coupon`;
         let httpMethod = 'post';
         const vm = this;

         // 注意：此處 isNew 是由 openCouponModal 傳過來的值
         if(!vm.isNew) {
            api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/coupon/${vm.tempCoupon.id}`;
            httpMethod = 'put';
         }

         this.$http[httpMethod](api, {data: vm.tempCoupon}).then(response => {
            console.log('updateCoupon',response.data);
            if(response.data.success){
               $('#couponModal').modal('hide');
               vm.getCoupon();
            } else {
               $('#couponModal').modal('hide');
               vm.getCoupon();
               console.log("新增失敗");
            }
         });
      },

      getCoupon(page = 1) {
         const vm = this;
         const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/coupons?page=${page}`;
         vm.isLoading = true;
         // 注意：使用 get 
         this.$http.get(api).then(response => {
            //console.log('getCoupon',response.data.coupons);
            vm.isLoading = false;
            vm.coupons = response.data.coupons;
            vm.pagination = response.data.pagination;
            console.log('getCoupon',response.data.coupons);
         });
      },

      removeCoupon(id) {
         const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/coupon/${id}`;
         const vm = this;
         vm.isLoading = true;
         this.$http.delete(api).then(response => {
            $('#delCoupon').modal('hide');
            vm.getCoupon();
            vm.isLoading = false;
         });
      },
   },

   created() {
      const vm = this;
      vm.getCoupon();
   },
}
</script>