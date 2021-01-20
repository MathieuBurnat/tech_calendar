<template>
  <Header/>
  <h1> Pick a calendar ! </h1>

  <label for="calendar-choice">calendars:</label>
  <input list="calendar-list" id="calendar-choice" name="calendar-choice" />

  <datalist id="calendar-list">
  <option value="Chocolate"></option>
  <option value="Coconut"></option>
  <option value="Mint"></option>
  <option value="Strawberry"></option>
  <option value="Vanilla"></option>
  </datalist>

  <p> hey i'm a test {{calendar}} </p>
  <tr v-for="(calendar, index) in calendars" :key="index">
    <td>{{calendar.name}}</td>
    <td>{{calendar.author}}</td>
  </tr>

  <input type="checkbox" id="vehicle2" name="vehicle2" value="Car">
  <label for="vehicle2"> Keep this calendar as default </label><br>
  <input type="submit" value="Go">
  <br/> ...ou créer un nouveau <router-link class="active" to="/newcalendar">calendrier</router-link>.

</template>

<script>

  import Header from './Header.vue'
  import axios from "axios";

  export default {
    components: {
      Header
    }, 
    setup(){
      let apiURL = 'http://localhost:4000/calendar/';
      axios.get(apiURL).then((res) => {
      
      console.log(JSON.stringify(res.data));


      const calendars = JSON.stringify(res.data);

        return {
            calendars
        };

      }).catch(error => {
          console.log(error);
      });
    },
  }

</script>
