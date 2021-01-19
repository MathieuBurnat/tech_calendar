

<template>
  <Header/>
    <h2> Nouveau calendrier </h2>

    <form @submit.prevent="createCalendar">
            <label>Calendrier</label>
            <input type="text" class="form-control" v-model="calendar.name" required>

            <br/><button class="btn btn-danger btn-block">Créer</button>
    </form>
  <!--Footer/-->
</template>


<script>
import Header from './Header.vue'
import axios from "axios";

export default {
  components: {
    Header
  },
  data() {
    return {
        calendar: {
            name: '',
        },
    }
  },
  methods:{
    createCalendar(){
      
      // create the calendar with the text box name
      let apiURL = 'http://localhost:4000/calendar/create-calendar';
      axios.post(apiURL, this.calendar).then((res) => {
        
        console.log(res.data.message); //return message

        this.calendar = {
          name: '',
        }
      }).catch(error => {
          console.log(error);
      });
      },
    },
}
</script>
