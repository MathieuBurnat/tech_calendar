<template>
  <h2> My beautiful header !</h2>
  <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/help">Help</router-link>
  </div>
  <router-view />
</template>