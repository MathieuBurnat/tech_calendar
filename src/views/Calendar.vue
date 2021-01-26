<template>
    <Header/>

    <!-- Dev buttons-->
    <div class="right">
      <h2> Dev Tools (create for Mr. Mottier). </h2>
        <router-link class="active" to="/editcase">Edit-Case</router-link> | <router-link class="active" to="/edittype">Edit-Type</router-link>
    </div>

    <div class="container">
      <div v-if="id==-1">
        <h2> Vous être à présent dans l'onglet "mon calendrier " #{{id}} </h2> <!-- If the id equals to -1, we want get de default calendar of th user -->
        <!-- {{ displayMySweetCalendar(true)}} -->
      </div>

      <div v-if="calendar.length == 0"> <!-- If there isn't calendars. -->
        <h2> Chargement du calendrier... </h2>
        <p> {{ displayMySweetCalendar(false) }}</p>
      </div>
      <div v-else> 
        <h1>- [ * * * {{ calendar.name }} * * * ] - </h1>
        <div class="row">
          <div class="column" v-for="(year, index) in calendar.yearsList" :key="year">
            <div v-if="(index + 1) == 1" class="year case">  {{ index + 1 }} ère </div> <!-- Une french, we use "ère" to speak about the first year -->
            <div v-if="(index + 1) != 1" class="year case"> {{ index + 1 }} ème </div>  <!-- It's an exception because to the next years, we use the setence "ème" -->

            <div v-for="trimester in year.trimestersList" :key="trimester"> 
              <div @click="toggleIsClicked" class="week case" :id="week.id" v-for="week in trimester.weeksList" :key="week"> {{week.content}} </div>
              <div class="case trimester"></div>
            </div>
          </div>
        </div>
    </div>
  </div>

  <!--div @click="toggleIsClicked" :id="injectionID_Test" > Hi, this is a test >:c </div-->
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

  .trimester{
    background-color: pink;
    padding: 2px;
  }

  .week{

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

  .test{
    background-color: cyan;
  }

  .right{
    float: right;
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
        calendar: [],
        injectionID_Test : "Pawned"
        }
    },setup() {
      const route = useRoute()
      const id = computed(() => route.params.id);
      return {
        id,
      };
    },
    methods: {
      displayMySweetCalendar(isDefaultCalendar) {
        var data = {
          calendarId : this.id,
          }

        //if isDefaultCalendar equals true, it's because the user want to display its default calendar !!
        //Get its calendar and continue de proced.
        if(isDefaultCalendar){
          this.id = 0;

          var ui =  JSON.parse(localStorage.getItem("userInformations"));

          var newData = {};
          var user_id = ui.user;
          console.log("ui id : " + user_id);

          newData = { 
          name : "Mathieu", 
          userId : user_id 
          };

          console.log(newData);

          let apiURL = 'http://localhost:4000/user//get-fdci';
          axios.post(apiURL, newData).then((res) => {
            console.log("New default calendar's id : " + res.data.defaultCalendar);
            data = {
            calendarId : res.data.defaultCalendar,
            }
          }).catch(error => {
              console.log(error);
          });
        }else{
          data = {
          calendarId : this.id,
          }
        }

        //get the full calendar
        let apiURL = 'http://localhost:4000/calendar/get-full-calendar';
        axios.post(apiURL, data).then((res) => {

        //console.log("Beep Bop Beep, I'm gonna crazy. Oh by the way you have a new message : " + res.data.message);

        this.calendar = res.data.holyCalendar;
        //console.log(this.calendar);

        // --- Test section 
        //console.log("[" + this.calendar.name + "]"); //The name of the calendar

        //Here is the logic to get calendar's datas
        /*
        for (let i = 0; i < this.calendar.yearsList.length; i++) //Inside years
        { 
          console.log("[" + i + "] --- Year ---");
          console.log(i + "> Starting date : " + this.calendar.yearsList[i].startingDate);
          
          for (let i2 = 0; i2 < this.calendar.yearsList[i].trimestersList.length; i2++) //Inside trimesters
          {  
            console.log(i+ "." + i2 + "> Trimester's name : " + this.calendar.yearsList[i].trimestersList[i2].name);

            for (let i3 = 0; i3 < this.calendar.yearsList[i].trimestersList[i2].weeksList.length; i3++) //inside weeks
            {  
              console.log(i+ "." + i2 + "." + i3 + "> week's content : " + this.calendar.yearsList[i].trimestersList[i2].weeksList[i3].content);
              console.log(i+ "." + i2 + "." + i3 + "> week : type's name : " + this.calendar.yearsList[i].trimestersList[i2].weeksList[i3].weekType.name);
              console.log(i+ "." + i2 + "." + i3 + "> week : type's color : " + this.calendar.yearsList[i].trimestersList[i2].weeksList[i3].weekType.color);
              console.log(i+ "." + i2 + "." + i3 + "> week's module : " + this.calendar.yearsList[i].trimestersList[i2].weeksList[i3].module.name);
            }
          }
        }*/

        }).catch(error => {
            console.log(error);
        });
      },toggleIsClicked : function(event) {
        console.log(event);
        console.log("content : " + event.toElement.outerText);
        console.log("id : " + event.toElement.id);

        //Datas injection  test
        //Change data -> event.toElement.outerText = "poney";
        //Set text-color -> document.getElementById(event.toElement.id).style.backgroundcolor="pink";
        //document.getElementById(event.toElement.id).classList.add("test")
      }
    }
  }
</script>

