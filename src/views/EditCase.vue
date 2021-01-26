<template>
  <Header/>
    <div class="container">
    <h1> Édition de la semaine </h1>
    <form>
      <hr>
      <table>
        <tr>
          <td>
            <label for="Preview">Prévisualisation de la semaine </label>
            <input id="Preview" type="text" disabled :value=weekTypeSelected.name :style="{backgroundColor: this.selectedOption }" />
            <!--input id="name" type="text" v-model="weekType.name" required/ Meh-->
          </td>
          <td>
            <label for="name">Contenu</label>
            <input id="name" type="text" v-model="weekTypeSelected.name" required />
          </td>
        </tr>
        <tr>
          <td>
            <label for="typeWeek">Sélectionner un type</label>
            <select id="typeWeek"  v-model="selectedOption">
              <option selected> Choisissez </option>
              <option v-for="weekType in weekTypes" :key="weekType.id" :value=weekType.color :style="{ backgroundColor: weekType.color }">{{weekType.name}}</option>
            </select>
          </td>
          <td>
            <label for="modules">Ajouter un module</label>
            <select id="modules">
              <option selected> Choisissez </option>
              <option> This option will comes latter [...] </option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <a href="/edittype">+</a> <a class="right">-</a>
          </td>
            <td>
            <a>+</a><a class="right">-</a>
          </td>
        </tr>
      </table>
      <hr>

      <input type="submit" class="button button-medium save" value="Sauvegarder">
      <input type="reset" class="button button-medium cancel"  @click="cancelValues()" value="Annuler">
      <input type="button" class="button button-medium return" @click="$router.push('/calendar')" value="Retour">
    </form>
    </div>
  <!--Footer/-->
</template>

<script  type="text/javascript">
import Header from './Header.vue'
import axios from "axios";
import '@/assets/styles/form.css';

export default {
  components: {
    Header
  },
  data() {
    return {
      weekTypes: {
        name: '',
        color: ''
      },
      Color: '',
      weekTypeSelected: {
        name: '',
        color: ''
      },
      selectedOption: "",
    }
  },
  mounted(){
    let apiURL = 'http://localhost:4000/weekType/';
    axios.get(apiURL).then((res) => {
      this.weekTypes = res.data;
    }).catch(error => {
      console.log(error);
    });
  },
  methods: {
    getColor(){
      var selectElmt = document.getElementById("typeWeek");
      var valueSelect = selectElmt.options[selectElmt.selectedIndex].value;

      console.log(valueSelect);
      this.weekTypeSelected.color = valueSelect;

      selectElmt.className = valueSelect;
    },
    renderPriview(){
      console.log("hello there..");
      console.log(this.selectedOption);
    }
  }
}
</script>

<style>
table{
  width: 50%;
}

.right{
float: right;
}
</style>