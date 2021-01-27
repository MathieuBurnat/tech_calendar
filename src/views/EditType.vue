
<template>
  <Header/>
  <div class="container">
    <form  @submit.prevent="createType">
      <h1> Édition du type de semaine </h1>

      <h2> Prévisualisation </h2>
      <label for="Preview">Prévisualisation du type de la semaine </label>
      <input id="Preview" type="text" disabled :style="{backgroundColor: weekType.color }" :value=weekType.name />

      <hr>
      <h2> Éditer</h2>

      <label for="name">Choisir le nom du type</label>
      <input id="name" type="text" v-model="weekType.name" required/>

      <label for="color">Sélectionner  la couleur</label> 
      
      <input id="color" type="color"  v-model="weekType.color" />

      <hr>
      <input type="submit" class="button button-medium save" value="Sauvegarder">
      <input type="reset" class="button button-medium cancel"  @click="cancelValues()" value="Annuler">
      <input type="button" class="button button-medium return" @click="$router.push('/editcase')" value="Retour">
    </form>
    <p class="greatInfo"> {{message}} </p>
  </div>

  <!--Footer/-->
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
      message: ""
    }
  },
  methods: {
    createType() {
      let apiURL = 'http://localhost:4000/weekType/create-weekType';
      axios.post(apiURL, this.weekType).then((res) => {
        this.message = res.data.message;

        this.weekType = {
          name: '',
          color: ''
        }
      }).catch(error => {
        console.log(error);
      });
    },
    cancelValues(){
      this.weekType = {
        name: '',
        color: ''
      }
      this.message = "";
    }
  }
}
</script>
