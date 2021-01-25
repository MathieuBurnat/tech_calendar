<template>
    <Header/>
    
    <div v-if="calendar.length == 0"> <!-- If there isn't calendars. -->
      <h2> Chargement du calendrier... </h2>
      <p> {{ displayMySweetCalendar() }}</p>
    </div>
    <div v-else> 
      <h1>- [ * * * {{ calendar.name }} * * * ] - </h1>
      <div class="row">
        <div class="column" v-for="(year, index) in calendar.yearsList" :key="year">
          <div class="year case"> {{ index + 1 }} année  </div>
          <div v-for="trimester in year.trimestersList" :key="trimester"> 
            <div class="week case" v-for="week in trimester.weeksList" :key="week"> week</div>
          </div>
        </div>
      </div>
      <h3> Actually, the calendar's render is still in working progrss. Check the console (via F12) if you want to see the console-calendar ! :'D </h3>
  </div>
</template>

<style>
  .case{
    border: 1px solid #ccc;
  }

  .blanckCase{
    padding: 9px 0;
  }

  .year{
    font-weight: bold;
  }

  .week{
    border: 1px solid #ccc;
  }

  .row {
    display: flex;
    flex-flow: row wrap;
    width: 60%;
    padding: 10px;
  }

  .column {
    flex: 1 1 50%;
  }
</style>

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
        calendar: []
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

        // --- Test section 
        console.log("[" + this.calendar.name + "]"); //The name of the calendar

        //Here is the logic to get calendar's datas
        for (let i = 0; i < this.calendar.yearsList.length; i++) //Inside years
        { 
          console.log("[" + i + "] --- Year ---");
          console.log(i + "> Starting date : " + this.calendar.yearsList[i].startingDate);
          
          for (let i2 = 0; i2 < this.calendar.yearsList[i].trimestersList.length; i2++) //Inside trimesters
          {  
            console.log(i+ "." + i2 + "> Trimester's name : " + this.calendar.yearsList[i].trimestersList[i2].name);

            for (let i3 = 0; i3 < this.calendar.yearsList[i].trimestersList[i2].weeksList.length; i3++) //inside weeds
            {  
              console.log(i+ "." + i2 + "." + i3 + "> week's name : " + this.calendar.yearsList[i].trimestersList[i2].weeksList[i3].name);
              /*
                console.log(i+ "." + i2 + "." + i3 + "> week's module : " + this.calendar.yearsList[i].trimestersList[i2].weeksList[i3].weekType);
                console.log(i+ "." + i2 + "." + i3 + "> week's type : " + this.calendar.yearsList[i].trimestersList[i2].weeksList[i3].module);
              */ // Will come later...
            }
          }
        }
        }).catch(error => {
            console.log(error);
        });
      }
    }
  }
</script>

