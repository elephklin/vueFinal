<template>
   <div>
      <nav aria-label="Page navigation example">
         <ul class="pagination justify-content-center mb-5">
            <li class="page-item" :class="{'disabled': !sendPage.has_pre}">
               <a class="page-link" href="#" aria-label="Previous" @click.prevent="switchPage(sendPage.current_page - 1)">
                  <span aria-hidden="true">&laquo;</span>
               </a>
            </li>

            <li class="page-item" v-for="page in sendPage.total_pages" :key="page" :class="{'active':sendPage.current_page === page}">
               <a class="page-link" href="#" @click.prevent="switchPage(page)">{{page}}</a>
            </li>
            
            <li class="page-item" :class="{'disabled': !sendPage.has_next}">
               <a class="page-link" href="#" aria-label="Next" @click.prevent="switchPage(sendPage.current_page + 1)">
                  <span aria-hidden="true">&raquo;</span>
               </a>
            </li>
         </ul>
      </nav>
   </div>
</template>

<script>
export default {
   props: {
      sendPage: {
         type: Object,
      }
   },
   data() {
      return {
         
      }
   },
   methods: {
      switchPage(p) {
         this.$emit('changePage',p);
      }
   },
}
</script>