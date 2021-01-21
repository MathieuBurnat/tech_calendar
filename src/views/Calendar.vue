<template>
  <Header/>
    <h2> Welcome to the calendar's section. </h2>
    <p> id : {{id}} </p>

    <select v-model="selectedOption">
      <option disabled value="">Choisissez</option>
      <option v-for="calendar in calendars" :key="calendar.id">{{calendar.name}}</option>
    </select>
</template>

<script>
  import Header from './Header.vue'
  import axios from "axios";
  import { computed } from "vue";
  import { useRoute } from "vue-router";

  export default {
    components: {
      Header
    },
    data() {
      return { calendars: [], selectedOption : ""}
    },
    mounted(){
      let apiURL = 'http://localhost:4000/calendar/';
      axios.get(apiURL).then((res) => {
      this.calendars = res.data;
      }).catch(error => {
          console.log(error);
      });
    },setup() {
      const route = useRoute()
      const id = computed(() => route.params.id);
      return {
        id,
      };
    }
  }
</script>
