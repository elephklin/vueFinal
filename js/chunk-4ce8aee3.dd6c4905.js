(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4ce8aee3"],{"96fc":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("loading",{attrs:{active:t.isLoading},on:{"update:active":function(a){t.isLoading=a}}}),e("div",{staticClass:"container mt-5"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-3"},[e("ul",{staticClass:"list-category"},[e("li",{class:{active:"all"===t.category},on:{click:function(a){return a.preventDefault(),t.changeCategory("all")}}},[e("router-link",{staticClass:"h5",attrs:{to:"/productlist/all"}},[t._v("全部商品")])],1),t._l(t.filterCategory,(function(a,s){return e("li",{key:s,class:{active:t.category===a},on:{click:function(e){return e.preventDefault(),t.changeCategory(a)}}},[e("router-link",{staticClass:"h5",attrs:{to:"/productlist/"+a}},[t._v(t._s(a))])],1)}))],2)]),e("div",{staticClass:"col-md-9"},[e("div",{staticClass:"row"},t._l(t.filterProducts,(function(a){return e("div",{key:a.id,staticClass:"col-md-6 col-lg-4 mb-4"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-cover"},[e("div",{staticClass:"card-img",style:{backgroundImage:"url("+a.imageUrl+")"}})]),e("div",{staticClass:"card-body"},[e("div",{staticClass:"d-flex justify-content-between align-items-center"},[e("div",{staticClass:"h4 card-title mb-0"},[t._v(t._s(a.title))]),e("span",{staticClass:"badge badge-minor"},[t._v(t._s(a.category))])]),e("div",{staticClass:"d-flex justify-content-between align-items-baseline mt-2"},[e("div",{staticClass:"h5 text-danger"},[t._v(t._s(t._f("currency")(a.price)))]),e("del",{staticClass:"h6 text-secondary"},[t._v(t._s(t._f("currency")(a.origin_price)))])])]),e("div",{staticClass:"card-footer"},[e("div",{staticClass:"d-flex justify-content-between align-items-baseline"},[e("router-link",{staticClass:"btn btn-sm btn-other",attrs:{to:"/product/"+a.id}},[t._v("查看更多")]),e("a",{staticClass:"btn btn-sm btn-other",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.addCart(a.id)}}},[t._v("購物車")])],1)])])])})),0)])])])],1)},i=[],c=(e("99af"),e("4de4"),e("4160"),e("c975"),e("159b"),e("1157"),{data:function(){return{products:[],isLoading:!1,category:"all",categoryItem:[]}},components:{},methods:{getProducts:function(){var t=this,a="".concat("https://vue-course-api.hexschool.io","/api/").concat("elephklin","/products/all");t.isLoading=!0,this.$http.get(a).then((function(a){t.products=a.data.products,t.isLoading=!1}))},changeCategory:function(t){var a=this;a.category=t},addCart:function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,e=this,s={product_id:t,qty:a};e.isLoading=!0;var i="".concat("https://vue-course-api.hexschool.io","/api/").concat("elephklin","/cart");this.$http.post(i,{data:s}).then((function(t){t.data.success&&(e.$bus.$emit("upDateCart"),e.$bus.$emit("messsage:push",t.data.message,"success")),e.isLoading=!1}))}},computed:{filterCategory:function(){var t=this;return t.products.forEach((function(a){t.categoryItem.push(a.category)})),t.categoryItem.filter((function(t,a,e){return e.indexOf(t)===a}))},filterProducts:function(){var t=this,a=t.$route.params.category;return t.category=a,"all"===a?t.products:t.products.filter((function(t){return t.category===a}))}},created:function(){var t=this;t.getProducts()}}),n=c,r=e("2877"),o=Object(r["a"])(n,s,i,!1,null,null,null);a["default"]=o.exports},c975:function(t,a,e){"use strict";var s=e("23e7"),i=e("4d64").indexOf,c=e("a640"),n=e("ae40"),r=[].indexOf,o=!!r&&1/[1].indexOf(1,-0)<0,l=c("indexOf"),d=n("indexOf",{ACCESSORS:!0,1:0});s({target:"Array",proto:!0,forced:o||!l||!d},{indexOf:function(t){return o?r.apply(this,arguments)||0:i(this,t,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-4ce8aee3.dd6c4905.js.map