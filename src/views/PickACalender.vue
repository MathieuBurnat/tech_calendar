<template>
  <Header/>
  <h1> Pick a calendar ! </h1>

  <form @submit.prevent="goToCalendar">


    <div v-if="!calendars.length"> <!-- If there isn't calendars. -->
      <p> Aucun calendrier n'existe pour le moment. </p>
      Créer en un nouveau <router-link class="active" to="/newcalendar">ici</router-link> !
    </div>
    <div v-else> 
      <label for="calendar-choice">calendars:</label>
      <input type="text" v-model="calendarSelected" list="calendars">
      <datalist id="calendars">
        <option v-for="calendar in calendars" :key="calendar.id">{{calendar.name}}</option>
      </datalist>

      <div>
        <input
            type="checkbox"
            v-model="calendarSelected.shouldBeDefault"
            :value="1"
            name="pets"
          />
        <label>Keep this calendar as default</label>
      </div>

      <input type="submit" value="Go">
      <br/> ...ou créer un nouveau <router-link class="active" to="/newcalendar">calendrier</router-link>.
    </div>
  </form>
</template>

<script>

  import Header from './Header.vue'
  import axios from "axios";

  export default {
    components: {
      Header
    },
    data() {
      return { calendars: [], calendarSelected: []}
    },
    mounted(){
      let apiURL = 'http://localhost:4000/calendar/';
      axios.get(apiURL).then((res) => {
      this.calendars = res.data;
      }).catch(error => {
          console.log(error);
      });
    },
    methods:{
      goToCalendar(){
        var isChecked = this.calendarSelected.shouldBeDefault;
        var category = this.calendarSelected.key;
        console.log("IsChecked : " + isChecked);
        console.log("catogry : " + category);
      }
    }
  }

</script>
