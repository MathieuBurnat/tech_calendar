<template>
  <Header/>
    <h1> Se connecter </h1>
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

            //redirect into the homepage or whatever.
            this.$router.push('/')
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