
<template>
  <Header/>
  <div class="container">
    <form  @submit.prevent="createType">

      <h1> Édition du type de semaine </h1>

      <h2> Prévisualisation de la semaine</h2>
      <label for="Preview">Preview </label>
      <input id="Preview" type="text" disabled :style="{backgroundColor: weekType.color }" :value=weekType.name />

      <hr>
      <h2> Éditer</h2>

      <label for="name">Choisir le nom du type</label>
      <input id="name" type="text" v-model="weekType.name" required/>

      <label for="color">Sélectionner  la couleur</label> 
      
      <input id="color" type="color"  v-model="weekType.color" />

      <hr>
      <input type="submit" class="button button-medium save" value="Save">
      <input type="reset" class="button button-medium cancel" value="Cancel">
      <input type="button" class="button button-medium" onclick="window.location.href='/editcase'" value="Return">
    </form>
  </div>

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
      weekType: {
        name: '',
        color: ''
      },
    }
  },
  methods: {
    createType() {
      let apiURL = 'http://localhost:4000/weekType/create-weekType';
      axios.post(apiURL, this.weekType).then(() => {

        this.weekType = {
          name: '',
          color: ''
        }
      }).catch(error => {
        console.log(error);
      });
    },
  }
}
</script>

<style>
 .button-medium{
    width: 20%;
    margin: 0 10px;
 }

 .save{
   background-color: #72cb72;
 }
  .cancel{
   background-color: #c04f4f;
 }
  .return{
   background-color: var(--header-front);
 }
</style>