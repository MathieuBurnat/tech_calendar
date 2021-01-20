<template>
  <Header/>
  <h1> Pick a calendar ! </h1>

  <label for="calendar-choice">calendars:</label>
  <input type="text" v-model="calendar" list="calendars">
  <datalist id="calendars">
    <option v-for="calendar in calendars" :key="calendar.id">{{calendar.name}}</option>
  </datalist>

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
    data() {
      return { calendars: []}
    },
    mounted(){
      let apiURL = 'http://localhost:4000/calendar/';
      axios.get(apiURL).then((res) => {
      this.calendars = res.data;
      }).catch(error => {
          console.log(error);
      });
    },
  }

</script>
