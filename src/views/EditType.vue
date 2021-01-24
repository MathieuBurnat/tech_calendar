
<template>
  <Header/>
    <h2> Welcome to the edittype's section. </h2>
  <form  @submit.prevent="createType">

    <label for="Preview">Preview</label>
    <input id="Preview" type="text" disabled/>

    <label for="name">Type nom</label>
    <input id="name" type="text" v-model="weekType.name" required/>

    <label for="color">Couleur</label>
    <input id="color" type="color"  v-model="weekType.color" />

    <input type="submit" class="green-btn" value="Save">
    <input type="button" onclick="history.back()" class="red-btn" value="Cancel">


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
      weekType: {
        name: '',
        color: ''
      },
    }
  },
  methods:{
    createType(){
      let apiURL = 'http://localhost:4000/weekType/create-weekType';
      axios.post(apiURL, this.weekType).then(() => {
        //this.$router.push('/view')
        this.weekType = {
          name: '',
          color: ''
        }
      }).catch(error => {
        console.log(error);
      });
    },
  },
}
</script>