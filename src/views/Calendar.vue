<template>
  <Header/>
    <h2> Welcome to the calendar's section. </h2>
    <p> id : {{id}} </p>
</template>

<script>
  import Header from './Header.vue'
  import { computed } from "vue";
  import { useRoute } from "vue-router";

  export default {
    components: {
      Header
    },setup() {
      const route = useRoute()
      const id = computed(() => route.params.id);
      return {
        id,
      };
    }
  }
</script>
