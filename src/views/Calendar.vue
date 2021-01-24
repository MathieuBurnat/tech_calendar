<template>
    <Header/>
    
    <h1>- [ * * * {{ calendar.name }} * * * ] - </h1>
    <p> id : {{id}} </p>

    <p> {{ displayMySweetCalendar() }}</p>
    <p> what's my name ? {{ calendar.name }}</p>
    <p> {{ message }}</p>
</template>

<script>
  import Header from './Header.vue'
  import axios from "axios";
  import { computed } from "vue";
  import { useRoute } from "vue-router";

  export default 
    {
    components: {
      Header
    },
    data() {
      return { 
        calendar: [], 
        message : "",
        }
    },setup() {
      const route = useRoute()
      const id = computed(() => route.params.id);
      return {
        id,
      };
    },
    methods: {
      displayMySweetCalendar() {
        var data = {
          calendarId : this.id,
        }

        var calendar = [];

        //get the full calendar
        let apiURL = 'http://localhost:4000/calendar/get-full-calendar';
        axios.post(apiURL, data).then((res) => {

        console.log("Beep Bop Beep, I'm gonna crazy. Oh by the way you have a new message : " + res.data.message);

        calendar = res.data.holyCalendar;
        console.log(calendar);


        //tests section
        this.message = "Hellow sweetie :3";
        this.calendar = calendar;

        console.log("my name is " + calendar.name);


        //




        }).catch(error => {
            console.log(error);
        });

        }
    }
  }
</script>
