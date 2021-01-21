<template>
  <Header/>
    <h2> Welcome to the calendar's section. </h2>
    <p> id : {{id}} </p>

    <div v-for="calendar in calendars" :key="calendar.id">
      <p> - {{calendar.name}} - </p>
    </div>
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
    },setup() {
      const route = useRoute()
      const id = computed(() => route.params.id);
      
      var poney = id.value.toString();
      console.log("my id " + poney);

      let apiURL = 'http://localhost:4000/calendar/get-full-calendar';
      axios.get(apiURL, poney).then((res) => {

      this.calendars = res.data;

      }).catch(error => {
          console.log(error);
      });

      return {
        id,
      };
    }
  }
</script>
