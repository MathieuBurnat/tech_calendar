<template>
  <Header/>
    <h1> Se connecter </h1>
    <form @submit.prevent="login">
            <label>Name</label>
            <input type="text" class="form-control" v-model="user.name" required>

            <label>Email</label>
            <input type="text" class="form-control" v-model="user.email" required>

            <label>Password</label>
            <input type="password" class="form-control" v-model="user.password" required>

            <button class="btn btn-danger btn-block">Create</button>

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