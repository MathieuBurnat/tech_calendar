<template>
    <Header/>
    
    <h1> Test. Test. Test-Data !</h1>

    <h2> Insert Datas</h2>
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

    <h2> View Datas </h2>
     <div class="row">
        <div class="col-md-12">
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="calendar in Calendars" :key="calendar._id">
                        <td>{{ calendar.name }}</td>
                        <td>{{ calendar.email }}</td>
                        <td>{{ calendar.phone }}</td>
                    </tr>
                </tbody>
            </table>
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
                },
                Calendars: []
            }
        },
        created() {
            let apiURL = 'http://localhost:4000/api';
            axios.get(apiURL).then(res => {
                this.Calendars = res.data;
            }).catch(error => {
                console.log(error)
            });
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
