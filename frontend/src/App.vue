<template>
  <div id="app">
    <router-link to="/">Search</router-link>
    <router-link to="/stats">Stats</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  import router from './router';

  export default {
    name: 'App',
    router
  };
</script>

