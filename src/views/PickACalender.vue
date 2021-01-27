<template>
  <Header/>

  <div class="container">
    <form @submit.prevent="goToCalendar">
      <h1> Pick a calendar </h1>

      <hr>
      <div v-if="!calendars.length"> <!-- If there isn't calendars. -->
        <p> Aucun calendrier n'existe pour le moment. >:c </p>
        <div class="notes container">
          Créer en un nouveau <router-link class="active" to="/newcalendar">ici</router-link> !
        </div>
      </div>
      <div v-else> 
        
      <label for="calendar-choice">Calendriers :</label>

      <select v-model="selectedOption" required>
        <option disabled value="">Choisissez</option>
        <option v-for="calendar in calendars" :key="calendar.id">{{calendar.name}}</option>
      </select >

      <input type="checkbox" v-model="shouldBeDefault" :value="1"/>
      <label>Je veux que ce soit mon calendrier par défaut !</label>


      <hr>
      <button class="button">C'est parti !</button>

      <div class="notes container">
        Envie de créer votre propre calendrier ? Cliquez <router-link class="active" to="/newcalendar">ici</router-link> !
      </div>



      </div>
    </form>
  </div>
</template>

<script>
  import Header from './Header.vue';
  import axios from "axios";
  import {verifyAuthenticity} from "@/components/auth.js";
  import '@/assets/styles/form.css';

  export default {
    components: {
      Header
    },
    data() {
      return { calendars: [], shouldBeDefault: false, selectedOption : ""}
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
        //get datas
        var isChecked = this.shouldBeDefault;
        var name = this.selectedOption;
        var ui =  JSON.parse(localStorage.getItem("userInformations"));
        var user_id = ui.user;
        verifyAuthenticity();
        if(verifyAuthenticity){ //If the user is legit (it tokken is validate)
          
          //if "chose this calendar as default is cheked"
          var data = {name, user_id}

          if(isChecked){

            let apiURL = 'http://localhost:4000/user/set-default-calendar';
              
            axios.post(apiURL, data).then((res) => {
              console.log(res.data.message);
            }).catch(error => {
              console.log(error);
            });
          }

          //Get calendar id with the name and push it into /calendar
          let authURL = 'http://localhost:4000/calendar/get-id';
              axios.post(authURL, data).then((res) => {
                var calendar_id = res.data.calendar_id;
                this.$router.push({
                name: 'Calendar',
                params: { id: calendar_id}
                });
              }).catch(error => {
                  console.log(error);
              });

        }else{
          this.$router.push('/logout')
        }
      }
    }
  }
</script>
