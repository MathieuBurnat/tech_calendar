<template>
  <Header/>
    <h1> Se connecter </h1>
    <form @submit.prevent="login">
            <label>Name</label>
            <input type="text" class="form-control" v-model="calendar.name" required>

            <label>Email</label>
            <input type="text" class="form-control" v-model="calendar.email" required>

            <label>Phone</label>
            <input type="text" class="form-control" v-model="calendar.phone" required>

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
        calendar: {
            name: '',
            email: '',
            phone: ''
        },
    }
  },
  methods:{
    login(){
        let apiURL = 'http://localhost:4000/api/create-calendar';
        axios.post(apiURL, this.calendar).then(() => {
          //this.$router.push('/view')
          this.calendar = {
            name: '',
            email: '',
            phone: ''
          }
        }).catch(error => {
            console.log(error)
        });
      },
  },

}
</script>