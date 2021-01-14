<template>
  <body>
    <div class="topnav">
      <router-link class="active" to="/">My calendar</router-link>
      <router-link to="/">Calendars</router-link>
      <router-link to="/">Profil</router-link>
    </div>
  </body>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #4CAF50;
  color: white;
}
</style>