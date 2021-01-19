<template>
  <Header/>
    <h1>Bienvenue ! </h1>
    <p>Avant de pouvoir bénéficier des services de l'application et de façon à conserver vos calendriers de façon sécurisée, vous devez vous connecter. </p>

    <h2> Se connecter </h2>

    <form @submit.prevent="login">
            <label>Adresse mail</label>
            <input type="text" class="form-control" v-model="user.email" required>

            <label>Mot de passe</label>
            <input type="password" class="form-control" v-model="user.password" required>

            <button class="btn btn-danger btn-block">Se connecter</button>

            ou <router-link class="active" to="/register">s'enregistrer</router-link>.
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
        user: {
            name: '',
            email: '',
            password: ''
        },
    }
  },
  methods:{
    login(){
        let apiURL = 'http://localhost:4000/user/login';
        axios.post(apiURL, this.user).then((res) => {
          
          //Return messages 
          console.log(res.data.message);
          
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