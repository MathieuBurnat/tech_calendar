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
        {{ askToRenderCalendar()}} 
      </div>

      <div v-if="weeks.length == 0"> <!-- If there isn't weekss. -->
        <h2> Chargement du calendrier... </h2>
        <p> {{ displayMySweetCalendar(false) }}</p>
      </div>
      <div v-else> 
        <h1>- [ * * * {{ weeks[0].calendar.name }} * * * ] - </h1>
        <table>
          <tr v-for="(week, index) in weeks" :key="week">
            <td @click="toggleIsClicked" :id="index"> {{week.content}} </td>
          </tr>
        </table>
    </div>
  </div>
  <p class="error"> {{message}} </p>
</template>

<style>

  table {
    border-collapse: collapse;
    width: 40%;
    padding: 8px;
  }

  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  .title{
    font-weight: bold;
  }

  .trimester{
    background-color: pink;
    padding: 2px;
  }

  .test{
    background-color: #b9e2f57d;
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
        weeks: [],
        lastId : 0,
        message : ""
        }
    },setup() {
      const route = useRoute()
      const id = computed(() => route.params.id);
      return {
        id,
      };
    },
    methods: {
      askToRenderCalendar(){
        if(this.id != this.lastId){
          this.displayMySweetCalendar(true);
          this.lastId = this.id;
        }

      },
      displayMySweetCalendar(isDefaultCalendar) {
        var data = {
          calendarId : this.id,
          }

        console.log(isDefaultCalendar);

        //if isDefaultCalendar equals true, it's because the user want to display its default calendar !!
        //Get its calendar and continue de proced.
        if(this.id == -1){
          this.id = 0;


          var ui =  JSON.parse(localStorage.getItem("userInformations"));


          if(ui !== null){
            this.message = "";
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
            this.message = "[Dev error] You need to be connected to access this page.";
          }

        }else{
          data = {
          calendarId : this.id,
          }
        }

setTimeout(() => {
        //get the full calendar
        let apiURL = 'http://localhost:4000/calendar/get-full-calendar';
        axios.post(apiURL, data).then((res) => {

        console.log(res.data.message);

        this.weeks = res.data.weeks;
        console.log(res.data.weeks);

        }).catch(error => {
            console.log(error);
        });
        }, 
        100);

      },toggleIsClicked : function(event) {
        console.log(event);
        console.log("content : " + event.toElement.outerText);
        console.log("id : " + event.toElement.id);

        //document.getElementById(event.toElement.id).classList.add("test")
      }
    }
  }
</script>

