<template>
  <Header/>



    <form @submit.prevent="register">

      <div class="container">
        <h2> Bienvenue ! </h2>
        <p> Nous sommes heureux de vous compter parmis nous ! :'D</p>

        <h1> S'enregistrer </h1>
        <hr>

        <label for="name"><b>Nom</b></label>
        <input type="text" placeholder="Entrer un nom" class="form-control" v-model="user.name" required>

        <label for="email"><b>Adresse mail</b></label>
        <input type="text" placeholder="Entrer une adresse mail"  class="form-control" v-model="user.email" required>

        <label for="psw"><b>Mot de passe</b></label>
        <input type="password" placeholder="Entrer un mot de passe" class="form-control" v-model="user.password" required>

        <hr>

        <button class="button">S'enregistrer !</button>
      </div>
      
      <div class="container signin">
        Vous avez déjà un compte ? <router-link class="active" to="/login">Connectez-vous</router-link> !
      </div>

      <p class="error"> {{errorMessage}}</p>
    </form>













  <Footer/>
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
    register(){
        let apiURL = 'http://localhost:4000/user/create-user';
        axios.post(apiURL, this.user).then((res) => {

        if (res.data.hasError){
          this.errorMessage = res.data.message;
        }else{
        this.$router.push('/login');

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