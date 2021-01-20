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
    <td>{{calendar.firstName}} {{calendar.lastName}}</td>
    <td>{{calendar.email}}</td>
    <td>{{calendar.role}}</td>
  </tr>
  <h1> - End - </h1>

  <input type="checkbox" id="vehicle2" name="vehicle2" value="Car">
  <label for="vehicle2"> Keep this calendar as default </label><br>
  <input type="submit" value="Go">
  <br/> ...ou créer un nouveau <router-link class="active" to="/newcalendar">calendrier</router-link>.

</template>

<script>

  import Header from './Header.vue'
  //import axios from "axios";
  import { ref } from 'vue';

  export default {
    components: {
      Header
    }, 
    setup() {
        // make calendars variable reactive with the ref() function
        
        const calendars = ref([
            { firstName: 'Frank', lastName: 'Murphy', email: 'frank.murphy@test.com', role: 'calendar' },
            { firstName: 'Vic', lastName: 'Reynolds', email: 'vic.reynolds@test.com', role: 'Admin' },
            { firstName: 'Gina', lastName: 'Jabowski', email: 'gina.jabowski@test.com', role: 'Admin' },
            { firstName: 'Jessi', lastName: 'Glaser', email: 'jessi.glaser@test.com', role: 'calendar' },
            { firstName: 'Jay', lastName: 'Bilzerian', email: 'jay.bilzerian@test.com', role: 'calendar' }
        ]);

        return {
            calendars
        };
    }/*
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
    },*/
  }

</script>
