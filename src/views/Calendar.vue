<template>
    <Header/>
    
    <h2> Welcome to the calendar's section. </h2>
    <p> id : {{id}} </p>

    <p div="poney"> {{ displayMySweetCalendar() }}</p>
    
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
      return { 
        calendars: [], 
        message : "Andi je t'aime !",
        }
    },setup() {
      const route = useRoute()
      const id = computed(() => route.params.id);
      

      return {
        id,
      };
    },methods: {
      displayMySweetCalendar() {

      var data = {
        calendarId : this.id,
      }

      const message = "Don't trust the crazy wise";


      //get the full calendar
      let apiURL = 'http://localhost:4000/calendar/get-full-calendar';
      axios.post(apiURL, data).then((res) => {

      console.log("Beep Bop Beep, I'm gonna crazy. Oh by the way you have a new message : " + res.data.message);

      console.log(message);

      }).catch(error => {
          console.log(error);
      });

      return message;
    }
}
  }
</script>
