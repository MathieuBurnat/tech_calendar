<template>
    <Header/>
    
    <h2> Test. Test. Test-Data !</h2>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Create Calendar</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="calendar.name" required>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="text" class="form-control" v-model="calendar.email" required>
                </div>

                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" class="form-control" v-model="calendar.phone" required>
                </div>

                <div class="form-group">
                    <button class="btn btn-danger btn-block">Create</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
  import Header from '@/views/Header.vue'
  import axios from "axios";
  
    export default 
    {
        data() {
            return {
                calendar: {
                   name: '',
                   email: '',
                   phone: ''
                }
            }
        },
        methods: {
            handleSubmitForm() {
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
            }
        },
        components: {
      Header
        }
    }
</script>
