<template>
  <Header/>
    <h2> Welcome to the editcase's section. </h2>
  <form>
    <table>
      <tr>
        <td>
      <label for="Preview">Preview</label>
      <input id="Preview" type="text" disabled/>
        </td>
        <td>
      <label for="Content">Content</label>
      <input id="Content" type="text" />
        </td>
      </tr>
      <tr>
        <td>
          <label for="typeWeek">type</label>
          <select id="typeWeek">
            <option></option>
          </select>
          <a href="/edittype">+</a><a>-</a>
        </td>
        <td>
          <label for="Module">Module</label>
          <input id="Module" type="text" />
        </td>
      </tr>
    </table>
  </form>
  <Footer/>
</template>


<script>
  import Header from './Header.vue'

  export default {
    components: {
      Header
    }
  }
</script>