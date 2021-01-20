<template>
  <Header/>
    <h1> S'enregistrer </h1>
    <form @submit.prevent="register">
            <label>Nom</label>
            <input type="text" class="form-control" v-model="user.name" required>

            <label>Adresse mail</label>
            <input type="text" class="form-control" v-model="user.email" required>

            <label>Mot de passe</label>
            <input type="password" class="form-control" v-model="user.password" required>

            <button class="btn btn-danger btn-block">S'enregistrer !</button>

            ou <router-link class="active" to="/login">se connecter</router-link>.
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
    register(){
        let apiURL = 'http://localhost:4000/user/create-user';
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