

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
      //I wanna try if we are able to verify the authenticity of the user
      var ui =  JSON.parse(localStorage.getItem("userInformations"));


      let authURL = 'http://localhost:4000/auth/verify-authenticity';
      axios.post(authURL, ui).then((res) => {
        
        console.log("Message :" + res.data.message); //return message

      }).catch(error => {
          console.log(error);
      });


      // create the calendar with the text box name
      let calendarURL = 'http://localhost:4000/calendar/create-calendar';
      axios.post(calendarURL, this.calendar).then((res) => {
        
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
