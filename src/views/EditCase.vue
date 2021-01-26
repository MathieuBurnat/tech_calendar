<template>
  <Header/>
    <h2> Welcome to the editcase's section. </h2>
  <form>
    <table>
      <tr>
        <td>
      <label for="Preview">Preview</label>
      <input id="Preview" type="text" disabled :value=weekTypeSelected.name :style="{backgroundColor: weekTypeSelected.color }" />
        </td>
        <td>
      <label for="name">Content</label>
      <input id="name" type="text" v-model="weekTypeSelected.name" required />
        </td>
      </tr>
      <tr>
        <td>
          <label for="typeWeek">type</label>
          <select onchange="getColor()" id="typeWeek">
            <option selected> --- choisissez --- </option>
            <option v-for="weekType in weekTypes" :key="weekType.id" :value=weekType.color :style="{backgroundColor: weekType.color }">{{weekType.name}}</option>
          </select>

          <label for="color">Couleur</label>
          <input id="color" type="color"/>

          <a href="/edittype">+</a><a>-</a>
        </td>
        <td>
          <label for="Module">Module</label>
          <input id="Module" type="text" />
        </td>
      </tr>
    <tr>
        <input type="submit" class="green-btn" value="Save">
        <input type="reset" class="red-btn" value="Cancel">
        <input type="button" onclick="window.location.href='/editcase'" class="red-btn" value="Return">
    </tr>
    </table>
  </form>
  <Footer/>
</template>

<script  type="text/javascript">
  import Header from './Header.vue'
  import axios from "axios";

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
        }
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



      }
    }

  }
</script>