(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1e2d5824"],{"6b73":function(t,a,e){"use strict";var s=e("fdfa"),n=e.n(s);n.a},b789:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("loading",{attrs:{active:t.isLoading},on:{"update:active":function(a){t.isLoading=a}}}),e("div",{staticClass:"container my-5"},[e("div",{staticClass:"row justify-content-center"},[e("div",{staticClass:"col-md-10"},[t._m(0),e("table",{staticClass:"table table-hover my-5 cart_table"},[t._m(1),e("tbody",t._l(t.cart.carts,(function(a){return e("tr",{key:a.id},[e("td",{staticClass:"align-middle"},[e("div",{staticClass:"d-flex justify-content-start"},[e("div",{staticClass:"imgSize",style:"background-image:url('"+a.product.imageUrl+"');"}),e("div",{staticClass:"align-self-center ml-4"},[e("span",{},[t._v(t._s(a.product.title))]),a.coupon?e("div",{staticClass:"text-success"},[t._v("已套用優惠券")]):t._e()])])]),e("td",{staticClass:"align-middle text-right"},[t._v(t._s(t._f("currency")(a.product.price)))]),e("td",{staticClass:"align-middle"},[e("div",{staticClass:"d-flex justify-content-start text-center"},[e("select",{directives:[{name:"model",rawName:"v-model",value:a.qty,expression:"item.qty"}],staticClass:"form-control",attrs:{id:"cartNum"},on:{change:[function(e){var s=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var a="_value"in t?t._value:t.value;return a}));t.$set(a,"qty",e.target.multiple?s:s[0])},function(e){return t.changeCart(a.id,a.qty,a.product_id)}]}},t._l(20,(function(a){return e("option",{key:a,domProps:{value:a}},[t._v(t._s(a))])})),0),e("div",{staticClass:"align-self-center ml-3"},[t._v(t._s(a.product.unit))])])]),e("td",{staticClass:"align-middle text-right"},[e("span",{},[t._v(t._s(t._f("currency")(a.product.price*a.qty)))])]),e("td",{staticClass:"align-middle text-center"},[e("button",{staticClass:"btn btn-outline-danger btn-sm",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.removeCart(a.id)}}},[e("i",{staticClass:"far fa-trash-alt"})])])])})),0),e("tfoot",[t.cart.final_total===t.cart.total?e("tr",[e("td",{staticClass:"text-right",attrs:{colspan:"6"}},[t._v(" 合計： "),e("span",[t._v(t._s(t._f("currency")(t.cart.total)))])])]):t._e(),t.cart.final_total!==t.cart.total?e("tr",[e("td",{staticClass:"text-right text-secondary",attrs:{colspan:"6"}},[t._v(" 折扣前合計："),e("span",[t._v(t._s(t._f("currency")(t.cart.total)))])])]):t._e(),t.cart.final_total!==t.cart.total?e("tr",[e("td",{staticClass:"h5 text-right",attrs:{colspan:"6"}},[t._v(" 折扣後合計："),e("span",{staticClass:"h4 text-danger"},[t._v(t._s(t._f("currency")(t.cart.final_total)))])])]):t._e()])]),e("div",{staticClass:"input-group mb-3"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.coupons.code,expression:"coupons.code"}],staticClass:"form-control",attrs:{type:"text",placeholder:"請輸入優惠碼"},domProps:{value:t.coupons.code},on:{keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.useCoupon(a)},input:function(a){a.target.composing||t.$set(t.coupons,"code",a.target.value)}}}),e("div",{staticClass:"input-group-append"},[e("button",{staticClass:"btn btn-outline-minor",attrs:{type:"button"},on:{click:function(a){return a.preventDefault(),t.useCoupon(a)}}},[t._v("套用優惠碼")])])]),e("div",{staticClass:"d-flex justify-content-end mt-4"},[e("router-link",{staticClass:"btn btn-minor",attrs:{to:"/order"}},[t._v("下一步")])],1)])])])],1)},n=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row justify-content-around process_style"},[e("div",{staticClass:"col-md-3 p-2 rounded-pill process_now text-center"},[t._v("1.購物車內容")]),e("div",{staticClass:"col-md-3 p-2 rounded-pill process_undone text-center my-3 my-md-0"},[t._v("2.訂單填寫")]),e("div",{staticClass:"col-md-3 p-2 rounded-pill process_undone text-center"},[t._v("3.結帳")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",{},[e("tr",{},[e("th",{attrs:{width:"250"}},[t._v("商品資訊")]),e("th",{staticClass:"text-center",attrs:{width:"80"}},[t._v("單價")]),e("th",{staticClass:"text-center",attrs:{width:"80"}},[t._v("數量")]),e("th",{staticClass:"text-center",attrs:{width:"80"}},[t._v("小計")]),e("th",{staticClass:"text-center",attrs:{width:"60"}},[t._v("操作")])])])}],c=(e("99af"),e("1157"),{data:function(){return{isLoading:!1,quantity:1,cart:{carts:{}},coupons:{code:""}}},methods:{getCart:function(){var t=this,a="".concat("https://vue-course-api.hexschool.io","/api/").concat("elephklin","/cart");t.isLoading=!0,t.$http.get(a).then((function(a){a.data.success&&(t.cart=a.data.data,console.log("getCart",t.cart),t.isLoading=!1)}))},removeCart:function(t){var a=this,e="".concat("https://vue-course-api.hexschool.io","/api/").concat("elephklin","/cart/").concat(t);a.isLoading=!0,a.$http.delete(e).then((function(t){console.log("removeCart",t.data),a.$bus.$emit("upDateCart"),a.isLoading=!1,a.getCart()}))},useCoupon:function(){var t=this;t.isLoading=!0;var a="".concat("https://vue-course-api.hexschool.io","/api/").concat("elephklin","/coupon");t.$http.post(a,{data:t.coupons}).then((function(a){a.data.success?(t.getCart(),t.isLoading=!1):(t.coupons.code="",t.isLoading=!1)}))},changeCart:function(t,a,e){var s=this,n=this,c="".concat("https://vue-course-api.hexschool.io","/api/").concat("elephklin","/cart/").concat(t);n.isLoading=!0,this.$http.delete(c).then((function(t){var c={product_id:e,qty:a},i="".concat("https://vue-course-api.hexschool.io","/api/").concat("elephklin","/cart");s.$http.post(i,{data:c}).then((function(t){t.data.success&&(n.$bus.$emit("upDateCart"),n.getCart())})),n.isLoading=!1}))}},created:function(){var t=this;t.getCart()}}),i=c,o=(e("6b73"),e("2877")),r=Object(o["a"])(i,s,n,!1,null,"7a249341",null);a["default"]=r.exports},fdfa:function(t,a,e){}}]);
//# sourceMappingURL=chunk-1e2d5824.89194d35.js.map