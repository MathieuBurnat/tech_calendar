

<template>
  <Header/>
  <div class="container">

    <h2> Nouveau calendrier </h2>

    <form @submit.prevent="createCalendar">
      <label for="name"><b>Nom</b></label>
      <input type="text" placeholder="Entrer le nom de votre calendrier"  class="form-control" v-model="calendarName" required>

      <button class="button">Créer</button>
    </form>
  </div>
  <!--Footer/-->
</template>


<script>
import Header from './Header.vue'
import axios from "axios";
import '@/assets/styles/form.css';

export default {
  components: {
    Header
  },
  data() {
    return {
        calendarName : "",
        author : "",
    }
  },
  methods:{
    createCalendar(){
      //I wanna try if we are able to verify the authenticity of the user
      var ui =  JSON.parse(localStorage.getItem("userInformations"));
      var TockenValid = false;

      let authURL = 'http://localhost:4000/auth/verify-authenticity';
      axios.post(authURL, ui).then((res) => {
        
        console.log(res.data.message); //return message
        TockenValid = res.data.isTockenMatches;
        
        if(TockenValid){
          var ui =  JSON.parse(localStorage.getItem("userInformations"));
          this.author = ui.user;

          var newCalendar = {
            name : this.calendarName,
            author : this.author
          };

          // create the calendar with the text box name
          let calendarURL = 'http://localhost:4000/calendar/create-calendar';
          axios.post(calendarURL, newCalendar).then((res) => {
            
            console.log(res.data.message); //return message

            this.$router.push({
              name: 'Calendar',
              params: { id: res.data.calendar_id}
            });

          }).catch(error => {
              console.log(error);
          });
        }else{ //the token is not valid... 
          this.$router.push('/logout')
        }
      }).catch(error => {
          console.log(error);
      });
    },
  },
}
</script>
