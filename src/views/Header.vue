<template>
  <body>
    <!-- Top navigation -->
    <div class="topnav">
      <!-- Centered link -->
      <div class="topnav-centered">
        <router-link class="active" to="/calendar">My calendar</router-link>
      </div>
      <!-- Left-aligned links (default) -->
      <div class="topnav-left">
        <router-link to="/pickacalendar">Calendars</router-link>
      </div>
      <!-- Right-aligned links -->
      <div class="topnav-right">
        <router-link to="/profil">Profil</router-link>
      </div>
      
    </div>
  </body>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.topnav {
  position: relative;
  overflow: hidden;
  background-color: #716e77;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 30px 20px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #ecd6c7;
  color: white;
}

.topnav-centered a {
  float: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.topnav-right {
  float: right;
  margin-right: 30px;
}

.topnav-left{
  margin-left: 30px;
}

/* Responsive navigation menu (for mobile devices) */
@media screen and (max-width: 600px) {
  .topnav a, .topnav-right, .topnav-left {
    float: none;
    display: block;
    margin: 0;
  }
  
  .topnav-centered a {
    position: relative;
    top: 0;
    left: 0;
    transform: none;
  }
}
</style>