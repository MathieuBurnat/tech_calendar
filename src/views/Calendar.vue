<template>
    <Header/>
    
    <div v-if="calendar.length == 0"> <!-- If there isn't calendars. -->
      <h2> Chargement du calendrier... </h2>
      <p> {{ displayMySweetCalendar() }}</p>
    </div>
    <div v-else> 
      <h1>- [ * * * {{ calendar.name }} * * * ] - </h1>

      <!-- Display-->
      <div v-for="year in calendar.yearsList" :key="year.id">- trimesters - {{ year.id }} </div>
    </div>

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

        //get the full calendar
        let apiURL = 'http://localhost:4000/calendar/get-full-calendar';
        axios.post(apiURL, data).then((res) => {

        console.log("Beep Bop Beep, I'm gonna crazy. Oh by the way you have a new message : " + res.data.message);

        this.calendar = res.data.holyCalendar;
        console.log(this.calendar);


        //tests section
        console.log("[" + this.calendar.name + "]");

        for (let i = 0; i < this.calendar.yearsList.length; i++)  //inside the yearsList, get trismters
        { 
          console.log(i + "> my starting date : " + this.calendar.yearsList[i].startingDate);

          for (let i2 = 0; i2 < this.calendar.yearsList[i].trimestersList.length; i2++)
          {  
            console.log(i+ "." + i2 + "> Trimester's name : " + this.calendar.yearsList[i].trimestersList[i2].name);

            for (let i3 = 0; i3 < this.calendar.yearsList[i].trimestersList[i2].weeksList.length; i3++)
            {  
              console.log(i+ "." + i2 + "." + i3 + "> week's name : " + this.calendar.yearsList[i].trimestersList[i2].weeksList[i3].name);
            }
          }

        }

        //




        }).catch(error => {
            console.log(error);
        });

        }
    }
  }
</script>
