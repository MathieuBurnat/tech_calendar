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
  <Footer/>
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
        axios.post(apiURL, this.user).then(() => {
          //this.$router.push('/view')
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