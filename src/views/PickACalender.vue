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

  <h1> - Test - </h1>
  <tr v-for="calendar in calendars" :key="calendar.id">
    <td>{{calendar.name}}</td>
    <td>{{calendar.author}}</td>
  </tr>
  <h1> - End - </h1>

  <input type="checkbox" id="vehicle2" name="vehicle2" value="Car">
  <label for="vehicle2"> Keep this calendar as default </label><br>
  <input type="submit" value="Go">
  <br/> ...ou créer un nouveau <router-link class="active" to="/newcalendar">calendrier</router-link>.

</template>

<script>

  import Header from './Header.vue'
  import axios from "axios";
  import { ref } from 'vue';

  export default {
    components: {
      Header
    },
    data() {
      return { calendars}
    },
    setup(){
      let apiURL = 'http://localhost:4000/calendar/';
      axios.get(apiURL).then((res) => {
      
      console.log(JSON.stringify(res.data));


      //this.calendars = ref([res.data]);
      this.calendars = ref([
        {"_id":"6008333a85179c0f042ef332","name":"My-Tech-calendar","__v":0},
        {"_id":"600836e085179c0f042ef333","name":"chocoMelly","__v":0}
      ]);

      
      }).catch(error => {
          console.log(error);
      });
    },
  }

</script>
