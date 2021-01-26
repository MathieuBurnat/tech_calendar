<template>
  <Header/>
  
    <form @submit.prevent="login">
      <div class="container">
        <h2> Bienvenue ! </h2>
        <p> Avant de pouvoir bénéficier des services de l'application et ainsi, avoir accès à vos calendriers de façon simple et sécurisée, vous devez vous connecter.</p>

        <h1>Se connecter </h1>
        <hr>

        <label for="email"><b>Email</b></label>
        <input type="text" placeholder="Entrer une adresse mail"  class="form-control" v-model="user.email" required>

        <label for="psw"><b>Mot de passe</b></label>
        <input type="password" placeholder="Entrer un mot de passe" class="form-control" v-model="user.password" required>

        <hr>

        <button class="button">Se connecter</button>
      </div>
      
      <div class="container signin">
        Vous n'avez pas de compte ? <router-link class="active" to="/register">Enregistrez-vous</router-link> !
      </div>

      <p class="error"> {{errorMessage}}</p>
    </form>

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
        user: {
            name: '',
            email: '',
            password: ''
        },
        errorMessage : ""
    }
  },
  methods:{
    login(){
        let apiURL = 'http://localhost:4000/user/login';
        axios.post(apiURL, this.user).then((res) => {
          
          //Return messages 
          console.log(res.data.message);
          this.errorMessage = res.data.message;

          if(res.data.isPswrdMatches){ //If the user exists and the password matches.
            //store the token (use_id with token) into "userInformations"
            localStorage.setItem('userInformations', JSON.stringify(res.data.token));

            //now the use will be able to pick a calendar.. 
            this.$router.push('/pickacalendar')
          }

          this.user = {
            name: '',
            email: '',
            password: ''
          }
        }).catch(error => {
            console.log(error);
        });
      },
  },
}
</script>
